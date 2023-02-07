let dateInfo = new Date();
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

function displayCurrentCityTemp(response) {
  console.log(response.data.main.temp);
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°F`;
  currentHigh.innerHTML = `${Math.round(response.data.main.temp_max)}°F`;
  currentLow.innerHTML = `${Math.round(response.data.main.temp_min)}°F`;
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

//let converted = 0; Old Stuff from conversion formula
let currentTemp = document.querySelector("#current-temp");
let apiKey = "515c9ddbeb3cda9061acfab71031839e";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=`;

//upon opening the app, current location weather is shown
function retrievePosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  console.log(lat);
  console.log(long);
  axios
    .get(`${apiUrl}${lat}&lon=${long}&units=imperial&appid=${apiKey}`)
    .then(findCityTemp);

  function findCityTemp(response) {
    console.log(response);
    //response.data.name;
    currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°F `;
    //let currentCity = document.querySelector("#current-city");
    response.data.name = response.data.name.toLowerCase();
    currentCity.innerHTML = `${response.data.name}`;
    console.log(response.data.main.temp);
    currentHigh.innerHTML = `${Math.round(response.data.main.temp_max)}°F`;
    currentLow.innerHTML = `${Math.round(response.data.main.temp_min)}°F`;
    console.log(response.data.main.temp_min);
    //add high lows at some point
  }
}
navigator.geolocation.getCurrentPosition(retrievePosition);

let currentLocButton = document.querySelector("#current-loc-button");
function currentLocButtonClicked() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
currentLocButton.addEventListener("click", currentLocButtonClicked);
