const express = require('express');
const router = express.Router();
const { getAllDishes, getDishByName, addDish, updateDish } = require('./controllers');

router.get('/dishes', getAllDishes);
router.get('/dishes/:name', getDishByName);
router.post('/dishes', addDish);
router.put('/dishes/:id', updateDish)

module.exports = router;