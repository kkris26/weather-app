const weatherCodes = {
  0: {
    weather: "Clear sky",
    day_logo: "/clear.svg",
    night_logo: "/clear-night.svg",
  },
  1: {
    weather: "Mainly clear",
    day_logo: "/clear.svg",
    night_logo: "/clear-night.svg",
  },
  2: {
    weather: "Partly cloudy",
    day_logo: "/partly-cloudy.svg",
    night_logo: "/partly-cloudy-night.svg",
  },
  3: {
    weather: "Overcast",
    day_logo: "/overcast.svg",
    night_logo: "/overcast.svg",
  },
  45: { weather: "Fog", day_logo: "/fog.svg", night_logo: "/fog-night.svg" },
  48: {
    weather: "Rime fog",
    day_logo: "/rime-fog.svg",
    night_logo: "/rime-fog.svg",
  },
  51: {
    weather: "Light drizzle",
    day_logo: "/light-drizzle.svg",
    night_logo: "/light-drizzle.svg",
  },
  53: {
    weather: "Moderate drizzle",
    day_logo: "/drizzle.svg",
    night_logo: "/drizzle.svg",
  },
  55: {
    weather: "Heavy drizzle",
    day_logo: "/heavy-drizzle.svg",
    night_logo: "/heavy-drizzle.svg",
  },
  56: {
    weather: "Freezing drizzle",
    day_logo: "/light-drizzle.svg",
    night_logo: "/light-drizzle.svg",
  },
  57: {
    weather: "Freezing drizzle",
    day_logo: "/heavy-drizzle.svg",
    night_logo: "/heavy-drizzle.svg",
  },
  61: {
    weather: "Slight rain",
    day_logo: "/slight-rain.svg",
    night_logo: "/slight-rain-night.svg",
  },
  63: {
    weather: "Moderate rain",
    day_logo: "/rain.svg",
    night_logo: "/rain.svg",
  },
  65: {
    weather: "Heavy rain",
    day_logo: "/heavy-rain.svg",
    night_logo: "/heavy-rain.svg",
  },
  66: {
    weather: "Freezing rain",
    day_logo: "/rain.svg",
    night_logo: "/rain.svg",
  },
  67: {
    weather: "Heavy freezing rain",
    day_logo: "/heavy-rain.svg",
    night_logo: "/heavy-rain.svg",
  },
  71: {
    weather: "Slight snow",
    day_logo: "/light-snow.svg",
    night_logo: "/light-snow-night.svg",
  },
  73: {
    weather: "Moderate snow",
    day_logo: "/light-snow.svg",
    night_logo: "/light-snow-night.svg",
  },
  75: {
    weather: "Heavy snow",
    day_logo: "/heavy-snow.svg",
    night_logo: "/heavy-snow.svg",
  },
  77: {
    weather: "Snow grains",
    day_logo: "/snow-grains.svg",
    night_logo: "/snow-grains.svg",
  },
  80: {
    weather: "Light showers",
    day_logo: "/light-drizzle.svg",
    night_logo: "/light-drizzle.svg",
  },
  81: {
    weather: "Rain showers",
    day_logo: "/rain-showers.svg",
    night_logo: "/rain-showers.svg",
  },
  82: {
    weather: "Heavy showers",
    day_logo: "/heavy-rain-showers.svg",
    night_logo: "/heavy-rain-showers.svg",
  },
  85: { weather: "Light snow", day_logo: "/snow.svg", night_logo: "/snow.svg" },
  86: {
    weather: "Heavy snow",
    day_logo: "/heavy-snow-showers.svg",
    night_logo: "/heavy-snow-showers.svg",
  },
  95: {
    weather: "Thunderstorm",
    day_logo: "/thunderstorm.svg",
    night_logo: "/thunderstorm.svg",
  },
  96: {
    weather: "Thunder + hail",
    day_logo: "/thunderstorm.svg",
    night_logo: "/thunderstorm.svg",
  },
  99: {
    weather: "Heavy thunder",
    day_logo: "/thunderstorm.svgg",
    night_logo: "/thunderstorm.svg",
  },
};

let errorGetCurrentLocation = false;
function formatDateTime(value) {
  const dateTime = new Date(value);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formatter = new Intl.DateTimeFormat("en-GB", options);

  const formated = formatter.format(dateTime);
  return formated;
}
function formatDay(value) {
  const date = new Date(value);
  const options = {
    weekday: "long",
  };

  const formatter = new Intl.DateTimeFormat("en-GB", options);

  const formated = formatter.format(date);
  return formated;
}
function formatTime(value) {
  const date = new Date(value);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const formatter = new Intl.DateTimeFormat("en-GB", options);

  const formated = formatter.format(date);
  return formated;
}

//   open and close popup
const popUp = document.getElementById("pop-up-search");
const btnSearch = document.getElementById("btn-search");
const btnClose = document.getElementById("close-search");
function openPopup() {
  popUp.classList.remove("hidden");
}
function closePopup() {
  popUp.classList.add("hidden");
}
btnClose.addEventListener("click", () => {
  closePopup();
});
btnSearch.addEventListener("click", () => {
  openPopup();
});

