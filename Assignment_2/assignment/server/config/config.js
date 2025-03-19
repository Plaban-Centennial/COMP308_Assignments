// config.js is a configuration file that exports an object 
// with the configuration options for the application. 
// The configuration object contains the database URI and 
// the session secret. The database URI is loaded from 
// the MONGO_URI environment variable, and the session secret 
// is loaded from the SESSION_SECRET environment variable. 
// The configuration object is exported based on the NODE_ENV 
// environment variable, which determines the current environment
// (development, production, or test). The configuration object
// for the current environment is exported from the module.
//
// Import necessary modules
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Dynamically load the configuration file based on NODE_ENV
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    db: process.env.MONGO_URI || 'mongodb://localhost:27017/assignment-2-pb',
    sessionSecret: process.env.SESSION_SECRET || 'developmentSessionSecret',
  },
  production: {
    db: process.env.MONGO_URI, // Ensure MONGO_URI is set in your production environment
    sessionSecret: process.env.SESSION_SECRET, // Ensure SESSION_SECRET is set in production
  },
  test: {
    db: process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/test-assignment-2-pb',
    sessionSecret: 'testSessionSecret',
  },
};

// Export the configuration for the current environment
module.exports = config[env];
