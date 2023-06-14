document.querySelector('form').addEventListener('submit', (e) => e.preventDefault());

const formInput = document.querySelector('.form__input');
const formButton = document.querySelector('.form__button');
const cardList = document.querySelector('.card__list');
const clearAllButton = document.querySelector('.clear__button');



const todosArr = Array.from(cardList.children);
console.log(todosArr);
// *********************  Helper Functions *****************
function showAlertText(alertMessage, alertBackgroundClass) {
  const alertText = document.querySelector('.alert__text');
  alertText.textContent = alertMessage;
  alertText.classList.add(alertBackgroundClass);

  // Remove Alert Message After 1 Second
  setTimeout(() => {
    alertText.classList.remove(alertBackgroundClass);
  }, 1000);
}

function addTodo(todo) {
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

let editedLi;

formButton.addEventListener('click', () => {
  if (formButton.textContent.toLocaleLowerCase() === 'add') {
    addTodo(formInput.value);

    // Show Clear All Button if the list has any item
    if (cardList.innerHTML !== '') {
      clearAllButton.style.visibility = 'visible';
    }
  }

  if (formButton.textContent.toLocaleLowerCase() === 'edit') {
    editedLi.innerHTML = `${formInput.value}<div class="card__icons"><i class="fa-solid fa-pen-to-square card__icon icon--edit"></i><i class="fa-solid fa-trash card__icon icon--delete"></i></div>`;

    showAlertText('Value Changed', 'alert--green');

    formInput.value = '';
    formButton.textContent = 'add';
  }
});

cardList.addEventListener('click', (e) => {
  // When user clicks on delete icon
  if (e.target.classList.contains('icon--delete')) {
    // Remove This Li
    const li = e.target.parentElement.parentElement;

    li.remove();
    showAlertText('Item Removed', 'alert--red');
    console.log(cardList.children.length);

    if (cardList.children.length === 0) {
      // Hide Clear ALl button

      setTimeout(() => {
        clearAllButton.style.visibility = 'hidden';
      }, 750);
    }
  }

  if (e.target.classList.contains('icon--edit')) {
    // Copy todo text to the input
    editedLi = e.target.parentElement.parentElement;

    formInput.value = editedLi.textContent.trim();
    formButton.textContent = 'edit';
  }
});

clearAllButton.addEventListener('click', () => {
  cardList.innerHTML = '';

  showAlertText('Empty List', 'alert--red');

  setTimeout(() => {
    clearAllButton.style.visibility = 'hidden';
  }, 1000);
});
