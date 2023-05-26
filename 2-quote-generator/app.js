const quote = document.querySelector('.card__quote');
const speakButton = document.querySelector('.btn--speak');
const generateQuoteButton = document.querySelector('.btn--quote');

speakButton.addEventListener('click', () => {
  const utterance = new SpeechSynthesisUtterance(quote.textContent);
  speechSynthesis.speak(utterance);

  generateQuoteButton.disabled = true;

  utterance.addEventListener('end', () => {
    generateQuoteButton.disabled = false;
  });
});

const copyButton = document.querySelector('.btn--copy');

copyButton.addEventListener('click', () => {
  navigator.clipboard.writeText(quote.textContent).then(() => {
    copyButton.classList.add('copied');

    setTimeout(() => {
      copyButton.classList.remove('copied');
    }, 2000);
  });
});
