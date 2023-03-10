let days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
function formatDate(timestamp) {
  //calculating date
  let dateInfo = new Date();
  let currentHour = dateInfo.getHours();
  let currentMinute = dateInfo.getMinutes();
  let dayOfWeek = dateInfo.getDay();
  dayOfWeek = days[dateInfo.getDay()];
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  return `${dayOfWeek} ${currentHour}:${currentMinute}`;
}
let weatherEmoji = document.querySelector("#current-weather-icon");

//showing weather for searched location or ${currentCity}
let currentHigh = document.querySelector("#current-high");
let currentLow = document.querySelector("#current-low");

//function for searched cities
function displayCurrentCityTemp(response) {
  console.log(response.data.main.temp);
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
  currentHigh.innerHTML = `${Math.round(response.data.main.temp_max)}`;
  currentLow.innerHTML = `${Math.round(response.data.main.temp_min)}`;
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
  //todaysDate.innerHTML = formatDate(response.data.dr * 1000);
  celsiusTemperature = response.data.main.temp;
  displayCelsiusTemperature(Event);
}

//setting city that is searched to show in app
let currentCity = document.querySelector("#current-city");
function searchCity(event) {
  event.preventDefault();
  let userCityInput = document.querySelector("#search-area"); //selecting the search area input
  console.log(userCityInput.value);
  userCityInput.value = userCityInput.value.toLowerCase();
  currentCity.innerHTML = `${userCityInput.value}`;
  //capitalize userinput at some point
  axios //trim etc. {usercityinput} at some point
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${userCityInput.value}&units=metric&appid=515c9ddbeb3cda9061acfab71031839e`
    )
    .then(displayCurrentCityTemp);
}
let searchCityForm = document.querySelector("#search-city-form");
//listening for search button click
searchCityForm.addEventListener("submit", searchCity);

let tempConverter = document.querySelector("#temp-converter");
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
    .get(`${apiUrl}${lat}&lon=${long}&units=metric&appid=${apiKey}`)
    .then(findCityTemp);

  function findCityTemp(response) {
    console.log(response);
    currentTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
    response.data.name = response.data.name.toLowerCase();
    currentCity.innerHTML = `${response.data.name}`;
    currentHigh.innerHTML = `${Math.round(response.data.main.temp_max)}`; //highest temp
    currentLow.innerHTML = `${Math.round(response.data.main.temp_min)}`; //lowest temp
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
    //new date time structuring
    let todaysDate = document.querySelector(".todays-date");
    todaysDate.innerHTML = `as of: ${formatDate(response.data.dr * 1000)}`;
    celsiusTemperature = response.data.main.temp;
  }
}

navigator.geolocation.getCurrentPosition(retrievePosition);

let currentLocButton = document.querySelector("#current-loc-button");
function currentLocButtonClicked() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
currentLocButton.addEventListener("click", currentLocButtonClicked);

let celsiusTemperature = null;

//temperature unit conversion
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(fahrenheitTemperature);
  //removing active class from celsius link:
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  currentTemp.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//have active class for Celsius button become active once something is searched
//OR have app acknowledge what unit has been selected for future searches or current loc button presses
