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
  console.log(response.data);
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
}

let apikey = "73a00877081bd43422bdee0f3022beb5";
let city = "New York";
let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
axios.get(apiurl).then(apiCall);
