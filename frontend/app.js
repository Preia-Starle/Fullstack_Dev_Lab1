//initialize app when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    renderDishes();
});


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

async function renderDishes() {
    const dishContainer = document.querySelector('.dishes-section');
    //fetch the dishes
    const dishes = await fetchDishes();
    if (dishes.length === 0) {
        dishContainer.textContent = "No dishes found"; 
        return;
    }
    //create a div to contain dishes
    const dishesDiv = document.createElement('div');
    dishesDiv.classList.add("dishes-div");
    //loop through each dish and create an element with it
    dishes.forEach(dish => {
        const dishElement = document.createElement('div');
        dishElement.classList.add("dish");
        const dishName = document.createElement('h3');
        dishName.textContent = dish.name;  
        dishElement.appendChild(dishName);  

        //render each dish dynamically
        const dishOrigin = document.createElement('p');
        dishOrigin.textContent = `Origin: ${dish.origin}`;  
        dishElement.appendChild(dishOrigin);  

        const dishTime = document.createElement('p');
        dishTime.textContent = `Cooking Time: ${dish.cookingTime} mins`;  
        dishElement.appendChild(dishTime);  

        const dishIngredients = document.createElement('p');
        dishIngredients.textContent = `Ingredients: ${dish.ingredients.join(', ')}`;  
        dishElement.appendChild(dishIngredients);  

        dishesDiv.appendChild(dishElement);
    });
    dishContainer.appendChild(dishesDiv);
};