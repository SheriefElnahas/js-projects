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
