const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function createMongoDb() {
    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI is not defined in the environment variables.");
        return;
    }

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('MongoDB connected');
        })
        .catch(err => {
            console.error('MongoDB connection error:', err);
        });
}
