// GameProgress model
const mongoose = require('mongoose');

// Define the GameProgress schema
const GameProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // References the User model
    level: { type: Number, required: true, default: 1 }, // Player's current level
    experiencePoints: { type: Number, required: true, default: 0 }, // Tracks experience points
    score: { type: Number, required: true, default: 0 }, // Player's total score
    rank: { type: Number, required: false }, // Optional leaderboard ranking
    achievements: { type: [String], required: false, default: [] }, // Unlocked achievement names
    progress: { type: String, required: false, default: "Not started" }, // Current game progress description
    lastPlayed: { type: Date, required: false, default: Date.now }, // Last played date
    updatedAt: { type: Date, required: false, default: Date.now }, // Auto-generated timestamp for updates
});

// Middleware to update `updatedAt` before saving
GameProgressSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('GameProgress', GameProgressSchema);