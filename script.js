const weatherCodes = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snowfall",
  73: "Moderate snowfall",
  75: "Heavy snowfall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm (slight or moderate)",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
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
            <div class="flex flex-col items-start w-100%">
            <h2 class ="font-bold">${name}, ${country}</h2>
            <div class="flex">
          ${
            province || region
              ? `<p class="text-sm text-left">${province || ""}${
                  province && region ? ", " : ""
                }${region || ""}</p>`
              : ""
          }
            
            </div>
            
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
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,sunrise,sunset,temperature_2m_max,temperature_2m_min&current=weather_code,is_day,temperature_2m,wind_speed_10m&timezone=auto`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status : ${response.status}`);
    }
    const data = await response.json();
    const daily = data.daily;
    const currentData = data.current;
    const units = data.current_units;
    console.log(currentData);
    console.log(daily);

    const container = document.getElementById("weather");
    const currentDisplay = document.getElementById("current");
    currentDisplay.classList.add(
      currentData.is_day ? "bg-blue-300" : "bg-black"
    );
    currentDisplay.classList.remove(
      currentData.is_day ? "bg-black" : "bg-blue-300"
    );
    currentDisplay.innerHTML = `
        <h2>Area : ${name}</h2>
        <h2>Country : ${country}</h2>
        <h2>Refresh : Every ${secondToMinute(currentData.interval)} Minute</h2>
        <h2>Date : ${formatDateTime(currentData.time)}</h2>
        <h1>Condition : ${currentData.is_day ? "Day" : "Night"}</h1>
        <h2>Cuaca : ${weatherCodes[currentData.weather_code]}</h2>
        <h2>Temperature : ${currentData.temperature_2m} ${
      units.temperature_2m
    }</h2>
        <h2>Wind Speeds : ${currentData.wind_speed_10m} ${
      units.wind_speed_10m
    }</h2>
        `;
    container.innerHTML = "";
    for (let i = 1; i < daily.time.length; i++) {
      const date = daily.time[i];
      const code = daily.weather_code[i];
      const minTemp = daily.temperature_2m_min[i];
      const maxTemp = daily.temperature_2m_max[i];
      const sunrise = daily.sunrise[i];
      const sunset = daily.sunset[i];

      const card = document.createElement("div");
      card.className = "bg-blue-400 w-100 p-4 text-white font-bold rounded";

      card.innerHTML = `
          <h1>Date :  ${formatDate(date)}</h1>
          <h2>Cuaca : ${weatherCodes[code]}</h2>
          <h2>Temperature : ${minTemp} ${units.temperature_2m} - ${maxTemp} ${
        units.temperature_2m
      }</h2>
          <h2>Sunrise : ${formatDateTime(sunrise)}</h2>
          <h2>Sunset : ${formatDateTime(sunset)}</h2>
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
