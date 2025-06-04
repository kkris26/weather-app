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
  45: {
    weather: "Fog",
    day_logo: "/fog.svg",
    night_logo: "/fog-night.svg",
  },
  48: {
    weather: "Depositing rime fog",
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
    weather: "Dense drizzle",
    day_logo: "/heavy-drizzle.svg",
    night_logo: "/heavy-drizzle.svg",
  },
  56: {
    weather: "Light freezing drizzle",
    day_logo: "/light-drizzle.svg",
    night_logo: "/light-drizzle.svg",
  },
  57: {
    weather: "Dense freezing drizzle",
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
    weather: "Light freezing rain",
    day_logo: "/rain.svg",
    night_logo: "/rain.svg",
  },
  67: {
    weather: "Heavy freezing rain",
    day_logo: "/heavy-rain.svg",
    night_logo: "/heavy-rain.svg",
  },
  71: {
    weather: "Slight snowfall",
    day_logo: "/light-snow.svg",
    night_logo: "/light-snow-night.svg",
  },
  73: {
    weather: "Moderate snowfall",
    day_logo: "/light-snow.svg",
    night_logo: "/light-snow-night.svg",
  },
  75: {
    weather: "Heavy snowfall",
    day_logo: "/heavy-snow.svg",
    night_logo: "/heavy-snow.svg",
  },
  77: {
    weather: "Snow grains",
    day_logo: "/snow-grains.svg",
    night_logo: "/snow-grains.svg",
  },
  80: {
    weather: "Slight rain showers",
    day_logo: "/slight-rain-showers.svg",
    night_logo: "/slight-rain-showers-night.svg",
  },
  81: {
    weather: "Moderate rain showers",
    day_logo: "/rain-showers.svg",
    night_logo: "/rain-showers.svg",
  },
  82: {
    weather: "Violent rain showers",
    day_logo: "/heavy-rain-showers.svg",
    night_logo: "/heavy-rain-showers.svg",
  },
  85: {
    weather: "Slight snow showers",
    day_logo: "/snow.svg",
    night_logo: "/snow.svg",
  },
  86: {
    weather: "Heavy snow showers",
    day_logo: "/heavy-snow-showers.svg",
    night_logo: "/heavy-snow-showers.svg",
  },
  95: {
    weather: "Thunderstorm (slight or moderate)",
    day_logo: "/thunderstorm.svg",
    night_logo: "/thunderstorm.svg",
  },
  96: {
    weather: "Thunderstorm with slight hail",
    day_logo: "/heavy-hail.svg",
    night_logo: "/heavy-hail.svg",
  },
  99: {
    weather: "Thunderstorm with heavy hail",
    day_logo: "/heavy-hail.svg",
    night_logo: "/heavy-hail.svg",
  },
};

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
function formatDate(value) {
  const date = new Date(value);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
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

function secondToMinute(value) {
  const minute = value / 60;
  return minute;
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

const defaultData = "jakarta";
getLocation(defaultData);
document.getElementById("lokasiInput").value = defaultData;
async function getLocation(value) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${value}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const result = await data.results;
    console.log(result);

    const display = document.getElementById("display");
    display.innerHTML = "";

    for (let i = 0; i < result.length; i++) {
      const button = document.createElement("button");
      const name = result[i].name;
      const country = result[i].country;
      const countryCode = result[i].country_code.toLowerCase();
      const lat = result[i].latitude;
      const lon = result[i].longitude;
      const province = result[i].admin1;
      const region = result[i].admin2;
      button.className =
        "card bg-green-500 p-4 text-white rounded hover:bg-green-700";
      button.innerHTML = `
      <div class="flex gap-2">
      <img src="https://hatscripts.github.io/circle-flags/flags/${countryCode}.svg" width="48" />
            <div class="flex flex-col items-start justify-center w-100%">
            <h2 class ="font-bold">${name}, ${country}</h2>
            
          ${
            province || region
              ? `<div class="flex">
              <p class="text-sm text-left">${province || ""}${
                  province && region ? ", " : ""
                }${region || ""}</p>  
                 </div>`
              : ""
          }
            
          
            
            </div>
      </div>
        `;

      button.addEventListener("click", () => {
        closePopup();
        getWeather(lat, lon, name, country);
      });

      display.appendChild(button);
    }
  } catch (error) {
    display.innerHTML = `
      <p>Lokasi tidak ditemukan</p>
      `;
  }
}
const form = document.getElementById("locationForm");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const value = document.getElementById("lokasiInput").value.trim();
  if (value) {
    getLocation(value);
  }
});

