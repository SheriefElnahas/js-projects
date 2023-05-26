const quote = document.querySelector('.card__quote');
const btnSpeak = document.querySelector('.btn--speak');

btnSpeak.addEventListener('click', () => {
  const utterance = new SpeechSynthesisUtterance(quote.textContent);
  speechSynthesis.speak(utterance);
  
})