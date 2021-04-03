
const weatherDOM = document.querySelector(".jsWeather");

const API_KEY = "b53ce7cd48c147440cd16264b4419699";
const COORD = 'coord'

const getWeather = (lat, lon) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
  .then(response => {
    return response.json()
  })
  .then(json => {
    const weather = json.weather[0].main;
    const temp = Math.round(json.main.temp);
    const location = json.name;

    weatherDOM.innerText = `${weather} ${temp} ${location}`
  })
}

const saveCoord = (coordObj) => {
  localStorage.setItem(COORD, JSON.stringify(coordObj));
}

const getPosSuccess = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordObj = {latitude, longitude};

  saveCoord(coordObj);
  getWeather(latitude, longitude)
}

const getPosError = () => {
  console.log("Can't access geo location");
}

const askForCoord = () => {
  navigator.geolocation.getCurrentPosition(getPosSuccess, getPosError)
}

const loadCoord = () => {
  const loadedCoord = localStorage.getItem(COORD);
  if(!loadedCoord) {
    askForCoord();
  }
  else {
    // get weather
    const parsedCoord = JSON.parse(loadedCoord);
    getWeather(parsedCoord.latitude, parsedCoord.longitude);
  }
}

function init() {
  loadCoord();
}

init()