async function getLocationName(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
  const proxyURL = `https://api.allorigins.win/get?url=${encodeURIComponent(
    url
  )}`;
  try {
    const response = await fetch(proxyURL);
    console.log(response);
    const result = await response.json();
    const data = JSON.parse(result.contents);
    const name = data.display_name;
    const country = data.address.country;
    getWeather(lat, lon, name, country);
  } catch (error) {
    console.log(error);
  }
}

async function getWeather(lat, lon, name, country) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,sunrise,sunset,temperature_2m_max,temperature_2m_min&current=weather_code,is_day,temperature_2m,wind_speed_10m,relative_humidity_2m&timezone=auto`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status : ${response.status}`);
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

    const container = document.getElementById("weather");
    const currentDisplay = document.getElementById("current");
    const nightBG = "bg-[url(assets/bg-night.jpg)]";
    const dayBG = "bg-[url(assets/bg.webp)]";
    currentDisplay.classList.add(currentData.is_day ? dayBG : nightBG);
    currentDisplay.classList.remove(currentData.is_day ? nightBG : dayBG);
    currentDisplay.innerHTML = `
        <h2>Area : ${name}</h2>
        <h2>Country : ${country}</h2>
        <h2>Refresh : Every ${secondToMinute(currentData.interval)} Minute</h2>
        <h2>Date : ${formatDateTime(currentData.time)}</h2>
        <h1>Condition : ${isDay ? "Day" : "Night"}</h1>
         <div class = "flex items-center">
         <h2>Humidity : ${humidity}</h2>
     <img class="w-15 m-[-15px]" src="assets/humidity.svg">
    
    </div>
        <h2>Cuaca : ${weatherData.weather}</h2>
          <img class="w-30" src="assets/${
            isDay ? weatherData.day_logo : weatherData.night_logo
          }">
        <h2>Temperature : ${currentData.temperature_2m} ${
      units.temperature_2m
    }</h2>
    <div class = "flex gap-2 items-center">
     <img class="w-10" src="assets/wind.svg">
     <p>${currentData.wind_speed_10m} ${units.wind_speed_10m}</p>
    </div>
        `;
    container.innerHTML = "";
    for (let i = 1; i < daily.time.length; i++) {
      const date = daily.time[i];
      const code = daily.weather_code[i];
      const weatherDataDaily = weatherCodes[code];
      const minTemp = daily.temperature_2m_min[i];
      const maxTemp = daily.temperature_2m_max[i];
      const sunrise = daily.sunrise[i];
      const sunset = daily.sunset[i];

      const card = document.createElement("div");
      card.className = "bg-blue-400  p-4 text-white font-bold rounded";

      card.innerHTML = `
          <h1>Date :  ${formatDate(date)}</h1>
          <h2>Cuaca : ${weatherDataDaily.weather}</h2>
          <h2>Temperature : ${minTemp} ${units.temperature_2m} - ${maxTemp} ${
        units.temperature_2m
      }</h2>
       <img class="w-30" src="assets/${
         isDay ? weatherDataDaily.day_logo : weatherDataDaily.night_logo
       }">
       <div class="flex gap-4">
       <div class = "flex gap-2 items-center">
       <img class="w-10" src="assets/sunrise.svg">
       <h2>${formatTime(sunrise)}</h2>
       </div>
       <div class = "flex gap-2 items-center">
       <img class="w-10" src="assets/sunset.svg">
       
       <h2>${formatTime(sunset)}</h2>
       </div>
       </div>
      `;
      container.appendChild(card);
    }
  } catch (error) {
    console.error(error.message);
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
    getLocationName(lat, lon);
  }
  function errorMessage(error) {
    document.getElementById("current").innerHTML = `<p>${error.message}</p>`;
  }
}

getCurrentLocation();

document
  .getElementById("btn-current-location")
  .addEventListener("click", () => {
    getCurrentLocation();
  });
