document.querySelector('form').addEventListener('submit', (e) => e.preventDefault());

const formInput = document.querySelector('.form__input');
const formButton = document.querySelector('.form__button');
const cardList = document.querySelector('.card__list');
const clearAllButton = document.querySelector('.clear__button');

let storedTodoArr;
let selectedTodo;
let selectedTodoId;

// *********************  Create A New Todo And Insert It Inside HTML *****************
function insertTodoInHTML(todoText, todoId) {
  const newTodo = document.createElement('li');
  newTodo.className = 'card__item';
  newTodo.dataset.todoId = todoId;

  newTodo.innerHTML = `${todoText}<div class="card__icons"><i class="fa-solid fa-pen-to-square card__icon  icon--edit"></i><i class="fa-solid fa-trash card__icon icon--delete"></i></div>
  `;

  cardList.appendChild(newTodo);
}

window.addEventListener('load', () => {
  // Extract Stored Todo Items From Local Storage - If it is not exist then assign it to an empty array
  storedTodoArr = JSON.parse(localStorage.getItem('todoItems')) || [];
  console.log(storedTodoArr);

  if (storedTodoArr.length > 0) {
    clearAllButton.style.visibility = 'visible';
  }

  storedTodoArr.forEach(({ todoText, todoId }) => {
    insertTodoInHTML(todoText, todoId);
  });
});

function showAlertText(alertMessage, alertBackgroundClass) {
  const alertText = document.querySelector('.alert__text');
  alertText.textContent = alertMessage;
  alertText.classList.add(alertBackgroundClass);

  // Remove Alert Message After 1 Second
  setTimeout(() => {
    alertText.classList.remove(alertBackgroundClass);
  }, 1000);
}

function addTodoToArr(todoText) {
  const todoObj = {
    todoText,
    todoId: new Date().getTime(),
  };

  storedTodoArr.push(todoObj);

  // Save to localStorage
  localStorage.setItem('todoItems', JSON.stringify(storedTodoArr));

  return todoObj.todoId;
}

function addTodoToTheList(todo, todoId) {
  insertTodoInHTML(todo, todoId);

  // Clear the input
  formInput.value = '';

  // show alert text
  showAlertText('Item was added to the list', 'alert--green');
}

function editTodo(selectedTodo, selectedTodoId) {
  const targetTodo = storedTodoArr.find((todo) => todo.todoId == selectedTodoId);
  targetTodo.todoText = formInput.value;

  // Store the new modified Array in LocalStorage
  localStorage.setItem('todoItems', JSON.stringify(storedTodoArr));

  selectedTodo.innerHTML = `${formInput.value}<div class="card__icons"><i class="fa-solid fa-pen-to-square card__icon icon--edit"></i><i class="fa-solid fa-trash card__icon icon--delete"></i></div>`;

  showAlertText('Value Changed', 'alert--green');

  formInput.value = '';
  formButton.textContent = 'add';
}

formButton.addEventListener('click', () => {
  // If the user didn't provide any value then show alert message and dont add any item
  if (formInput.value.length === 0) {
    showAlertText('Please Enter Value', 'alert--red');
    return;
  }

  if (formButton.textContent.toLocaleLowerCase() === 'add') {
    // Add a new todo to TodoArr
    const todoId = addTodoToArr(formInput.value);

    addTodoToTheList(formInput.value, todoId);

    // Show Clear All Button if the list has any item
    if (cardList.children.length !== 0) {
      clearAllButton.style.visibility = 'visible';
    }
  }

  if (formButton.textContent.toLocaleLowerCase() === 'edit') {
    editTodo(selectedTodo, selectedTodoId);
  }
});

function removeTodo(selectedTodo, selectedTodoId) {
  // Remove the selected todo from storedTodoArra and reassign it to the new filtered Arr.
  storedTodoArr = storedTodoArr.filter((todo) => todo.todoId != selectedTodoId);

  // Store the new modified Array in LocalStorage
  localStorage.setItem('todoItems', JSON.stringify(storedTodoArr));

  // Remove selected Todo from the DOM
  selectedTodo.remove();

  // Show Alert Message
  showAlertText('Item Removed', 'alert--red');

  // Hide Clear ALl button
  if (cardList.children.length === 0) {
    setTimeout(() => {
      clearAllButton.style.visibility = 'hidden';
    }, 750);
  }
}

cardList.addEventListener('click', (e) => {
  if (e.target.classList.contains('icon--delete') || e.target.classList.contains('icon--edit')) {
    selectedTodo = e.target.parentElement.parentElement;
    selectedTodoId = selectedTodo.dataset.todoId;
  }

  // When user clicks on delete icon
  if (e.target.classList.contains('icon--delete')) {
    removeTodo(selectedTodo, selectedTodoId);
  }

  // When user clicks on edit icon
  if (e.target.classList.contains('icon--edit')) {
    // Copy selectedTodo text to the input
    formInput.value = selectedTodo.textContent.trim();

    // Change Button Text to edit to trigger edit button logic
    formButton.textContent = 'edit';
  }
});

clearAllButton.addEventListener('click', () => {
  cardList.innerHTML = '';
  storedTodoArr = [];
  localStorage.setItem('todoItems', JSON.stringify(storedTodoArr));

  showAlertText('Empty List', 'alert--red');

  setTimeout(() => {
    clearAllButton.style.visibility = 'hidden';
  }, 1000);
});
