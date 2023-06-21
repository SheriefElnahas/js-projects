const addMealBtn = document.querySelector('#add-meal');
const mealForm = document.querySelector('#meal-form');

const addWorkoutBtn = document.querySelector('#add-workout');
const workoutForm = document.querySelector('#workout-form');

addMealBtn.addEventListener('click', () => {
  mealForm.classList.remove('data__form--hide');
  mealForm.classList.add('data__form--show');
});

addWorkoutBtn.addEventListener('click', () => {

  workoutForm.classList.remove('data__form--hide');
  workoutForm.classList.add('data__form--show');
});
