async function renderDishes() {
    const dishContainer = document.querySelector('.dishes-section');
     //clear the dish container to avoid appending to old content
     dishContainer.innerHTML = '';
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
        const dishElement = document.createElement('tr');
        dishElement.classList.add("dish");

        const dishName = document.createElement('td');
        dishName.textContent = `Name: ${dish.name}`;    

        const dishIngredients = document.createElement('td');
        dishIngredients.textContent = `Ingredients: ${dish.ingredients.join(', ')}`;  

        const preparationSteps = document.createElement('td');
        preparationSteps.textContent = `Preparation steps: ${dish.preparationSteps.join(', ')}`;  

        const dishTime = document.createElement('td');
        dishTime.textContent = `Cooking Time: ${dish.cookingTime} mins`;  

        const dishOrigin = document.createElement('td');
        dishOrigin.textContent = `Origin: ${dish.origin}`;  

        const spiceLevel = document.createElement('td');
        spiceLevel.textContent = `Spice level: ${dish.spiceLevel}`;  

        const servings = document.createElement('td');
        servings.textContent = `Servings: ${dish.servings}`;  

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.classList.add('update-btn');

        console.log('Attaching update listener for dish with id:', dish._id);
        updateButton.addEventListener('click', () => {
            const dishId = dish._id;
            renderDishForm(dishId);
            //attachUpdateButtonEventListener(updateButton, dishId);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');

        deleteButton.addEventListener('click', async () => {
            const confirmDelete = confirm(`Are you sure you want to delete the dish: ${dish.name}?`);
            if(confirmDelete) {
                await deleteDish(dish._id);
                renderDishes();
            }          
        });

        dishElement.append(dishName, dishIngredients, preparationSteps, dishTime, dishOrigin, spiceLevel, servings, updateButton, deleteButton);
        dishesDiv.appendChild(dishElement);
    });
    dishContainer.appendChild(dishesDiv);
};

//render the form for adding/updating the dish
function renderDishForm(dishId = null) {
    const formContainer = document.getElementById('form-container');
    formContainer.innerHTML = ''; 

    const form = document.createElement('form');
    form.id = 'dish-form';

    //create a hidden input for the dish ID (to track the dish during update)
    const dishIdInput = document.createElement('input');
    dishIdInput.type = 'hidden';
    dishIdInput.id = 'dish-id';  
    
    // Set the dishId value if provided (i.e. during update)
    if (dishId) {
        dishIdInput.value = dishId;
    }

    //create the input fields for all the dish properties
    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.textContent = 'Name:';
    const nameInput = document.createElement('input');
    nameInput.id = 'name';
    nameInput.required = true;
 
    const ingredientsLabel = document.createElement('label');
    ingredientsLabel.setAttribute('for', 'ingredients');
    ingredientsLabel.textContent = 'Ingredients:';
    const ingredientsInput = document.createElement('input');
    ingredientsInput.id = 'ingredients';
    ingredientsInput.required = true;
 
    const prepStepsLabel = document.createElement('label');
    prepStepsLabel.setAttribute('for', 'preparationSteps');
    prepStepsLabel.textContent = 'Preparation Steps:';
    const prepStepsInput = document.createElement('input');
    prepStepsInput.id = 'preparationSteps';
    prepStepsInput.required = true;
 
    const cookingTimeLabel = document.createElement('label');
    cookingTimeLabel.setAttribute('for', 'cookingTime');
    cookingTimeLabel.textContent = 'Cooking Time:';
    const cookingTimeInput = document.createElement('input');
    cookingTimeInput.id = 'cookingTime';
    cookingTimeInput.type = 'number';
    cookingTimeInput.required = true;
 
    const originLabel = document.createElement('label');
    originLabel.setAttribute('for', 'origin');
    originLabel.textContent = 'Origin:';
    const originInput = document.createElement('input');
    originInput.id = 'origin';
    originInput.required = true;
 
    const spiceLevelLabel = document.createElement('label');
    spiceLevelLabel.setAttribute('for', 'spiceLevel');
    spiceLevelLabel.textContent = 'Spice Level:';
    const spiceLevelInput = document.createElement('input');
    spiceLevelInput.id = 'spiceLevel';
    spiceLevelInput.required = true;
 
    const servingsLabel = document.createElement('label');
    servingsLabel.setAttribute('for', 'servings');
    servingsLabel.textContent = 'Servings:';
    const servingsInput = document.createElement('input');
    servingsInput.id = 'servings';
    servingsInput.type = 'number';
    servingsInput.required = true;
 
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.classList.add('submit-btn');
    submitButton.textContent = 'Submit';
 
    //append all the elements to the form
    form.append(dishIdInput, nameLabel, nameInput, ingredientsLabel, ingredientsInput,
         prepStepsLabel, prepStepsInput, cookingTimeLabel, cookingTimeInput, originLabel, originInput,
         spiceLevelLabel, spiceLevelInput, servingsLabel, servingsInput, submitButton);

    //append the form to the container
    formContainer.appendChild(form);

    //if dishId passed, retrieve from database and prefill for editing
    if (dishId) {
        console.log('Fetching dish by ID:', dishId);  
        fetchDishById(dishId);
    }

    //attach submit listener
    attachFormEventListener(dishId);
}





