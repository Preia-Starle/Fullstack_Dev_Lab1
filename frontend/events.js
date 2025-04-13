//initialize app when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", async () => {
    await renderDishes();
    await attachAddDishEventListener();
});

async function attachAddDishEventListener() {
    const addDishBtn = document.getElementById('add-dish-btn');
    if (addDishBtn) {
        addDishBtn.addEventListener('click', () => {
            //console.log('Add dish button clicked');
            renderDishForm();
        });
    } else {
        console.error('Add dish button not found');
    }
}

async function attachFormEventListener () {
    const dishForm = document.getElementById('dish-form');
    if (dishForm) {
        dishForm.addEventListener('submit', async (e) => {
            console.log('Add dish button clicked');
            e.preventDefault();
            
            const newDish = {
                name: document.getElementById('name').value,
                ingredients: document.getElementById('ingredients').value.split(','),
                preparationSteps: document.getElementById('preparationSteps').value.split(','),
                cookingTime: document.getElementById('cookingTime').value,
                origin: document.getElementById('origin').value,
                spiceLevel: document.getElementById('spiceLevel').value,
                servings: document.getElementById('servings').value,
            };
    
            console.log(newDish); 
    
            const createdDish = await createDish(newDish);
    
            if (createdDish) {
                console.log("Dish created:", createdDish);
                renderDishes();  
                document.getElementById('form-container').innerHTML = '';  
            } else {
                console.error("Failed to create dish");
            }
        });
    }
}
