const buttons = document.querySelectorAll('.hero__tab');
const articles = document.querySelectorAll('article');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    // Remove the active class from all buttons
    buttons.forEach((button) => {
      button.classList.remove('active');
    });

    // Add the active class to the clicked button
    button.classList.add('active');
  });
});

const powerStatesButton = document.getElementById('powerstates-bttuon');
const powerStatesArticle = document.getElementById('powerstates-article');

powerStatesButton.addEventListener('click', () => {
  powerStatesArticle.classList.remove('hide');
});

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    articles.forEach((article) => {
      article.classList.add('hide');
    });

    articles[i].classList.remove('hide');
  });
}

// API Logic

// https://www.superheroapi.com/api.php/727054372039115/search/

// Helper Function 
function debounce(func, delay = 250) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const superHerosArr = [];
const searchInputElement = document.querySelector('#search-input');

const searchListElement = document.querySelector('.search__list');

async function searchSuperHero(searchText) {
  // Hide the search list if the the input is empty
  if (searchText.length === 0) {
    searchListElement.classList.add('hide');
  }



  console.log(searchText.length > 0)
  
  if (searchText.length > 0) {
    // 1- Show the search list 
    searchListElement.classList.remove('hide');

    const result = await axios.get(`https://www.superheroapi.com/api.php/727054372039115/search/${searchText}`);

    console.log(result.data.results);

    const htmlData = result.data.results.map(movie => {

      return `
      <li class="search__item">
        <a href="#" class="search__link"><img src="${movie.image.url}" alt="" class="search__img" />${movie.name}</a>
      </li>
      `
    }).join('');

    searchListElement.innerHTML = htmlData;
  }




}

searchInputElement.addEventListener('input', debounce((e) => {
  searchSuperHero(e.target.value);

}, 250));