// User model
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Unique username for each user
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] // Email validation
    },
    password: { 
        type: String, 
        required: true, 
        minlength: [6, 'Password must be at least 6 characters long'] // Password length validation
    },
    role: { 
        type: String, 
        enum: ['admin', 'player'], 
        required: true, 
        default: 'player' // Defines user permissions
    },
    createdAt: { 
        type: Date, 
        required: false, 
        default: Date.now // Timestamp for when the user was created
    },
});

// Pre-save hook to hash the password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);