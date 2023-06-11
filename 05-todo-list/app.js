const formInput = document.querySelector('.form__input');
const addButton = document.querySelector('#add-button');
const editButton = document.querySelector('#edit-button');
const cardList = document.querySelector('.card__list');

document.querySelector('form').addEventListener('submit', (e) => e.preventDefault());
function capatalizedStr(str) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

addButton.addEventListener('click', () => {
  // Captalize the first letter in each word
  // const capatalizedStr = formInput.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const captalizedInputValue = capatalizedStr(formInput.value);

  // Create LI & Add Content & Class To It
  const newTodo = document.createElement('li');

  newTodo.classList.add('card__item');
  newTodo.innerHTML = `${captalizedInputValue}<div class="card__icons"><i class="fa-solid fa-pen-to-square card__icon icon--edit"></i><i class="fa-solid fa-trash card__icon icon--delete"></i></div>`;
  cardList.appendChild(newTodo);

  // Clear The Input
  formInput.value = '';
});

let targetLi;

cardList.addEventListener('click', (e) => {
  // When user clicks on delete icon
  if (e.target.classList.contains('icon--delete')) {
    // Remove This Li
    const li = e.target.parentElement.parentElement;

    li.remove();
  }

  if (e.target.classList.contains('icon--edit')) {
    // Copy todo text to the input
    console.log(e.target.parentElement.parentElement);
    targetLi = e.target.parentElement.parentElement;

    formInput.value = targetLi.textContent.trim();

    // Hide add button and show edit button
    addButton.classList.add('hide');
    editButton.classList.remove('hide');
  }
});

editButton.addEventListener('click', (e) => {
  const captalizedInputValue = capatalizedStr(formInput.value);

  targetLi.innerHTML = `${captalizedInputValue}<div class="card__icons"><i class="fa-solid fa-pen-to-square card__icon icon--edit"></i><i class="fa-solid fa-trash card__icon icon--delete"></i></div>`;

  formInput.value = '';

      // Hide edit button and show add button
      addButton.classList.remove('hide');
      editButton.classList.add('hide');
});
