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
