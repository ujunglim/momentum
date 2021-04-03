const body = document.querySelector("body");

const IMG_NUMBER = 10;

const getRandomNum = () => {
  return Math.ceil(Math.random() * IMG_NUMBER);
}

const showImage = (numb) => {
  const image = new Image();
  image.src = `./image/${numb}.jpg`;
  image.classList.add('backgroundImage');
  body.appendChild(image);
}

function init() {
  const randomNum = getRandomNum();
  showImage(randomNum);
}

init();