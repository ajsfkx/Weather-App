function formatDate() {
  let now = new Date();
  let minutes = now.getMinutes();
  let hours = now.getHours();
  let day = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[day];

  return `Last Updated: ${currentDay} ${hours}:${minutes}`;
}

function getForecast(coordinates) {
  let apikey = "73a00877081bd43422bdee0f3022beb5";

  let apiurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;

  axios.get(apiurl).then(displayForecast);
}

function apiCall(response) {
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${response.data.wind.speed}km/hr`;

  let feelsElement = document.querySelector("#feels");
  feelsElement.innerHTML = `Feels Like: ${response.data.main.feels_like}°C`;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate();

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celciusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function forecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col">
    ${forecastDate(forecastDay.dt)}
    <img
      src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      width="60"
      class="forecast-image"
    />
    <span class="weather-forecast-max">${Math.round(
      forecastDay.temp.max
    )}°</span>
    <span class="weather-forecast-min">${Math.round(
      forecastDay.temp.min
    )}°</span>
  </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apikey = "73a00877081bd43422bdee0f3022beb5";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(apiurl).then(apiCall);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}
let celciusTemperature = null;

function farenheitTemperature(event) {
  event.preventDefault();
  celciusTemp.classList.remove("abc");
  farenheitTemp.classList.add("abc");
  let temperatureElement = document.querySelector("#temp");
  let finalFarenheit = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(finalFarenheit);
}

function celciusTemperaturee(event) {
  event.preventDefault();
  celciusTemp.classList.add("abc");
  farenheitTemp.classList.remove("abc");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitTemp = document.querySelector("#temp-farenheit");
farenheitTemp.addEventListener("click", farenheitTemperature);

let celciusTemp = document.querySelector("#temp-celcius");
celciusTemp.addEventListener("click", celciusTemperaturee);

search("New York");
