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

