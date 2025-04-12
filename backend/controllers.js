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

module.exports = {getAllDishes};