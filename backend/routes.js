const express = require('express');
const router = express.Router();
const { getAllDishes } = require('./controllers');

router.get('/dishes', getAllDishes);

module.exports = router;