const express = require('express');
const router = express.Router();
const { getAllDishes, getDishByName, addDish } = require('./controllers');

router.get('/dishes', getAllDishes);
router.get('/dishes/:name', getDishByName);
router.post('/dishes', addDish);

module.exports = router;