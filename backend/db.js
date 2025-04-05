const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.CONNECTION_URL);
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;