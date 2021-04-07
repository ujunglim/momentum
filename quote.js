const quote = document.querySelector('.quote');

const getQuote = () => {
  fetch('./quotes.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    // console.log(data[0].text, data[0].author)
  })
}

function init() {
  getQuote();


}

init();