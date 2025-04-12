const Dish = require ('./models');

//get all dishes
const getAllDishes = async (req, res) => {
    console.log('GET /api/dishes route hit');
    try {
        const dishes = await Dish.find();
        console.log('Fetched dishes:', dishes); 
        if (!dishes || dishes.length === 0) {
            console.log('No dishes found');
            return res.status(404).json({ message: 'No dishes found' });  
        }
        res.status(200).json(dishes);
    } catch (err) {
        res.status(500).json({message: "Server error", error: err});
    }
};

//get dish by name
const getDishByName = async (req, res) => {
    try {
        const {name} = req.params;
        const dish = await Dish.findOne({name: name});
        console.log('Fetched dish:', dish); 
        if (!dish) {
            return res.status(404).json({message: 'Dish not found :(.'})
        }
        res.status(200).json(dish);
    } catch (err) {
        console.error('Error fetching dish', err);
        res.status(500).json({message: 'Server errror', error: err});
    }
};

module.exports = {getAllDishes, getDishByName};