const weather = document.querySelector(".js-weather");
const COORDINATES = "Coordinates";
const API_KEY = "7d78bcfc6d1b8624d91e6d7756dd4f5c";

function getWeather(lat, long) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `Temperature is ${temperature} in ${place}`;
    });
}
function saveCoords(coordsObj) {
  localStorage.setItem(COORDINATES, JSON.stringify(coordsObj));
}

function handleSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleError() {
  console.log("Unable to get your location");
}

function askForCoordinates() {
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

function loadCoordinates() {
  const loadedCoordinates = localStorage.getItem(COORDINATES);
  if (loadedCoordinates === null) {
    askForCoordinates();
  } else {
    const parseCoords = JSON.parse(loadedCoordinates);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoordinates();
}

init();
