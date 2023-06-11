const formInput = document.querySelector('.form__input');
const addButton = document.querySelector('#add-button');
const cardList = document.querySelector('.card__list');

document.querySelector('form').addEventListener('submit', (e) => e.preventDefault());


addButton.addEventListener('click', () => {
  // Captalize the first letter in each word
  const capatalizedStr = formInput.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // Create LI & Add Content & Class To It
  const newTodo = document.createElement('li');



  newTodo.classList.add('card__item');
  newTodo.innerHTML = `${capatalizedStr}<div class="card__icons"><i class="fa-solid fa-pen-to-square card__icon icon--edit"></i><i class="fa-solid fa-trash card__icon icon--delete"></i></div>`;
  cardList.appendChild(newTodo);

  // Clear The Input
  formInput.value = '';
});