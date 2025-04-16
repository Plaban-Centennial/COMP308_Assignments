require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();

// Add cors middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001',
        'http://localhost:3002', 'https://studio.apollographql.com'], // Adjust the origin according to your micro frontends' host
    credentials: true, // Allow cookies to be sent
}));
app.use(cookieParser());

// MongoDB connection setup
const mongoUri = process.env.USER_MONGO_URI; // Use the MONGO_URI from .env
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// User schema definition
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true, // Ensures username is unique
        required: true
    },
    email: {
        type: String,
        unique: true, // Ensures email is unique
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "player", // Default role is "player"
        enum: ["player", "admin"] // Allowed values
    },
    createdAt: {
        type: Date,
        default: Date.now // Default to the current date and time
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    createdAt: String!
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    login(username: String!, password: String!): Boolean
    register(username: String!, email: String!, password: String!): Boolean
    logout: Boolean
  }
`;

const resolvers = {
    Query: {
        currentUser: async (_, __, { req }) => {
            const token = req.cookies['token'];
            if (!token) {
                console.log('No token found');
                return null;
            }

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log('Decoded Token:', decoded);
                const user = await User.findById(decoded.id);
                console.log('User Found:', user);
                return user ? {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    createdAt: user.createdAt,
                } : null;
            } catch (error) {
                console.error('Token verification failed:', error);
                return null;
            }
        },
    },
    Mutation: {
        login: async (_, { username, password }, { res }) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('User not found');
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                throw new Error('Invalid password');
            }

            const token = jwt.sign(
                { id: user._id, username: user.username, email: user.email, role: user.role, createdAt: user.createdAt },
                process.env.JWT_SECRET, // Use JWT_SECRET from .env
                { expiresIn: '1d' }
            );

            res.cookie('token', token, {
                httpOnly: true,
                secure: true, // Ensure the cookie is sent over HTTPS
                sameSite: 'None', // Required for cross-site cookies
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });
            return true;
        },
        register: async (_, { username, email, password }) => {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                throw new Error('Username is already taken');
            }

            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                throw new Error('Email is already registered');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                role: "player" // Default role
            });
            await newUser.save();
            return true;
        },
        logout: (_, __, { res }) => {
            console.log('Logout called');
            res.clearCookie('token', {
                httpOnly: true,
                secure: true, // Ensure the cookie is sent over HTTPS
                sameSite: 'None', // Required for cross-site cookies
            });
            return true; // Indicate successful logout
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
});
server.start().then(() => {
    server.applyMiddleware({ app, cors: false });
    app.listen({ port: process.env.AUTH_PORT }, () => // Use PORT from .env
        console.log(`🚀 Server ready at http://localhost:${process.env.AUTH_PORT}${server.graphqlPath}`)
    );
});