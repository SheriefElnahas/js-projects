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


async function searchSuperHero(searchText) {
  const result = await axios.get(`https://www.superheroapi.com/api.php/727054372039115/search/${searchText}`);

  console.log(result.data.results);

}

searchInputElement.addEventListener('input', debounce((e) => {
  searchSuperHero(e.target.value);

}, 250));