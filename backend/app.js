const express = require('express');
const connectDB = require('./db');
const routes = require('./routes');
const path = require('path');
require('dotenv').config();

const app = express();

//connect to DB
connectDB();

//serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

//middleware to parse JSON requests
app.use(express.json());

//placeholder for connecting routes
app.use('/api', routes);

//send index.html to the client
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/index.html'));  
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});