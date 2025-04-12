const express = require('express');
const router = express.Router();
const { getAllDishes, getDishByName } = require('./controllers');

router.get('/dishes', getAllDishes);
router.get('/dishes/:name', getDishByName);

module.exports = router;