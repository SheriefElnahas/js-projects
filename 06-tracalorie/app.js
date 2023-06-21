// ********************************************
// ##   Add Meal & Add Workout Form Toggle   ##
// ********************************************
const addMealDataBtn = document.querySelector('#add-meal');
const mealForm = document.querySelector('#meal-form');

const addWorkoutDataBtn = document.querySelector('#add-workout');
const workoutForm = document.querySelector('#workout-form');

addMealDataBtn.addEventListener('click', () => {
  mealForm.style.display = 'block';
  mealOutput.style.display = 'none';
});

addWorkoutDataBtn.addEventListener('click', () => {
  workoutForm.style.display = 'block';
  workoutOutput.style.display = 'none';
});

// **************************************************
// ##   Add Meal Item & Add Workout Items Buttons  ##
// **************************************************
document.querySelectorAll('form').forEach((form) => form.addEventListener('submit', (e) => e.preventDefault()));

const addMealItemBtn = document.querySelector('#add-meal-item');
const mealOutput = document.querySelector('#output-meal');

const mealItemInput = document.querySelector('#meal-item');
const mealCaloriesInput = document.querySelector('#meal-calories');

const outputMealValue = document.querySelector('#output-meal-item');
const outputMealCalories = document.querySelector('#output-meal-calories');

addMealItemBtn.addEventListener('click', () => {
  outputMealValue.textContent = mealItemInput.value;
  outputMealCalories.textContent = mealCaloriesInput.value;

  mealItemInput.value = '';
  mealCaloriesInput.value = '';

  mealForm.style.display = 'none';
  mealOutput.style.display = 'flex';
});

const addWorkoutBtn = document.querySelector('#add-workout-item');
const workoutOutput = document.querySelector('#output-workout');

const workoutItemInput = document.querySelector('#workout-item');
const workoutCaloriesInput = document.querySelector('#workout-calories');

const outputWorkoutValue = document.querySelector('#output-workout-item');
const outputWorkoutCalories = document.querySelector('#output-workout-calories');

addWorkoutBtn.addEventListener('click', () => {
  outputWorkoutValue.textContent = workoutItemInput.value;
  outputWorkoutCalories.textContent = workoutCaloriesInput.value;

  workoutItemInput.value = '';
  workoutCaloriesInput.value = '';

  workoutForm.style.display = 'none';
  workoutOutput.style.display = 'flex';
});
