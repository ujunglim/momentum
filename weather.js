const weather_icon = document.querySelector(".weather_icon");
const weather_temp = document.querySelector(".jsWeather_temp");
const weather_location = document.querySelector(".jsWeather_location");

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
    let icon;
    const hour = new Date().getHours();

    // night
    if(hour >= 19 || hour < 5) {
      icon = "fas fa-moon";
    }
    else {
      switch(weather) {
        case "Clear":
          icon = "fas fa-sun";
          break;
        case "Rain":
          icon = "fas fa-cloud-showers-heavy";
          break;
        case "Snow":
          icon = "far fa-snowflake"
          break;
        case "Clouds":
          icon = "far fa-cloud";
          break;
        case "Thunderstorm":
          icon = "far fa-bolt";  
          break;
        case "Drizzle":
          icon = "far fa-cloud-rain";  
          break;
        case "Dust":
          icon = "far fa-water";  
          break;
        case "Mist":
          icon = "far fa-smog";  
          break;
      }
    }

    weather_icon.setAttribute("class", icon + " fa-2x");  // size
    weather_temp.innerText = `${temp}°`;
    weather_location.innerText = `${location}`;
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