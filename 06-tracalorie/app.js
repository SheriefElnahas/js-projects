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
const gainAndLossElement = document.querySelector('#gain-and-loss');
const caloriesConsumedElement = document.querySelector('#calories-consumed');
const caloriesRemaningElement = document.querySelector('#calroies-remnaing');
const caloriesBurnedElement = document.querySelector('#calories-burned');
const dailyCalories = document.querySelector('#daily-calories');

function calculateGainedCalories(caloriesGained) {
  caloriesConsumedElement.textContent = +caloriesConsumedElement.textContent + +caloriesGained;
  caloriesRemaningElement.textContent = caloriesRemaningElement.textContent - caloriesGained;
  gainAndLossElement.textContent = +gainAndLossElement.textContent + +caloriesGained;

  calculateProgressBar(dailyCalories.textContent, caloriesConsumedElement.textContent);

  if (caloriesRemaningElement.textContent < 0 ) {
    caloriesRemaningElement.parentElement.style.background = 'red';
  }
}

function calculateBurnedCalories(caloriesBurned) {
  caloriesBurnedElement.textContent = +caloriesBurnedElement.textContent + +caloriesBurned;

  caloriesRemaningElement.textContent = +caloriesRemaningElement.textContent + +caloriesBurned;

  calculateProgressBar(dailyCalories.textContent, caloriesConsumedElement.textContent, caloriesBurned);
  gainAndLossElement.textContent = +gainAndLossElement.textContent - +caloriesBurned;

  if (caloriesRemaningElement.textContent >= 0 ) {
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

// Set Daily Limit Button Logic
const setDailyLimitBtn = document.getElementById('set-limit-btn');

// setDailyLimitBtn.addEventListener('click', () => {
//   // 1-
// })
// Modal
const modal = document.querySelector('dialog');
const openModalButton = document.querySelector('#open-modal');
const closeModalButton = document.querySelector('#close-modal');
const modalXButton = document.querySelector('.modal__x__btn');
const caloriesLimitInput = document.querySelector('#calories-limit');

const modalForm = document.querySelector('.modal__form');
const alertMessage = document.querySelector('.alert__message');

modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
});

modalXButton.addEventListener('click', () => {
  modal.close();
});

openModalButton.addEventListener('click', () => {
  modal.showModal();
});

closeModalButton.addEventListener('click', () => {
  const caloriesLimit = caloriesLimitInput.value;
  if (caloriesLimit.length === 0) {
    alertMessage.classList.remove('hide');
    return;
  }

  dailyCalories.textContent = caloriesLimit;
  caloriesRemaningElement.textContent = caloriesLimit;

  caloriesLimitInput.value = '';
  alertMessage.classList.add('hide');

  modal.close();
});

// Reset Day
const resetCaloriesBtn = document.querySelector('#reset-calories');
resetCaloriesBtn.addEventListener('click', () => {
  dailyCalories.textContent = 1800;
});
