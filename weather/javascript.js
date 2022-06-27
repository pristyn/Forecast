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
  windy.innerHTML = `💨 Wind: ${Math.round(
    position.data.wind.speed * 2.237
  )}mph`;

  var image = document.querySelector("#icon");
  image.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${position.data.weather[0].icon}@2x.png`
  );

  coordinates(position.data.coord);
}

area("lagos");

function weekly(daily) {
  var date = new Date(daily * 1000);
  var day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  return days[day];
}

function forecast(input) {
  var climate = input.data.daily;
  var condition = document.querySelector("#row");

  var climateHTML = `<div class="row">`;
  climate.forEach(function (clime, index) {
    if (index < 4) {
      climateHTML += `
    <div class="col-3">
    <div id="week">${weekly(clime.dt)}</div>
    <img src="http://openweathermap.org/img/wn/${clime.weather[0].icon}@2x.png"
     alt="" width="50"/>
    <div id="description">${clime.weather[0].main}</div>
    <div id="temperature">${Math.round(clime.temp.max)}℃</div>
    
  </div>`;
    }
  });

  climateHTML += `</div>`;
  condition.innerHTML = climateHTML;
}

function coordinates(response) {
  var key = "48aab52cca3acaf961223225511f8994";
  var link = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.lat}&lon=${response.lon}&appid=${key}&units=metric`;
  axios.get(link).then(forecast);
}
