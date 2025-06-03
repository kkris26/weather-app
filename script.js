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

  const formatter = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formated = formatter.format(dateTime);
  return formated;
}
function formatDate(value) {
  const date = new Date(value);

  const formatter = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formated = formatter.format(date);
  return formated;
}

function secondToMinute(value) {
  const minute = value / 60;
  return minute;
}
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
      const card = document.createElement("div");
      const button = document.createElement("button");
      const name = result[i].name;
      const country = result[i].country;
      const countryCode = result[i].country_code.toLowerCase();
      const latitude = result[i].latitude;
      const longitude = result[i].longitude;
      const province = result[i].admin1;
      const region = result[i].admin2;
      button.textContent = "Lihat Cuaca";
      button.className =
        "mt-2 bg-white text-green-600 px-3 py-1 rounded hover:bg-blue-600";
      card.className =
        "card bg-green-500 p-4 text-white rounded hover:bg-green-700";
      card.innerHTML = `
         <h2>Name: ${name}</h2>
                  <div class="flex items-center gap-2">
            <img
              src="https://flagcdn.com/48x36/${countryCode}.png"
              class=" w-10"
              alt=""
              srcset=""
            />
            <h2>${country}</h2>
          </div>
        <h2>Latitude: ${latitude}</h2>
        <h2>Longitude: ${longitude}</h2>
       
        ${province ? `<h2>Province: ${province}</h2>` : ""}
        ${region ? `<h2>Region: ${region}</h2>` : ""}
        
        `;

      button.addEventListener("click", () => {
        getWeather(latitude, longitude, name, country);
      });

      card.appendChild(button);
      display.appendChild(card);
    }
  } catch (error) {}
}
const form = document.getElementById("locationForm");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const value = document.getElementById("lokasiInput").value.trim();
  if (value) {
    getLocation(value);
  }
});

async function getWeather(lat, long, name, country) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,sunrise,sunset,temperature_2m_max,temperature_2m_min&current=weather_code,is_day,temperature_2m,wind_speed_10m&timezone=auto`;
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
    console.log(data);

    const container = document.getElementById("weather");
    const currentDisplay = document.getElementById("current");
    currentDisplay.innerHTML = `
        <h2>Area : ${name}</h2>
        <h2>Country : ${country}</h2>
        <h2>Refresh : ${secondToMinute(currentData.interval)} Minute</h2>
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
