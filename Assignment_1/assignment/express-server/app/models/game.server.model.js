const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GameSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    genre: {
        type: String,
        default: '',
        trim: true,
        required: 'Genre cannot be blank'
    },
    platform: {
        type: String,
        default: '',
        trim: true,
        required: 'Platform cannot be blank'
    },
    releaseYear: {
        type: Number,
        default: 1990,
        required: 'Release Year cannot be blank'
    },
    developer: {
        type: String,
        default: '',
        trim: true,
        required: 'Developer cannot be blank'
    },
    rating: {
        type: Number,
        default: 0,
        required: 'Rating cannot be blank'
    },
    description: {
        type: String,
        default: '',
        trim: true,
        required: 'Description cannot be blank'
    },
});
mongoose.model('Game', GameSchema);
