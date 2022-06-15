function weekDays(day) {
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let days = week[day.getDay()];
  let hours = day.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let min = day.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  return `${days} ${hours}:${min}`;
}

let currentDate = document.querySelector("#date");
let current = new Date();
currentDate.innerHTML = weekDays(current);

function city(event) {
  event.preventDefault();
  var cities = document.querySelector("#input").value;
  area(cities);
}

let type = document.querySelector("#search");
type.addEventListener("submit", city);

let currentCity = document.querySelector("#current");
currentCity.addEventListener("click", locator);

function locator(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(navigation);
}

function area(city) {
  var key = "48aab52cca3acaf961223225511f8994";
  var source = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(source).then(metropolis);
}

function navigation(navigate) {
  var key = "48aab52cca3acaf961223225511f8994";
  var lon = navigate.coords.longitude;
  var lat = navigate.coords.latitude;
  var locate = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(locate).then(metropolis);
}

function metropolis(position) {
  var title = document.querySelector("#city");
  title.innerHTML = position.data.name;

  var celsius = document.querySelector("#temp");
  var temperature = Math.round(position.data.main.temp);
  celsius.innerHTML = `${temperature}℃`;

  var description = document.querySelector("#cloud");
  description.innerHTML = position.data.weather[0].main;

  var humid = document.querySelector("#humid");
  humid.innerHTML = `💧 Humidity: ${position.data.main.humidity}%`;

  var windy = document.querySelector("#wind");
  windy.innerHTML = `💨 Wind: ${Math.round(position.data.wind.speed)}km/h`;
}

let key = "48aab52cca3acaf961223225511f8994";
let url = "https://api.openweathermap.org/data/2.5/weather?q=paris";

function rs(response) {
  console.log(response);
}
axios.get(`${url}&appid=${key}`).then(rs);
