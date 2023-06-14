const formInput = document.querySelector('.form__input');
const addButton = document.querySelector('#add-button');
const editButton = document.querySelector('#edit-button');
const cardList = document.querySelector('.card__list');
const alertText = document.querySelector('.alert__text');
const clearAllButton = document.querySelector('.clear__button');

document.querySelector('form').addEventListener('submit', (e) => e.preventDefault());

function showAlertText(alertMessage, alertBackgroundClass) {
  alertText.textContent = alertMessage;

  // alertText.style.visibility = 'visible';
  alertText.classList.add(alertBackgroundClass);

  setTimeout(() => {
    // alertText.style.visibility = 'hidden';
    alertText.classList.remove(alertBackgroundClass);
  }, 1000);
}

function addTodoToTheList(todo) {
  // If the user didn't provide any value then show alert message and dont add any item
  if (todo.length === 0) {
    showAlertText('Please Enter Value', 'alert--red');
    return;
  }

  const newTodo = document.createElement('li');

  newTodo.innerHTML = `<li class="card__item"> ${todo} <div class="card__icons"><i class="fa-solid fa-pen-to-square card__icon  icon--edit"></i><i class="fa-solid fa-trash card__icon icon--delete"></i></div>
</li>`;

  cardList.appendChild(newTodo);

  // Clear the input
  formInput.value = '';

  // show alert text
  showAlertText('Item was added to the list', 'alert--green');
}

addButton.addEventListener('click', () => {
  addTodoToTheList(formInput.value);

  // Show Clear All Button if the list has any item
  if (cardList.innerHTML !== '') {
    clearAllButton.style.visibility = 'visible';
  }
});

let targetLi;

cardList.addEventListener('click', (e) => {
  // When user clicks on delete icon
  if (e.target.classList.contains('icon--delete')) {
    // Remove This Li
    const li = e.target.parentElement.parentElement;

    li.remove();
    showAlertText('Item Removed', 'alert--red');
  }

  if (e.target.classList.contains('icon--edit')) {
    // Copy todo text to the input

    targetLi = e.target.parentElement.parentElement;

    formInput.value = targetLi.textContent.trim();

    // Hide add button and show edit button
    addButton.classList.add('hide');

    editButton.classList.remove('hide');
  }
});

editButton.addEventListener('click', () => {
  targetLi.innerHTML = `${formInput.value}<div class="card__icons"><i class="fa-solid fa-pen-to-square card__icon icon--edit"></i><i class="fa-solid fa-trash card__icon icon--delete"></i></div>`;

  showAlertText('Value Changed', 'alert--green');

  formInput.value = '';

  // Hide edit button and show add button
  addButton.classList.remove('hide');

  editButton.classList.add('hide');
});

clearAllButton.addEventListener('click', () => {
  cardList.innerHTML = '';

  showAlertText('Empty List', 'alert--red');

  setTimeout(() => {
    clearAllButton.style.visibility = 'hidden';
  }, 1000);
});
