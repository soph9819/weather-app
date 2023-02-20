let dateInfo = new Date();
let weatherEmoji = document.querySelector("#current-weather-icon");

console.log(dateInfo.getDay());
let todaysDate = document.querySelector(".todays-date");
let days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
let currentHour = dateInfo.getHours();
let currentMinute = dateInfo.getMinutes();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
let dayOfWeek = dateInfo.getDay();
dayOfWeek = days[dateInfo.getDay()]; //converting number to NAME of the day of the week
todaysDate.innerHTML = `${dayOfWeek} ${currentHour}:${currentMinute}`;

//showing weather for searched location or ${currentCity}
let currentHigh = document.querySelector("#current-high");
let currentLow = document.querySelector("#current-low");

//function for searched cities
function displayCurrentCityTemp(response) {
  console.log(response.data.main.temp);
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°F`;
  currentHigh.innerHTML = `${Math.round(response.data.main.temp_max)}°F`;
  currentLow.innerHTML = `${Math.round(response.data.main.temp_min)}°F`;
  currentCondition.innerHTML = `${response.data.weather[0].description}`; //current conditions
  //setting emoji based on current conditions
  weatherEmoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  //adding alt image info
  weatherEmoji.setAttribute(
    "alt",
    `emoji representing ${response.data.weather[0].description}`
  );
  windSpeed.innerHTML = `wind: ${Math.round(response.data.wind.speed)} km/h`; //wind
  humidity.innerHTML = `humidity: ${response.data.main.humidity}%`; //humidity
}

//setting city that is searched to show in app
let currentCity = document.querySelector("#current-city");
function searchCity(event) {
  event.preventDefault();
  let userCityInput = document.querySelector("#search-area");
  console.log(userCityInput.value);
  userCityInput.value = userCityInput.value.toLowerCase();
  currentCity.innerHTML = `${userCityInput.value}`;
  //capitalize userinput at some point
  axios //trim etc. {usercityinput} at some point
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput.value}&units=imperial&appid=515c9ddbeb3cda9061acfab71031839e`
    )
    .then(displayCurrentCityTemp);
}
let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", searchCity);
//search button triggers this
//converting between C and F
let tempConverter = document.querySelector("#temp-converter");
console.log(tempConverter);

let currentTemp = document.querySelector("#current-temp");
let currentCondition = document.querySelector("#current-condition");
let windSpeed = document.querySelector("#wind-speed");
let humidity = document.querySelector("#humidity");
let apiKey = "515c9ddbeb3cda9061acfab71031839e";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=`;

//upon opening the app, current location weather is shown
function retrievePosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  axios
    .get(`${apiUrl}${lat}&lon=${long}&units=imperial&appid=${apiKey}`)
    .then(findCityTemp);

  function findCityTemp(response) {
    console.log(response);
    currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°F `;
    response.data.name = response.data.name.toLowerCase();
    currentCity.innerHTML = `${response.data.name}`;
    currentHigh.innerHTML = `${Math.round(response.data.main.temp_max)}°F`; //highest temp
    currentLow.innerHTML = `${Math.round(response.data.main.temp_min)}°F`; //lowest temp
    currentCondition.innerHTML = `${response.data.weather[0].description}`; //current conditions
    //setting emoji based on current conditions
    weatherEmoji.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    //adding alt image info
    weatherEmoji.setAttribute(
      "alt",
      `emoji representing ${response.data.weather[0].description}`
    );
    windSpeed.innerHTML = `wind: ${Math.round(response.data.wind.speed)} km/h`; //wind
    humidity.innerHTML = `humidity: ${response.data.main.humidity}%`; //humidity
  }
}

navigator.geolocation.getCurrentPosition(retrievePosition);

let currentLocButton = document.querySelector("#current-loc-button");
function currentLocButtonClicked() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
currentLocButton.addEventListener("click", currentLocButtonClicked);
