const quote = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.quoteAuthor');

const getQuote = () => {
  fetch('./quotes.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    const randomNum = Math.floor(Math.random()*data.length);
    quote.innerText = `"${data[randomNum].text}"`;
    quoteAuthor.innerText = data[randomNum].author;
  })
}

function init() {
  getQuote();
}

init();