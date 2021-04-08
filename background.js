const UNSPLASH_KEY = "gEWMDZqOynH1rpYb60vKEajc-a9m0I27Ccxgf4njbSA";
// DOM
const body = document.querySelector("body");
const linkDOM = document.querySelector(".bg_link");
const locationDOM = document.querySelector(".bg_location");
const photographerDOM = document.querySelector(".bg_photographer");

const showBGImage = (img) => {
  const url = img.urls.regular;
  body.style.backgroundImage = `url("${url}")`;
}

const showBGImageInfo = (img) => {
  const link = img.links.html;
  let location = img.user.location;
  const photographer = img.user.name;

  if(!location) {
    location = "Unsplash nature";
  }

  linkDOM.href = link;
  locationDOM.innerText = location;
  photographerDOM.innerText = photographer;
}

const loadBGImage = () => {
  fetch(`https://api.unsplash.com/search/photos/?query=nature&color=black&orientation=landscape&client_id=${UNSPLASH_KEY}`)
  .then(response => {return response.json()})
  .then(data => {
    const images = data.results;
    const index = Math.floor(Math.random() * images.length);
    const img = images[index];

    showBGImage(img);
    showBGImageInfo(img);
  })
}

function init() {
  loadBGImage();
}

init();