// Game Progress Microservice
require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server-express');
const { buildFederatedSchema } = require('@apollo/federation');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// MongoDB GameProgress model
const GameProgress = require('../models/GameProgress');

// Initialize Express app
const app = express();
const port = 3002;
app.use(cors());

console.log('GameProgress microservice is starting...');

// GraphQL type definitions
const typeDefs = gql`
  type GameProgress {
    id: ID!
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

  type Query {
    # Fetch all game progress for a user
    getGameProgress(userId: ID!): [GameProgress]

    # Fetch a specific game progress by ID
    getGameProgressById(id: ID!): GameProgress
  }

  type Mutation {
    # Create a new game progress record
    createGameProgress(userId: ID!, level: Int, experiencePoints: Int, score: Int, progress: String): GameProgress

    # Update an existing game progress record
    updateGameProgress(id: ID!, level: Int, experiencePoints: Int, score: Int, progress: String): GameProgress

    # Delete a game progress record
    deleteGameProgress(id: ID!): Boolean
  }
`;

// GraphQL resolvers
const resolvers = {
    Query: {
        // Fetch all game progress for a user
        getGameProgress: async (_, { userId }) => {
            return await GameProgress.find({ userId });
        },

        // Fetch a specific game progress by ID
        getGameProgressById: async (_, { id }) => {
            return await GameProgress.findById(id);
        },
    },

    Mutation: {
        // Create a new game progress record
        createGameProgress: async (_, { userId, level, experiencePoints, score, progress }) => {
            const gameProgress = new GameProgress({
                userId,
                level: level || 1,
                experiencePoints: experiencePoints || 0,
                score: score || 0,
                progress: progress || 'Not started',
            });
            return await gameProgress.save();
        },

        // Update an existing game progress record
        updateGameProgress: async (_, { id, level, experiencePoints, score, progress }) => {
            const gameProgress = await GameProgress.findById(id);
            if (!gameProgress) {
                throw new Error('Game progress not found');
            }

            if (level !== undefined) gameProgress.level = level;
            if (experiencePoints !== undefined) gameProgress.experiencePoints = experiencePoints;
            if (score !== undefined) gameProgress.score = score;
            if (progress !== undefined) gameProgress.progress = progress;

            return await gameProgress.save();
        },

        // Delete a game progress record
        deleteGameProgress: async (_, { id }) => {
            const result = await GameProgress.findByIdAndDelete(id);
            return !!result;
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

app.listen(process.env.GAMEPROGRESS_SERVICE_PORT || 3002, async () => {
    await server.start();
    server.applyMiddleware({ app });
    console.log(`Game Progress microservice ready at http://localhost:${port}${server.graphqlPath}`);
});