// async function getWeatherData(location) {
//   const response = await fetch(
//     `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=YAK8C7JTH98EU4T9SGMU8TAJK`
//   );
//   const weatherData = await response.json();
//   console.log(weatherData);
// }

async function getWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=YAK8C7JTH98EU4T9SGMU8TAJK`
  );
  const weatherData = await response.json();
}

// function getWeatherData(location) {
//   fetch(
//     `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=YAK8C7JTH98EU4T9SGMU8TAJK`
//   )
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (response) {
//       return response.json();
//     });
// }

function processData(data) {
  const cond = data.currentConditions.cloudcover;
  console.log(cond);
}

console.log(getWeatherData("london")).then((weatherData) => {
  console.log(weatherData);
});
