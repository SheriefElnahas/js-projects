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

const searchInputElement = document.querySelector('#search-input');

searchInputElement.addEventListener('input', debounce((e) => {
  console.log(e.target.value);

  axios.get(`https://www.superheroapi.com/api.php/727054372039115/search/${e.target.value}`).then((res) => {
  console.log(res.data);
}).catch((err) => {
    console.log(err);
})

  
}, 250));