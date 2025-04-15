require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//
const app = express();
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Add cors middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001',
        'http://localhost:3002', 'https://studio.apollographql.com'], // Adjust the origin according to your micro frontends' host
    credentials: true, // Allow cookies to be sent
}));
app.use(cookieParser());

// MongoDB connection setup
const mongoUri = process.env.GAME_PROGRESS_MONGO_URI; // Use the MONGO_URI from .env
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const gameProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    level: { type: Number, required: true, default: 1 },
    experiencePoints: { type: Number, required: true, default: 0 },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, default: null },
    achievements: { type: [String], default: [] },
    progress: { type: String, default: "Not started" },
    lastPlayed: { type: Date, default: Date.now },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const GameProgress = mongoose.model('GameProgress', gameProgressSchema);

const typeDefs = gql`
    type GameProgress {
        _id: ID!
        userId: ID!
        level: Int!
        experiencePoints: Int!
        score: Int!
        rank: Int
        achievements: [String]
        progress: String
        lastPlayed: String
        updatedAt: String
    }

    input GameProgressInput {
        userId: ID!
        level: Int
        experiencePoints: Int
        score: Int
        rank: Int
        achievements: [String]
        progress: String
        lastPlayed: String
    }

    type Query {
        getGameProgress(userId: ID!): GameProgress
        getAllGameProgress: [GameProgress]
    }

    type Mutation {
        createGameProgress(input: GameProgressInput!): GameProgress
        updateGameProgress(id: ID!, input: GameProgressInput!): GameProgress
        deleteGameProgress(id: ID!): String
    }
`;

const resolvers = {
    Query: {
        getGameProgress: async (_, { userId }) => {
            return await GameProgress.findOne({ userId });
        },
        getAllGameProgress: async () => {
            return await GameProgress.find();
        },
    },
    Mutation: {
        createGameProgress: async (_, { input }) => {
            const newGameProgress = new GameProgress(input);
            return await newGameProgress.save();
        },
        updateGameProgress: async (_, { id, input }) => {
            return await GameProgress.findByIdAndUpdate(id, input, { new: true });
        },
        deleteGameProgress: async (_, { id }) => {
            await GameProgress.findByIdAndDelete(id);
            return "Game progress deleted successfully.";
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.cookies['token'];
        if (token) {
            try {
                const user = jwt.verify(token, process.env.JWT_SECRET); // Replace 'your_secret_key' with your actual secret key
                return { user };
            } catch (e) {
                throw new Error('Your session expired. Sign in again.');
            }
        }
    },
});

server.start().then(() => {
    server.applyMiddleware({ app, cors: false });
    app.listen({ port: process.env.GAME_PROGRESS_PORT }, () => // Use PORT from .env
        console.log(`🚀 Server ready at http://localhost:${process.env.GAME_PROGRESS_PORT}${server.graphqlPath}`)
    );
});