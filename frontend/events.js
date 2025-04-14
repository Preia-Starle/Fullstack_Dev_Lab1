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

async function attachFormEventListener(dishName) {
    const dishForm = document.getElementById('dish-form');
    if (dishForm) {
        dishForm.addEventListener('submit', async (e) => {
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

            //if dishName is passed, fetch the dish ID and update
            if (dishName) {
                const dish = await fetchDishByName(dishName);
                if (dish) {
                    newDish._id = dish._id;  
                    const updatedDish = await updateDish(newDish);
                    if (updatedDish) {
                        console.log("Dish updated:", updatedDish);
                        renderDishes();  //re-render dishes after update
                        document.getElementById('form-container').innerHTML = '';  // Clear form
                    } else {
                        console.error("Failed to update dish");
                    }
                } else {
                    console.error('Dish not found for update');
                }
            } else {
                //create new dish if no dishName provided
                const createdDish = await createDish(newDish);
                if (createdDish) {
                    console.log("Dish created:", createdDish);
                    renderDishes();  //re-render dishes after creation
                    document.getElementById('form-container').innerHTML = '';  // Clear form
                } else {
                    console.error("Failed to create dish");
                }
            }
        });
    }
}

function attachUpdateButtonEventListener(updateButton, dishName) {
    updateButton.addEventListener('click', () => {
        console.log('Dish Name for update:', dishName);
        renderDishForm(dishName); 
    });
}
