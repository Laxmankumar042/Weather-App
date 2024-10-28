const weatherHeading = document.querySelector(".weather-heading");
const weatherSubHeading = document.querySelector(".weather-sub-heading");
const weatherCodition = document.querySelector(".weather-condition");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const tempMax = document.querySelector(".min");
const tempMin = document.querySelector(".max");
const feelsLike = document.querySelector(".feels-like");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind");
const pressure = document.querySelector(".pressure");
const search = document.querySelector("#search");
const inputField = document.querySelector(".input-field");

// Search Function
let city = "Dhanbad";
search.addEventListener("submit", (e) => {
  e.preventDefault();
  city = inputField.value;
  getWeatherData();
  inputField.value = "";
});

// Covert time(sec) into another formate
const getCurtDataAndTime = (dt) => {
  const curtDate = new Date(dt * 1000);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(curtDate);
};

const getWeatherData = async () => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}`;
  const apiKey = "dbb1125befd907466fc9230cefb8e46c";
  try {
    const respose = await fetch(apiUrl + `&appid=${apiKey}`);
    const data = await respose.json();
    console.log(data);

    const { name, weather, main, sys, wind } = data;
    weatherHeading.innerText = `${name}, ${sys.country}`;

    const date = getCurtDataAndTime(data.dt);
    weatherSubHeading.innerText = date;

    weatherCodition.innerText = weather[0].main;

    weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="image">`;

    temperature.innerHTML = `${Math.round(main.temp)}&deg;C`;
    tempMax.innerHTML = `Max: ${Math.round(main.temp_max)}&deg;C`;
    tempMin.innerHTML = `Min: ${Math.round(main.temp_min)}&deg;C`;
    feelsLike.innerHTML = `${Math.round(main.feels_like)}&deg;C`;
    humidity.innerText = `${main.humidity}%`;
    pressure.innerText = `${main.pressure}hpa`;
    windSpeed.innerText = `${wind.speed} m/s`;
  } catch (error) {
    console.log(error);
  }
};

document.querySelector("body").addEventListener("load", getWeatherData());
