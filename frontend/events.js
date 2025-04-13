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

async function attachFormEventListener(dishId = null) {
    const dishForm = document.getElementById('dish-form');
    if (dishForm) {
        dishForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            //get the dishId from the hidden input field
            //const dishId = document.getElementById('dish-id').value;
            
            const newDish = {
                name: document.getElementById('name').value,
                ingredients: document.getElementById('ingredients').value.split(','),
                preparationSteps: document.getElementById('preparationSteps').value.split(','),
                cookingTime: document.getElementById('cookingTime').value,
                origin: document.getElementById('origin').value,
                spiceLevel: document.getElementById('spiceLevel').value,
                servings: document.getElementById('servings').value,
            };

            if (dishId) {
                //update dish
                newDish._id = dishId;
                const updatedDish = await updateDish(newDish);
                if (updatedDish) {
                    console.log("Dish updated:", updatedDish);
                    renderDishes();
                    document.getElementById('form-container').innerHTML = '';  
                } else {
                    console.error("Failed to update dish");
                }
            } else {
                //create dish
                const createdDish = await createDish(newDish);
                if (createdDish) {
                    console.log("Dish created:", createdDish);
                    renderDishes();
                    document.getElementById('form-container').innerHTML = '';  
                } else {
                    console.error("Failed to create dish");
                }
            }
        });
    }
}

function attachUpdateButtonEventListener(updateButton, dishId) {
    updateButton.addEventListener('click', () => {
        console.log('Dish ID for update:', dishId); 
        renderDishForm(dishId);  //pass the correct ID to the form
    });
}
