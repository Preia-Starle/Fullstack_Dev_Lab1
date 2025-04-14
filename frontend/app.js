async function fetchDishes() {
    try {
        const response = await fetch('http://localhost:3001/api/dishes');
        if (!response.ok) throw new Error('Failed to fetch dishes from database');
        
        const dishes = await response.json();
        return dishes;
    } catch (error) {
        console.error('Error fetching dishes:', error);
        return [];
    }
}

async function createDish(newDishData) {
    try {
        const response = await fetch('http://localhost:3001/api/dishes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDishData),
        });

        if (!response.ok) throw new Error('Failed to create dish');

        const createdDish = await response.json();
        return createdDish;
    } catch (error) {
        console.error('Error creating dish:', error);
        return null;
    }
}

//fetch dish by id
async function fetchDishById(dishId) {
    try {
        console.log(`Fetching dish with ID: ${dishId}`);
        const response = await fetch(`http://localhost:3001/api/dishes/${dishId}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch dish');
        }

        const dish = await response.json();
        console.log('Fetched dish:', dish);
        
        return dish;  //return the fetched dish object
    } catch (error) {
        console.error('Error fetching dish:', error);
        return null;  //return null if there was an error
    }
}

//fetch dish by name
async function fetchDishByName(dishName) {
    try {
        console.log(`Fetching dish with name: ${dishName}`);
        const response = await fetch(`http://localhost:3001/api/dishes/${dishName}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch dish');
        }

        const dish = await response.json();
        console.log('Fetched dish:', dish);
        
        return dish;  //return the fetched dish object
    } catch (error) {
        console.error('Error fetching dish:', error);
        return null;  //return null if there was an error
    }
}

//update dish
async function updateDish(updatedDishData) {
    try {
        const response = await fetch(`http://localhost:3001/api/dishes/${updatedDishData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedDishData),
        });

        if (!response.ok) throw new Error('Failed to update dish');

        const updatedDish = await response.json();
        return updatedDish;
    } catch (error) {
        console.error('Error updating dish:', error);
        return null;
    }
}

async function deleteDish(dishId) {
    try {
        const response = await fetch(`http://localhost:3001/api/dishes/${dishId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete dish');
        }

        console.log(`Dish with ID ${dishId} deleted successfully`);
        
    } catch (error) {
        console.error('Error removing dish:', error);
    }
}

