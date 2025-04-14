async function renderDishes() {
    const dishContainer = document.querySelector('.dishes-section');
    dishContainer.innerHTML = '';  //clear the dish container to avoid appending old content

    const dishes = await fetchDishes();  //fetch all dishes
    if (dishes.length === 0) {
        dishContainer.textContent = "No dishes found";
        return;
    }

    const dishesDiv = document.createElement('div');
    dishesDiv.classList.add("dishes-div");

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

        attachUpdateButtonEventListener(updateButton, dish.name);  //attach event listener for updating the dish

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');

        deleteButton.addEventListener('click', async () => {
            const confirmDelete = confirm(`Are you sure you want to delete the dish: ${dish.name}?`);
            if (confirmDelete) {
                await deleteDish(dish._id);
                renderDishes();  //re-render dishes after delete
            }
        });

        dishElement.append(dishName, dishIngredients, preparationSteps, dishTime, dishOrigin, spiceLevel, servings, updateButton, deleteButton);
        dishesDiv.appendChild(dishElement);
    });
    dishContainer.appendChild(dishesDiv);
};


//render the form for adding/updating the dish
async function renderDishForm(dishName=null) {
        const formContainer = document.getElementById('form-container');
        formContainer.innerHTML = '';  //clear the form container before rendering
    
        const form = createDishForm(dishName);  //create the form with the dish name
        formContainer.appendChild(form);  //append the form to the container
    
        if (dishName) {
            console.log('Fetching dish by name:', dishName);
    
            //fetch the dish by name
            const dish = await fetchDishByName(dishName);
            console.log('Fetched dish:', dish);
    
            if (dish) {
                fillFormWithDishData(dish);  //fill the form with the fetched dish data
            } else {
                console.error('Dish not found or failed to fetch');
            }
        }
    
        //attach the form submit listener
        attachFormEventListener(dishName);
    }


//helper to create form elements
function createDishForm(dishName = null) {
    const form = document.createElement('form');
    form.id = 'dish-form';

    const dishIdInput = document.createElement('input');
    dishIdInput.type = 'hidden';
    dishIdInput.id = 'dish-id'; 

    const nameInput = createInputField('text', 'name', 'Name:');
    if (dishName) {
        nameInput.querySelector('input').value = dishName; //set the value of the name field if dishName is provided
    }

    const ingredientsInput = createInputField('text', 'ingredients', 'Ingredients:');
    const prepStepsInput = createInputField('text', 'preparationSteps', 'Preparation Steps:');
    const cookingTimeInput = createInputField('number', 'cookingTime', 'Cooking Time:');
    const originInput = createInputField('text', 'origin', 'Origin:');
    const spiceLevelInput = createInputField('text', 'spiceLevel', 'Spice Level:');
    const servingsInput = createInputField('number', 'servings', 'Servings:');

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.classList.add('submit-btn');
    submitButton.textContent = 'Submit';

    // Append all input fields to the form
    form.append(dishIdInput, nameInput, ingredientsInput, prepStepsInput, cookingTimeInput, originInput, spiceLevelInput, servingsInput, submitButton);

    return form;
}

//helper function to create individual input fields
function createInputField(type, id, labelText) {
    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = labelText;

    const input = document.createElement('input');
    input.id = id;
    input.type = type;
    input.required = true;

    const wrapper = document.createElement('div');
    wrapper.append(label, input);
    return wrapper;
}

function fillFormWithDishData(dish) {
    document.getElementById('name').value = dish.name;
    document.getElementById('ingredients').value = dish.ingredients.join(', ');
    document.getElementById('preparationSteps').value = dish.preparationSteps.join(', ');
    document.getElementById('cookingTime').value = dish.cookingTime;
    document.getElementById('origin').value = dish.origin;
    document.getElementById('spiceLevel').value = dish.spiceLevel;
    document.getElementById('servings').value = dish.servings;
    document.getElementById('dish-id').value = dish._id;  //set the hidden dish ID field
}






