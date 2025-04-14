// User Authentication Microservice
require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server-express');
const { buildFederatedSchema } = require('@apollo/federation');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');


// MongoDB User model
const User = require('../models/User');

// Initialize Express app
const app = express();
const port = 3003;
app.use(cors());

console.log('Auth microservice is starting...');

// GraphQL type definitions
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    _dummy: String
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    logout: Boolean
  }
`;

// GraphQL resolvers
const resolvers = {
  Query: {
    _dummy: () => 'This is a dummy query',
  },
  Mutation: {
    // Signup resolver
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return { token, user };
    },

    // Login resolver
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return { token, user };
    },

    // Logout resolver
    logout: async () => {
      // Logout logic can vary depending on implementation (e.g., token invalidation)
      return true;
    },
  },
};

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Create Apollo Server
const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

app.listen(process.env.AUTH_SERVICE_PORT || 3003, async () => {
  await server.start();
  server.applyMiddleware({ app });
  console.log(`Authentication microservice ready at http://localhost:${port}${server.graphqlPath}`);
});