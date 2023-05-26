const quoteElement = document.querySelector('.card__quote');
const speakButton = document.querySelector('.btn--speak');
const generateQuoteButton = document.querySelector('.btn--quote');

let generatedQuote;

speakButton.addEventListener('click', () => {
  utterance = new SpeechSynthesisUtterance(generatedQuote || quoteElement.textContent);

  speechSynthesis.speak(utterance);

  if (speechSynthesis.pause) {
    speechSynthesis.resume(utterance);
  }

  generateQuoteButton.disabled = true;

  utterance.addEventListener('end', () => {
    generateQuoteButton.disabled = false;
  });
});

const pauseSpeakButton = document.querySelector('.btn--pause');

function pauseSpeech() {
  if (speechSynthesis.speaking) {
    speechSynthesis.pause();
    generateQuoteButton.disabled = false;
  }
}

pauseSpeakButton.addEventListener('click', pauseSpeech);

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
  generateQuoteButton.innerHTML = 'Loading!';

  speechSynthesis.cancel();

  getData().then((res) => {
    const { content, author } = res.data;
    generatedQuote = content;
    const genereatedHTMLQuote = `
      <blockquote class="card__quote"><i class="fa-solid fa-quote-left" aria-hidden="true"></i>${content}<i class="fa-solid fa-quote-right" aria-hidden="true"></i></blockquote>
      <p class="quote__author">&ndash; ${author}</p>
    `;
    utterance = new SpeechSynthesisUtterance(content);

    quoteContainer.innerHTML = genereatedHTMLQuote;
    generateQuoteButton.disabled = false;
    generateQuoteButton.innerHTML = 'New Quote';
  });
});
