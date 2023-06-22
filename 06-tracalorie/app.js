// ********************************************
// ##   Add Meal & Add Workout Form Toggle   ##
// ********************************************
const opeanMealFormBtn = document.getElementById('open-meal-form-btn');
const mealForm = document.getElementById('meal-form');
const mealOutputContainer = document.getElementById('meal-output-container');

opeanMealFormBtn.addEventListener('click', () => {
  // 1- Show Meal Form
  mealForm.style.display = 'block';

  // 2- Hide Meal Output Data
  mealOutputContainer.style.display = 'none';
});

const openWorkoutFormBtn = document.getElementById('open-workout-form-btn');
const workoutForm = document.getElementById('workout-form');
const workoutOutputContainer = document.getElementById('workout-output-container');

openWorkoutFormBtn.addEventListener('click', () => {
  // 1- Show Workout Form
  workoutForm.style.display = 'block';

  // 2- Hide Workout Output Data
  workoutOutputContainer.style.display = 'none';
});

// **************************************************
// ##   Add Meal Item & Add Workout Item  ##
// **************************************************

const dataForms = document.querySelectorAll('.data__form');

dataForms.forEach((dataForm) => {
  dataForm.addEventListener('click', (e) => {
    e.preventDefault();

    // If user clicked on Add Meal Item Btn
    if (e.target.id === 'add-meal-item-btn') {
      // Extract Meal Item Input & Meal Calories Input Data
      const mealItemInput = document.getElementById('meal-item');
      const mealCaloriesInput = document.getElementById('meal-calories');

      // Call Add And pass the meal input and meal calories input
      addMealOutput(mealItemInput, mealCaloriesInput);
    }

    if (e.target.id === 'add-workout-item-btn') {
      const workoutItemInput = document.getElementById('workout-item');
      const workoutCaloriesInput = document.getElementById('workout-calories');

      addWorkoutOutput(workoutItemInput, workoutCaloriesInput);
    }
  });
});

function addMealOutput(mealItem, mealCalories) {
  // Built The HTML Data From The Item & Calories Input Values
  const mealOutputHTML = `<div id="output-meal" class="form__output">
    <p class="output__value">${mealItem.value}</p>
    <p class="output__calories">${mealCalories.value}</p>
    <button class="output__btn">x</button>
  </div>`;

  // Clear The Inputs After We Get The Value
  mealItem.value = mealCalories.value = '';

  // Insert The Meal HTMl Data Into Meal COntainer
  mealOutputContainer.insertAdjacentHTML('beforeend', mealOutputHTML);

  // Show Meal Output Data & Hide Meal Form
  mealOutputContainer.style.display = 'block';
  mealForm.style.display = 'none';
}

function addWorkoutOutput(workoutItem, workoutCalories) {
  const workoutOutputHTML = `<div id="output-workout" class="form__output">
  <p class="output__value">${workoutItem.value}</p>
  <p class="output__calories">${workoutCalories.value}</p>
  <button class="output__btn">x</button>
  </div>`;

  workoutItem.value = workoutCalories.value = '';

  workoutOutputContainer.insertAdjacentHTML('beforeend', workoutOutputHTML);

  workoutOutputContainer.style.display = 'block';
  workoutForm.style.display = 'none';
}
