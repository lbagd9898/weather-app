const form = document.querySelector("form");
const input = document.querySelector("input");
const locationHeader = document.querySelector("#location-header");
const temp = document.querySelector("#temp");
const conditions = document.querySelector("#conditions");
const img = document.querySelector("img");
const toggle = document.querySelector("#toggle");
let displayTemp = 0;

//retrieve weather data from VisualCrossing API using input location
async function getWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=YAK8C7JTH98EU4T9SGMU8TAJK`
  ).catch((err) => {
    console.log(err);
    alert(err);
  });
  const weatherData = await response.json();
  console.log(weatherData);
  processData(weatherData);
}

//use API data to create object with all display data
function processData(data) {
  const conditions = data.currentConditions.conditions;
  const temp = data.currentConditions.temp;
  const location = data.resolvedAddress;
  displayTemp = data.currentConditions.temp;
  const displayData = { location, temp, conditions };
  console.log(displayData);
  displayWeatherData(displayData);
}

function displayWeatherData(object) {
  locationHeader.textContent = object.location;
  temp.textContent = "Temperature: " + object.temp + "\u00b0" + "F";
  conditions.textContent = "Conditions: " + object.conditions;
  console.log(object.conditions);
  changeImage(object.conditions);
}

async function changeImage(conditions) {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=gYMwWHk9P7vPMBgMMvKCvFmVqSd8KTHY&s=${conditions}`
  );
  const imageData = await response.json();
  img.src = imageData.data.images.original.url;
}

function fahrenheightToCelsius(farenheit) {
  let celsius = farenheit - (32 * 5) / 9;
  return celsius;
}

function celsiusToFahrenheit(celsius) {
  let farenheit = (celsius * 5) / 9 + 32;
  return farenheit;
}

function changeTempDisplay(newTemp) {
  temp.textContent = "Temperature: " + object.temp + "\u00b0" + "F";
}

getWeatherData("new york");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let location = input.value;
  getWeatherData(location);
});

toggle.addEventListener("change", (e) => {
  if (e.target.checked) {
    let newTemp = fahrenheightToCelsius(displayTemp);
    displayTemp = newTemp;
    changeTempDisplay(newTemp);
  } else {
    let newTemp = celsiusToFahrenheit(displayTemp);
    displayTemp = newTemp;
    changeTempDisplay(newTemp);
  }
});
