const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [String],
    preparationSteps: [String],
    cookingTime: { type: Number },
    origin: String,
    spiceLevel: String,
    servings: Number
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
