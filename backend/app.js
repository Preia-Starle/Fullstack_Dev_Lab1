const express = require("express");
const connectDB = require("./db");
require("dotenv").config();

const app = express();

//connect to DB
connectDB();

//middleware to parse JSON requests
app.use(express.json());

//placeholder for connecting routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});