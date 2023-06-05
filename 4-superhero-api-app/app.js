// ********************************************
// ##            Active Tab Logic            ##
// ********************************************
const buttons = document.querySelectorAll('.state__tab');
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

// ********************************************
// ##           Show & Hide Sections         ##
// ********************************************
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

// ********************************************
// ##       Fetch Data & Show Search List    ##
// ********************************************
const superHerosArr = [];
const searchInputElement = document.querySelector('#search-input');
const searchListElement = document.querySelector('.search__list');

async function searchSuperHero(searchText) {
  // Hide the search list if the the input is empty
  if (searchText.length === 0) {
    searchListElement.classList.add('hide');
  }


  if (searchText.length > 0) {
    // 1- Show the search list
    searchListElement.classList.remove('hide');

    // 2- Fetch the data
    const result = await axios.get(`https://www.superheroapi.com/api.php/730636292148818/search/${searchText}`);
    console.log(result);
    superHerosArr.push(...result.data.results);

    // 3- Build The HTML Out of each data
    const htmlData = result.data.results
      .map((superhero) => {
        return `
      <li class="search__item">
        <a id="${superhero.id}" href="#" class="search__link"><img src="${superhero.image.url}" alt="" class="search__img" />${superhero.name}</a>
      </li>
      `;
      })
      .join('');

    // 4- Inject the result into the HTML
    searchListElement.innerHTML = htmlData;
  }
}

searchInputElement.addEventListener(
  'input',
  debounce((e) => {
    searchSuperHero(e.target.value);
  }, 250)
);

// ********************************************
// ##    Dynamic Data Based On Search Value   ##
// ********************************************
const superheroImage = document.querySelector('.hero__img');
const powerstateHTMLElement = document.querySelector('#powerstates-article');
const biographyHTMLElement = document.querySelector('.biography');
const appearanceHTMlElement = document.querySelector('.appearance');
const connectionsHTMLElement = document.querySelector('.connections');

function buildPowerstateElement(powerstateData) {
  let powerstateHTMLData = '';

  for (let key in powerstateData) {
    powerstateHTMLData += `
    <div class="article__row">
    <div class="row__content">
      <i class="fa-solid fa-shield-halved row__icon icon--shield"></i>
      <p class="row__description">${key}</p>
    </div>
    <p class="row__info info--text">${powerstateData[key]}</p>
  </div>
    `;
  }

  powerstateHTMLElement.innerHTML = powerstateHTMLData;
}

// Shorten Array Data
function shortenArrData(arr) {
  if (Array.isArray(arr)) {
    return arr.splice(2, arr.length - 2);
  }
}

// Shorten String Data
function shortenStrData(obj) {
  obj['first-appearance'] = obj['first-appearance'].split(';')[0];
  return obj;
}

function buildBiographyElement(biographyData) {
  delete biographyData.alignment;

  shortenArrData(biographyData.aliases); // strange example for long list of aliases
  shortenStrData(biographyData)  // spider first search is example of long list of first apperance string data


  let biographyHTMLData = '';

  for (let key in biographyData) {
    biographyHTMLData += `
    <div class="article__row">
    <p class="row__heading">${key}:</p>
    <p class="row__details">${biographyData[key]}</p>
  </div>
    `;
  }

  biographyHTMLElement.innerHTML = biographyHTMLData;
}

function buildApperanceElement(appearanceData) {
  let appearanceHTMLData = '';

  for (let key in appearanceData) {
    appearanceHTMLData += `
    <div class="article__row">
    <div class="row__content">
      <i class="fa-solid fa-star row__icon icon--star"></i>
      <p class="row__description">${key}</p>
    </div>
    <p class="row__info info--box">${appearanceData[key]}</p>
  </div>
    `;
    appearanceHTMlElement.innerHTML = appearanceHTMLData;
  }
}

function buildConnectionsElement(connectionsData) {
  let connectionsHTMLData = '';

  for (let key in connectionsData) {
    connectionsHTMLData += `
    <div class="connections__content">
    <h3 class="connections__heading">${key}</h3>
    <p class="connections__text">${connectionsData[key]}</p>
  </div>
    `;
  }
  connectionsHTMLElement.innerHTML = connectionsHTMLData;
}

searchListElement.addEventListener('click', (e) => {
  // Hide the search list element when the user clicks on a superhero
  searchListElement.classList.add('hide');

  // extract the selected superhero that the user has selected
  const targetElement = superHerosArr.filter((superhero) => superhero.id === e.target.id);

  // change superhero image
  superheroImage.src = targetElement[0].image.url;

  // extract these objects from the selected superhero
  const { powerstats, biography, appearance, connections } = targetElement[0];

  // build HTML element out of the selected superhero data
  buildPowerstateElement(powerstats);
  buildBiographyElement(biography);
  buildApperanceElement(appearance);
  buildConnectionsElement(connections);
});


async function init() {
  // Extract Batman Data
  const result = await axios.get(`https://www.superheroapi.com/api.php/730636292148818/70`);

  // Change Superhero Image
  superheroImage.src = result.data.image.url;

  // Extract The Superhero Data
  const { powerstats, biography, appearance, connections } = result.data

  // Build HTML Out of the extracted ata
  buildPowerstateElement(powerstats);
  buildBiographyElement(biography);
  buildApperanceElement(appearance);
  buildConnectionsElement(connections);
}

init();