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
        const response = await fetch(`http://localhost:3001/api/dishes/${dishId}`);
        console.log(`Response Status: ${response.status}`); 

        if (!response.ok) throw new Error('Failed to fetch dish');

        const dish = await response.json();
        console.log('Fetched dish:', dish);

        document.getElementById('name').value = dish.name;
        document.getElementById('ingredients').value = dish.ingredients.join(', ');
        document.getElementById('preparationSteps').value = dish.preparationSteps.join(', ');
        document.getElementById('cookingTime').value = dish.cookingTime;
        document.getElementById('origin').value = dish.origin;
        document.getElementById('spiceLevel').value = dish.spiceLevel;
        document.getElementById('servings').value = dish.servings;
        document.getElementById('dish-id').value = dish._id;
    } catch (error) {
        console.error('Error fetching dish:', error);
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

