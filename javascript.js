const form = document.querySelector("form");
const input = document.querySelector("input");
const locationHeader = document.querySelector("#location-header");
const temp = document.querySelector("#temp");
const conditions = document.querySelector("#conditions");
const img = document.querySelector("img");
const toggle = document.querySelector("#toggle");
let fahrenheitTemp = 0;
let celsiusTemp = 0;

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
  fahrenheitTemp = data.currentConditions.temp;
  celsiusTemp = fahrenheightToCelsius(fahrenheitTemp);
  const displayData = { location, temp, conditions };
  console.log(displayData);
  displayWeatherData(displayData);
}

//takes weather data object and displays it in the content tab
function displayWeatherData(object) {
  locationHeader.textContent = object.location;
  temp.textContent = "Temperature: " + object.temp + "\u00b0" + "F";
  conditions.textContent = "Conditions: " + object.conditions;
  console.log(object.conditions);
  resetTempToggle();
  changeImage(object.conditions);
}

function resetTempToggle() {
  toggle.checked = false;
}

//uses giphy api to find an image that coincides with the weather conditions and displays it
async function changeImage(conditions) {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=gYMwWHk9P7vPMBgMMvKCvFmVqSd8KTHY&s=${conditions}`
  );
  const imageData = await response.json();
  img.src = imageData.data.images.original.url;
}

function fahrenheightToCelsius(farenheit) {
  let celsius = (((farenheit - 32) * 5) / 9).toFixed(1);
  return celsius;
}

//changes temperature display when toggle switched
function changeTempDisplay(newTemp, units) {
  temp.textContent = "Temperature: " + newTemp + "\u00b0" + units;
}

getWeatherData("new york");

//changes weather data when user searches for a location
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let location = input.value;
  getWeatherData(location);
});

//eventlistener for toggle to change temperature between fahrenheit and celsius
toggle.addEventListener("change", (e) => {
  if (e.target.checked) {
    changeTempDisplay(celsiusTemp, "C");
  } else {
    changeTempDisplay(fahrenheitTemp, "F");
  }
});
