const Dish = require ('./models');

//get all dishes
const getAllDishes = async (req, res) => {
    //console.log('GET /api/dishes route hit');
    try {
        const dishes = await Dish.find();
        //console.log('Fetched dishes:', dishes); 
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

//add new dish to database
const addDish = async (req, res) => {
    try {
        const {name} = req.body;
        //retrieve from db
        const existingDish = await Dish.findOne({name: name});
        //check if exists
        if (existingDish) {
            return res.status(409).json({message: 'Dish already exists.'});
        }
        //save if it does not exist
        const newDish = new Dish(req.body);
        await newDish.save();
        //return the dish with status code
        res.status(201).json(newDish);
    } catch (err) {
        console.error('Error adding dish: ', err);
        res.status(500).json({message: 'Server error', error: err});
    }
};

//update dish based on id
const updateDish = async(req, res) => {
    try {
        const {id} = req.params;
        //find by id
        const updatedDish = await Dish.findByIdAndUpdate(id, req.body, {new: true});
        //if it does not exist - id not found
        if (!updatedDish) {
            return res.status(404).json({ message:'Dish not found :(.' });
        }
        //return ok with the updated dish
        res.status(200).json(updatedDish);
    } catch (err) {
        console.error('Error updating dish: ', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};

const deleteDish = async (req, res) => {
    try {
        const {id} = req.params;
        //delete dish by id
        const deletedDish = await Dish.findByIdAndDelete(id);
        //if not found return error 404
        if(!deletedDish) {
            return res.status(404).json({ message:'Dish not found :(.' });
        }
        res.status(200).json({ message: 'Dish deleted successfully.' });
    }
    catch (err) {
        console.error('Error deleting the dish: ', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};

module.exports = {getAllDishes, getDishByName, addDish, updateDish, deleteDish};