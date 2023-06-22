// ********************************************
// ##   Add Meal & Add Workout Form Toggle   ##
// ********************************************
const addMealDataBtn = document.querySelector('#add-meal');
const mealForm = document.querySelector('#meal-form');

const addWorkoutDataBtn = document.querySelector('#add-workout');
const workoutForm = document.querySelector('#workout-form');

addMealDataBtn.addEventListener('click', () => {
  mealForm.style.display = 'block';

  const mealOutputDivs = document.querySelectorAll('#output-meal');
  if (mealOutputDivs) {
    mealOutputDivs.forEach((mealOutputdiv) => (mealOutputdiv.style.display = 'none'));
  }
});

addWorkoutDataBtn.addEventListener('click', () => {
  workoutForm.style.display = 'block';

  const workoutOutputDivs = document.querySelectorAll('#output-workout');
  if (workoutOutputDivs) {
    workoutOutputDivs.forEach((workoutOutputdiv) => (workoutOutputdiv.style.display = 'none'));
  }
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

const mealData = document.querySelector('#meal-data');

addMealItemBtn.addEventListener('click', () => {
  const mealOutputHTML = `<div id="output-meal" class="form__output">
  <p id="output-meal" class="output__value">${mealItemInput.value}</p>
  <p id="output-meal" class="output__calories">${mealCaloriesInput.value}</p>
  <button class="output__btn">x</button>
  </div>`;

  mealItemInput.value = '';
  mealCaloriesInput.value = '';

  mealData.insertAdjacentHTML('beforeend', mealOutputHTML);

  const mealOutputDivs = document.querySelectorAll('#output-meal');
  if (mealOutputDivs) {
    mealOutputDivs.forEach((mealOutputdiv) => (mealOutputdiv.style.display = 'flex'));
  }

  mealForm.style.display = 'none';
});

const addWorkoutBtn = document.querySelector('#add-workout-item');
const workoutOutput = document.querySelector('#output-workout');

const workoutItemInput = document.querySelector('#workout-item');
const workoutCaloriesInput = document.querySelector('#workout-calories');

const outputWorkoutValue = document.querySelector('#output-workout-item');
const outputWorkoutCalories = document.querySelector('#output-workout-calories');

const workoutData = document.querySelector('#workout-data');

addWorkoutBtn.addEventListener('click', () => {
  const workoutOutputHTML = `<div id="output-workout" class="form__output">
  <p id="output-workout-item" class="output__value">${workoutItemInput.value}</p>
  <p id="output-workout-calories" class="output__calories">${workoutCaloriesInput.value}</p>
  <button class="output__btn">x</button>
  </div>`;

  workoutItemInput.value = '';
  workoutCaloriesInput.value = '';

  workoutData.insertAdjacentHTML('beforeend', workoutOutputHTML);

  const workoutOutputDivs = document.querySelectorAll('#output-workout');
  if (workoutOutputDivs) {
    workoutOutputDivs.forEach((workoutOutputdiv) => (workoutOutputdiv.style.display = 'flex'));
  }

  workoutForm.style.display = 'none';
});
