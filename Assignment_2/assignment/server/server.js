require('dotenv').config(); // Load environment variables
const { ApolloServer } = require('apollo-server-express'); // Use Apollo Server for Express
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// MongoDB connection function
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
};

// Start the server
const startServer = async () => {
  const app = express();

  // Middleware
  app.use(cookieParser()); // Parse cookies
  app.use(
    cors({
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'], // Allow frontend and Apollo Studio
      credentials: true, // Allow credentials (cookies)
    })
  );

  // Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }), // Pass req and res to context
  });

  await server.start(); // Start Apollo Server
  server.applyMiddleware({
    app,
    cors: false, // Disable Apollo's internal CORS handling since we use Express CORS
  });

  // Connect to MongoDB
  await connectToDatabase();

  // Start Express server
  app.listen(4000, () => {
    console.log('Server running on http://localhost:4000/graphql');
  });
};

startServer();