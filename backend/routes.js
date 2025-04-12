const express = require('express');
const router = express.Router();
const { getAllDishes, getDishByName, addDish, updateDish, deleteDish } = require('./controllers');

router.get('/dishes', getAllDishes);
router.get('/dishes/:name', getDishByName);
router.post('/dishes', addDish);
router.put('/dishes/:id', updateDish)
router.delete('/dishes/:id', deleteDish);

module.exports = router;