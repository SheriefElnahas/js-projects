const quoteElement = document.querySelector('.card__quote');
const speakButton = document.querySelector('.btn--speak');
const generateQuoteButton = document.querySelector('.btn--quote');

speakButton.addEventListener('click', () => {
  const utterance = new SpeechSynthesisUtterance(quoteElement.textContent);
  speechSynthesis.speak(utterance);

  generateQuoteButton.disabled = true;

  utterance.addEventListener('end', () => {
    generateQuoteButton.disabled = false;
  });
});

const copyButton = document.querySelector('.btn--copy');

copyButton.addEventListener('click', () => {
  navigator.clipboard.writeText(quoteElement.textContent).then(() => {
    copyButton.classList.add('copied');

    setTimeout(() => {
      copyButton.classList.remove('copied');
    }, 2000);
  });
});

const tweetButton = document.querySelector('.btn--tweet');

tweetButton.addEventListener('click', () => {
  tweetButton.href = `https://twitter.com/intent/tweet?text=${quoteElement.textContent}`;
});

async function getData() {
  return await axios.get('https://api.quotable.io/random');
}

const quoteContainer = document.querySelector('.quote__container');

generateQuoteButton.addEventListener('click', () => {
  generateQuoteButton.disabled = true;
  generateQuoteButton.innerHTML = 'Loading!'

  getData().then((res) => {
    const { content, author } = res.data;
    const genereatedHTMLQuote = `
      <blockquote class="card__quote"><i class="fa-solid fa-quote-left" aria-hidden="true"></i>${content}<i class="fa-solid fa-quote-right" aria-hidden="true"></i></blockquote>
      <p class="quote__author">&ndash; ${author}</p>
    `;
    quoteContainer.innerHTML = genereatedHTMLQuote;
    generateQuoteButton.disabled = false;
    generateQuoteButton.innerHTML = 'New Quote'
  });

});