const defaultData = "sumatra";
getLocation(defaultData);
document.getElementById("lokasiInput").value = defaultData;
async function getLocation(value) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${value}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const result = await data.results;
    if (!result) {
      throw "no-result";
    }
    console.log(data);

    const display = document.getElementById("display");
    display.innerHTML = "";

    for (let i = 0; i < result.length; i++) {
      const button = document.createElement("button");
      const location = result[i].name;
      const country = result[i].country;
      const countryCode = result[i].country_code.toLowerCase();
      const lat = result[i].latitude;
      const lon = result[i].longitude;
      const province = result[i].admin1;
      const region = result[i].admin2;
      const regionProvince = [region, province];
      const regionProvinceJoin = regionProvince.filter(Boolean).join(", ");
      const subLocation = [region, province, country];
      const subLocationJoin = subLocation.filter(Boolean).join(", ");
      button.className =
        "card border-1 border-white/30 bg-gray-300/40 cursor-pointer p-2 hover:bg-gray-200/40 rounded-lg";
      button.innerHTML = `
                    <div class="flex gap-2">
              <img src="https://hatscripts.github.io/circle-flags/flags/${countryCode}.svg" width="48" class="border rounded-full border-white/30">
                    <div class="flex flex-col items-start justify-center w-100%">
                    <h2 class="text-white text-sm" >${location}, ${country}</h2>
                    
                    ${
                      regionProvinceJoin
                        ? `<div class="flex">
             <p class="text-[10px] md:text-[-14] text-left text-white/70">${regionProvinceJoin}</p>  
                 </div>`
                        : ""
                    }
              </div>
        `;

      button.addEventListener("click", () => {
        closePopup();
        getWeather(lat, lon, location, subLocationJoin);
      });

      display.appendChild(button);
    }
  } catch (error) {
    console.log(error);
    if (error === "no-result") {
      display.innerHTML = `
      <p class="text-white md:text-sm text-xs">"${value}" not found</p>
      `;
    } else {
      errorPopup("Cannot connect to the server. Please try again later.");
    }
  }
}
const form = document.getElementById("locationForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = document.getElementById("lokasiInput").value.trim();
  if (value) {
    getLocation(value);
  }
});

