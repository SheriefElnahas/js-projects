// Cancel The speech if the user refreshed the page
window.addEventListener('load', () => {
  speechSynthesis.cancel();
})

const generateQuoteButton = document.querySelector('.btn--quote');

// ************************************************
//           ## Speech Button Logic ##
// *************************************************
document.querySelector('.btn--speak').addEventListener('click', () => {
  // 1- Extract the quote from HTML
  let quote = document.querySelector('.card__quote').textContent;

  quote+= `Said By, ${document.querySelector('.quote__author').textContent}`
  // 2-Create an utterance object from the generate quote
  let utterance = new SpeechSynthesisUtterance(quote);

  // 3-Speak when the user click on the button & prevent the user from generate new quote untill finished
  speechSynthesis.speak(utterance);
  generateQuoteButton.disabled = true;

  // 4-If the speech was paused at any moment, make sure to resume it
  if (speechSynthesis.pause) {
    speechSynthesis.resume(utterance);
  }

  // 5-When the speech is done, enable generete new quote button again
  utterance.addEventListener('end', () => {
    generateQuoteButton.disabled = false;
  });
});

// ************************************************
//          ## Pause Speech Logic ##
// ************************************************
function pauseSpeech() {
  // If speech is on then pause it and enable generate new quote button again
  if (speechSynthesis.speaking) {
    speechSynthesis.pause();
    generateQuoteButton.disabled = false;
  }
}

document.querySelector('.btn--pause').addEventListener('click', pauseSpeech);

// ************************************************
//         ## Copy To Clipboard Logic ##
// ************************************************
const copyButton = document.querySelector('.btn--copy');
copyButton.addEventListener('click', () => {
  // 1-Extract Code Quote From HTML
  const quote = document.querySelector('.card__quote').textContent;

  navigator.clipboard.writeText(quote).then(() => {
    // 2- Show Copied Tooltip
    copyButton.classList.add('copied');

    //  3- Hide It after 2 seconds
    setTimeout(() => {
      copyButton.classList.remove('copied');
    }, 2000);
  });
});

// ************************************************
//          ## Tweet The Quote Logic ##
// ************************************************
const tweetButton = document.querySelector('.btn--tweet');

tweetButton.addEventListener('click', () => {
  const quote = document.querySelector('.card__quote').textContent;

  tweetButton.href = `https://twitter.com/intent/tweet?text=${quote}`;
});

// ********************************************************
//     ## Genearte New Quote From An API Logic ##
// ********************************************************
async function getData() {
  return await axios.get('https://api.quotable.io/random');
}

const quoteContainer = document.querySelector('.quote__container');

generateQuoteButton.addEventListener('click', () => {
  // 1-Disable Generate Button & Change Inner Text to loading
  generateQuoteButton.disabled = true;
  generateQuoteButton.innerHTML = 'Loading!';

  // 2-Cancel The Speech so that it resets and do not resume from the previous stop
  speechSynthesis.cancel();

  getData().then((res) => {
    const { content: quote, author } = res.data;

    const genereatedHTMLQuote = `
      <blockquote class="card__quote"><i class="fa-solid fa-quote-left" aria-hidden="true"></i>${quote}<i class="fa-solid fa-quote-right" aria-hidden="true"></i></blockquote>
      <p class="quote__author">&ndash; ${author}</p>
    `;
    quoteContainer.innerHTML = genereatedHTMLQuote;

    // 3-Enable genearte quote button and reset the button text
    generateQuoteButton.disabled = false;
    generateQuoteButton.innerHTML = 'New Quote';
  });
});


