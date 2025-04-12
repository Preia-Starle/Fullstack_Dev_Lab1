const express = require('express');
const connectDB = require('./db');
const routes = require('./routes');
require('dotenv').config();

const app = express();

//connect to DB
connectDB();

//middleware to parse JSON requests
app.use(express.json());

//placeholder for connecting routes
app.use('/api', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});