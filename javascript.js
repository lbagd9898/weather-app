async function getWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=YAK8C7JTH98EU4T9SGMU8TAJK`
  );
  const weatherData = await response.json();
  console.log(weatherData);
  processData(weatherData);
}

function processData(data) {
  const conditions = data.currentConditions.conditions;
  const temp = data.currentConditions.temp;
  const location = data.address;
  const displayData = { location, temp, conditions };
  console.log(displayData);
}

getWeatherData("london");
