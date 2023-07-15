// ************************************
// ##   Set Daily Limit Modal Start  ##
// ************************************
const setDailyLimitModalElement = document.querySelector('dialog');
const setDailyLimitBtn = document.querySelector('#open-modal');
const updateDailyLimitBtn = document.querySelector('#close-modal');

const dailyCaloriesElement = document.querySelector('#daily-calories');
const caloriesRemaningElement = document.querySelector('#calroies-remnaing');

const modalForm = document.querySelector('.modal__form');
modalForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

setDailyLimitBtn.addEventListener('click', () => {
  setDailyLimitModalElement.showModal();
});

setDailyLimitModalElement.addEventListener('click', (e) => {
  console.log(e.target);
  if (e.target.textContent === 'X') {
    setDailyLimitModalElement.close();
  }

  if (e.target.textContent === 'Update') {
    updateDailyCaloriesLimit();
  }
});

function updateDailyCaloriesLimit() {
  const caloriesLimitInput = document.querySelector('#calories-limit');
  const alertMessage = document.querySelector('.alert__message');

  // If user didn't provide any value, then show alert message and return from the function
  if (caloriesLimitInput.value.length === 0) {
    alertMessage.classList.remove('hide');
    return;
  }

  // Else - Update daily calories and calories remaning.
  dailyCaloriesElement.textContent = caloriesRemaningElement.textContent = caloriesLimitInput.value;

  // Empty out input value and hide alert message
  caloriesLimitInput.value = '';
  alertMessage.classList.add('hide');

  setDailyLimitModalElement.close();
}

// ************************************
// ##   Set Daily Limit Modal End    ##
// ************************************

// **************************************************
// ##   Add Meal & Add Workout Form Toggle Start   ##
// **************************************************
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
// ##   Add Meal & Add Workout Form Toggle End   ##
// **************************************************

// **************************************************
// ##   Add Meal Item & Add Workout Item  ##
// **************************************************

const dataForms = document.querySelectorAll('.data__form');
const gainAndLossElement = document.querySelector('#gain-and-loss');
const caloriesConsumedElement = document.querySelector('#calories-consumed');

const caloriesBurnedElement = document.querySelector('#calories-burned');

function calculateGainedCalories(caloriesGained) {
  caloriesConsumedElement.textContent = +caloriesConsumedElement.textContent + +caloriesGained;
  caloriesRemaningElement.textContent = caloriesRemaningElement.textContent - caloriesGained;
  gainAndLossElement.textContent = +gainAndLossElement.textContent + +caloriesGained;

  calculateProgressBar(dailyCaloriesElement.textContent, caloriesConsumedElement.textContent);

  if (caloriesRemaningElement.textContent < 0) {
    caloriesRemaningElement.parentElement.style.background = 'red';
  }
}

function calculateBurnedCalories(caloriesBurned) {
  caloriesBurnedElement.textContent = +caloriesBurnedElement.textContent + +caloriesBurned;

  caloriesRemaningElement.textContent = +caloriesRemaningElement.textContent + +caloriesBurned;

  calculateProgressBar(dailyCalories.textContent, caloriesConsumedElement.textContent, caloriesBurned);
  gainAndLossElement.textContent = +gainAndLossElement.textContent - +caloriesBurned;

  if (caloriesRemaningElement.textContent >= 0) {
    caloriesRemaningElement.parentElement.style.background = '#f0e8e8';
  }
}

function calculateProgressBar(dailyLimit, caloriesConsumed, caloriesBurned) {
  const progressBar = document.querySelector('.progress');

  if (caloriesBurned) {
    const widthToExtract = +gainAndLossElement.textContent - +caloriesBurned;

    const progressBarWidth = widthToExtract * 0.1;
    console.log(progressBarWidth);
    progressBar.style.width = `${progressBarWidth > 100 ? 100 : progressBarWidth}%`;
    if (progressBarWidth <= 100) {
      progressBar.style.background = '#2f992f';
    }

    return;
  }

  const progressBarWidth = (+caloriesConsumed / +dailyLimit) * 100;

  if (progressBarWidth > 100) {
    progressBar.style.width = `100%`;
    progressBar.style.background = 'red';
    return;
  }

  progressBar.style.width = `${progressBarWidth}%`;
  progressBar.style.background = '#2f992f';
}

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

  // calculate gain calories
  calculateGainedCalories(mealCalories.value);

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

  calculateBurnedCalories(workoutCalories.value);

  workoutItem.value = workoutCalories.value = '';

  workoutOutputContainer.insertAdjacentHTML('beforeend', workoutOutputHTML);

  workoutOutputContainer.style.display = 'block';
  workoutForm.style.display = 'none';
}

// Reset Day
const resetCaloriesBtn = document.querySelector('#reset-calories');
resetCaloriesBtn.addEventListener('click', () => {
  dailyCalories.textContent = 1800;
});

// 219