async function getWeatherCurrentLocation(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`;
  const proxyURL = `https://api.allorigins.win/get?url=${encodeURIComponent(
    url
  )}`;

  document.getElementById("location-name").innerText = "Geting Location ....";
  document.getElementById("sub-location-name").innerText =
    "Geting Location ....";
  try {
    const response = await fetch(proxyURL);
    console.log(response);
    if (!response.ok) {
      throw "Gagal Fetch";
    }
    console.log("fetching");
    const result = await response.json();
    const data = JSON.parse(result.contents);
    console.log(data);
    const location = data.display_name;
    const country = data.address.country;
    getWeather(lat, lon, location, country);
  } catch (error) {
    console.log(error);
    getWeather(lat, lon);
  }
}

const currentDisplay = document.getElementById("current");
const currentLocationName = document.getElementById("location-name");
const currentSubLocation = document.getElementById("sub-location-name");
const currentTemperature = document.getElementById("current-temperature");
const currentImgWeather = document.getElementById("img-current-weather");
const currentWeather = document.getElementById("current-weather");
const currentHumidity = document.getElementById("current-humidity");
const today = document.getElementById("today");
const currentWindSpeed = document.getElementById("current-wind-speed");
const currentTime = document.getElementById("current-time");
const weatherLoading = document.getElementById("weather-loading");
const weather = document.getElementById("weather");

// error popup
const errorContainer = document.getElementById("error-popup");
const errorText = document.getElementById("error-text");
const btnCloseerrorPopup = document.getElementById("close-error-popup");

function errorPopup(text) {
  errorContainer.classList.remove("hidden");
  errorText.innerText = text;
}

btnCloseerrorPopup.addEventListener("click", () => {
  errorContainer.classList.add("hidden");
});
// error popup

async function getWeather(lat, lon, location, country) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,sunrise,sunset,temperature_2m_max,temperature_2m_min&current=weather_code,is_day,temperature_2m,wind_speed_10m,relative_humidity_2m&timezone=auto`;
  try {
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      throw "bad request";
    }
    const data = await response.json();
    const daily = data.daily;
    const currentData = data.current;
    const units = data.current_units;
    const isDay = currentData.is_day;
    const weatherData = weatherCodes[currentData.weather_code];
    const humidity = currentData.relative_humidity_2m;
    console.log(currentData);
    console.log(daily);

    const weather = document.getElementById("weather");
    // to html
    currentLocationName.innerText = location
      ? location
      : "Failed get location name";
    currentSubLocation.innerText = country
      ? country
      : "Failed get location name";
    currentTemperature.innerText = `${currentData.temperature_2m} ${units.temperature_2m}`;
    currentImgWeather.src = `assets/${
      isDay ? weatherData.day_logo : weatherData.night_logo
    }`;
    currentImgWeather.className = ("w-full", "p-4");
    currentWeather.innerText = weatherData.weather;
    currentHumidity.innerText = `${humidity} ${units.relative_humidity_2m}`;
    today.innerText = "Today";
    currentWindSpeed.innerText = `${currentData.wind_speed_10m} ${units.wind_speed_10m}`;

    currentTime.innerText = formatDateTime(currentData.time);
    // to html

    const nightBG = "bg-[url(assets/bg-night.webp)]";
    const dayBG = "bg-[url(assets/bg-day.webp)]";
    currentDisplay.classList.add(currentData.is_day ? dayBG : nightBG);
    currentDisplay.classList.remove(currentData.is_day ? nightBG : dayBG);

    weather.innerHTML = "";
    for (let i = 1; i < daily.time.length; i++) {
      const date = daily.time[i];
      const code = daily.weather_code[i];
      const weatherDataDaily = weatherCodes[code];
      const minTemp = daily.temperature_2m_min[i];
      const maxTemp = daily.temperature_2m_max[i];
      const sunrise = daily.sunrise[i];
      const sunset = daily.sunset[i];

      const card = document.createElement("div");
      card.className =
        "backdrop-blur-sm  hover:bg-white/25 w-full text-[8px] md:text-xs flex flex-col justify-between bg-white/30 p-3 md:p-4 h-[100%] relative text-white text-sm rounded";

      card.innerHTML = `
              <div class="flex gap-1 justify-between">
                <p>${formatDay(date)}</p>
                <p class="text-end">${minTemp} °C - ${maxTemp} °C</p>
              </div>
              <div
                class="absolute mt-[-10px] w-full flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <img class="w-30" src="assets/${
                  isDay
                    ? weatherDataDaily.day_logo
                    : weatherDataDaily.night_logo
                }" />
                <p class="absolute bottom-0 capitalize text-[10px] md:text-xs px-4 text-center">${
                  weatherDataDaily.weather
                }</p>
      
    
              </div>

              <div class="flex gap-4 mt-2 justify-between">
                <div class="flex gap-2 items-center">
                  <img class="w-5" src="assets/sunrise.svg" />
                  <p>${formatTime(sunrise)}</p>

                </div>
                <div class="flex gap-2 items-center">
                  <img class="w-5" src="assets/sunset.svg" />
                  <p>${formatTime(sunset)}</p>
                </div>
              </div>`;
      weather.appendChild(card);
    }
  } catch (error) {
    if (error == "bad request") {
      const text = `Oops! We couldn’t find any data for “${location}”`;
      errorPopup(text);
    } else {
      console.log(error);
      console.log("gagal");
      const text = "Cannot connect to the server. Please try again later.";
      errorPopup(text);
    }
  }
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, errorMessage);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    errorGetCurrentLocation = false;
    getWeatherCurrentLocation(lat, lon);
  }
  function errorMessage(error) {
    console.log(error);
    console.log(error.message);
    const errorText = "Error";

    errorGetCurrentLocation = true;

    cardLocationDaily();
    if (error.code === 1) {
      currentLocationName.innerText = "Location access was denied";
    } else if (error.code === 2) {
      currentLocationName.innerText = error.message;
    }
    currentSubLocation.innerText = errorText;
    currentTime.innerText = errorText;
    currentWeather.innerText = errorText;
    today.innerText = errorText;
  }
}

document
  .getElementById("btn-current-location")
  .addEventListener("click", () => {
    location.reload();
    getCurrentLocation();
  });

function cardLocationDaily() {
  weather.innerHTML = "";
  for (let i = 1; i < 7; i++) {
    const text = errorGetCurrentLocation ? "Error" : "Loading ..";

    const card = document.createElement("div");
    card.className =
      "backdrop-blur-sm w-full text-[8px] md:text-xs flex flex-col justify-between hover:bg-white/25 bg-white/30 p-3 md:p-4 h-[100%] relative text-white text-sm rounded";

    card.innerHTML = `
              <div class="flex gap-1 justify-between">
                <p>${text}</p>
                <p class="text-end">... °C - ... °C</p>
              </div>
              <div
                class="absolute mt-[-10px] w-full flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <img class="w-30 p-8" src="assets/tube-spinner.svg" />
                <p class="absolute bottom-0 capitalize text-[10px] md:text-xs px-4 text-center">${text}</p>
      
    
              </div>
  
              <div class="flex gap-4 mt-2 justify-between">
                <div class="flex gap-2 items-center">
                  <img class="w-5" src="assets/sunrise.svg" />
                  <p>...</p>
  
                </div>
                <div class="flex gap-2 items-center">
                  <img class="w-5" src="assets/sunset.svg" />
                  <p>...</p>
                </div>
              </div>`;
    weather.appendChild(card);
  }
}

window.onload = function () {
  getCurrentLocation();
  cardLocationDaily();
};
