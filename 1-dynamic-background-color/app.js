const button = document.querySelector('button');
const body = document.body;

function generateRandomNumber() {
  return (Math.floor(Math.random() * 256));
}
button.addEventListener('click', () => {
  body.style.background = `rgb(${generateRandomNumber()}, ${generateRandomNumber()}, ${generateRandomNumber()})`

})