const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const GameProgress = require('../models/GameProgress');

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

        // Create a new game progress
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

        // Update an existing game progress
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

        // Delete a game progress
        deleteGameProgress: async (_, { id }) => {
            const result = await GameProgress.findByIdAndDelete(id);
            return !!result;
        },
    },
};

module.exports = resolvers;