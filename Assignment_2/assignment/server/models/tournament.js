// Tournament model
const mongoose = require('mongoose');

// Define the Tournament schema
const TournamentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    game: { type: String, required: true },
    date: { type: Date, required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], required: true },
});

module.exports = mongoose.model('Tournament', TournamentSchema);