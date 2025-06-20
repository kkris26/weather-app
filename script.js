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
const displayLocation = document.getElementById("display-country");
const weatherDailyDisplay = document.getElementById("weather-daily");
const currentDisplay = document.getElementById("current");
const currentLocationName = document.getElementById("location-name");
const currentSubLocation = document.getElementById("sub-location-name");
const currentTemperature = document.querySelectorAll(".current-temperature");
const currentTemperatureUnit = document.querySelectorAll(
  ".current-temperature-unit"
);
const currentImgWeather = document.querySelectorAll(".img-current-weather");
const currentWeather = document.querySelectorAll(".current-weather");
const today = document.querySelectorAll(".today");
const currentHumidity = document.getElementById("current-humidity");
const currentWindSpeed = document.getElementById("current-wind-speed");
const currentTime = document.getElementById("current-time");
const weatherLoading = document.getElementById("weather-loading");
const weather = document.getElementById("weather");
const dotsText = ".....";
let bgImage = "";
// // cek mobile
// const isMobile = window.innerWidth <= 448;

// truncating
function truncatingNumber(value) {
  return Math.trunc(value);
}

// function date and time format
function formatDateTime(value, info) {
  const dateTime = new Date(value);
  const options = {
    weekday: info,
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

function formatDay(value, info) {
  const date = new Date(value);
  const options = {
    weekday: info,
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
// function date and time format

//  function open and close popup
const popUpSearch = document.getElementById("pop-up-search");
const searchWrapper = document.getElementById("search-wrapper");
const btnSearch = document.getElementById("btn-search");
const btnCloseSearch = document.getElementById("close-search");
function openPopupSearch() {
  popUpSearch.classList.remove("hidden");
}
function closePopupSearch() {
  popUpSearch.classList.add("hidden");
}

document.addEventListener("click", (e) => {
  if (
    (!searchWrapper.contains(e.target) && !btnSearch.contains(e.target)) ||
    btnCloseSearch.contains(e.target)
  ) {
    closePopupSearch();
  }
});

btnSearch.addEventListener("click", () => {
  openPopupSearch();
});
// function open and close popup

// get location by
async function getLocation(value) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${value}`;

  // loading data location
  displayLocation.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const locationBox = document.createElement("div");
    locationBox.className =
      "card border-1 border-white/30 bg-gray-300/40 cursor-pointer p-2 hover:bg-gray-200/40 rounded-lg";
    locationBox.innerHTML = `
          <div class="flex gap-2">
              <img src="./assets/no-picture.svg" width="48" height="48" class="border rounded-full border-white/30">
          <div class="flex flex-col items-start justify-center w-100%">
              <h2 class="text-white text-sm" >Loading..</h2>  
          <div class="flex">
                <p class="text-[10px] md:text-[-14] text-left text-white/70">Loading..</p>  
          </div>`;
    displayLocation.appendChild(locationBox);
  }
  // loading data location
  try {
    const response = await fetch(url);
    const data = await response.json();
    const result = await data.results;
    if (!result) {
      throw "no-result";
    }
    // kosongkan displayLocation agar tidak numpuk dengan location lain
    displayLocation.innerHTML = "";
    // perulangan untuk menampilkan list location
    for (let i = 0; i < result.length; i++) {
      const locationBox = document.createElement("div");
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
      locationBox.className =
        "card border-1 border-white/30 bg-gray-300/40 cursor-pointer p-2 hover:bg-gray-200/40 rounded-lg";
      locationBox.innerHTML = `
                    <div class="flex gap-2">
              <img src="https://hatscripts.github.io/circle-flags/flags/${countryCode}.svg" width="48" height="48" class="border bg-gray-200 rounded-full border-white/30">
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

      locationBox.addEventListener("click", () => {
        closePopupSearch();
        getWeather(lat, lon, location, subLocationJoin);
      });

      displayLocation.appendChild(locationBox);
    }
  } catch (error) {
    // dapat error dari throw
    if (error === "no-result") {
      displayLocation.innerHTML = `
      <p class="text-white md:text-sm text-xs">"${value}" not found</p>
      `;
    } else {
      const seacrhCityInput = document.getElementById("lokasiInput").value;
      if (!seacrhCityInput.length == 0) {
        displayLocation.innerHTML = `
        <p class="text-white md:text-sm text-xs">Cannot connect to the server.</p>
        `;
      }
      errorPopup("Cannot connect to the server. Please try again later.");
      closePopupSearch();
    }
  }
}
// search location by form
const form = document.getElementById("locationForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = document.getElementById("lokasiInput").value.trim();
  if (value) {
    getLocation(value);
  }
});
// search location by form
// Mencari cuaca di lokasi saat ini dengan lat dan lon dari device
async function getWeatherCurrentLocation(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const location = data.display_name;
    const country = data.address.country;
    getWeather(lat, lon, location, country);
  } catch (error) {
    // melanjutkan mencari cuaca tanpa data lokasi saat ini
    getWeather(lat, lon);
  }
}

// error popup
const errorContainer = document.getElementById("error-popup");
const errorWrapper = document.getElementById("error-wrapper");
const errorText = document.getElementById("error-text");
const btnCloseErrorPopup = document.getElementById("close-error-popup");

function errorPopup(text) {
  errorContainer.classList.remove("hidden");
  errorText.innerText = text;
}

function closeErrorPopup() {
  errorContainer.classList.add("hidden");
}

document.addEventListener("click", (e) => {
  if (
    !errorWrapper.contains(e.target) ||
    btnCloseErrorPopup.contains(e.target)
  ) {
    closeErrorPopup();
  }
});
// error popup

// mencari data dari api open meteo
async function getWeather(lat, lon, location, subLocation) {
  errorGetCurrentLocation = false;
  loadContent();
  loadingCardLocationDaily();
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,sunrise,sunset,temperature_2m_max,temperature_2m_min&current=weather_code,is_day,temperature_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature&timezone=auto`;
  try {
    const response = await fetch(url);
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

    // insert to html
    currentLocationName.innerText = location
      ? location
      : "Failed get location name";
    currentSubLocation.innerText = subLocation
      ? subLocation
      : "Failed get location name";
    currentTemperature.forEach((item) => {
      item.innerText = truncatingNumber(currentData.temperature_2m);
    });
    currentTemperatureUnit.forEach((item) => {
      item.innerText = units.temperature_2m;
    });

    currentImgWeather.forEach((item) => {
      item.src = `assets/${
        isDay ? weatherData.day_logo : weatherData.night_logo
      }`;
      item.classList.replace("p-10", "p-2");
    });
    currentWeather.forEach((item) => (item.innerText = weatherData.weather));
    currentHumidity.innerText = `${humidity} ${units.relative_humidity_2m}`;
    today.forEach((item) => (item.innerText = "Today"));
    currentWindSpeed.innerText = `${currentData.wind_speed_10m} ${units.wind_speed_10m}`;
    currentTime.innerHTML = `<p class="md:hidden">${formatDateTime(
      currentData.time,
      "short"
    )}</p>
    <p class="hidden md:block">${formatDateTime(currentData.time, "long")}</p>
    `;

    // insert to html
    // ganti bg sesuai situasi lokasi
    const nightBG = "bg-[url(assets/bg-night.webp)]";
    const dayBG = "bg-[url(assets/bg-day.webp)]";
    const removeCurrentBg = currentData.is_day ? nightBG : dayBG;
    const addCurrentBg = currentData.is_day ? dayBG : nightBG;
    bgImage = addCurrentBg;
    currentDisplay.classList.remove(removeCurrentBg);
    currentDisplay.classList.add(addCurrentBg);
    // ganti bg sesuai situasi lokasi

    weatherDailyDisplay.innerHTML = "";
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
        "backdrop-blur-sm  hover:bg-white/15 bg-white/20 w-full text-[11px] md:text-xs flex flex-col justify-between  p-3 md:p-4 h-[100%] relative text-white text-sm rounded";

      card.innerHTML = `
              <div class="flex gap-1 justify-between">
                <p class ="md:hidden">${formatDay(date, "short")}</p>
                <p class ="hidden md:block">${formatDay(date, "long")}</p>
                <p class="text-end">${truncatingNumber(minTemp)} ${
        units.temperature_2m
      }  - ${truncatingNumber(maxTemp)} ${units.temperature_2m}</p>
              </div>
              <div
                class="absolute mt-[-10px] w-full flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <img class="w-30" src="assets/${
                  isDay
                    ? weatherDataDaily.day_logo
                    : weatherDataDaily.night_logo
                }" />
                <p class="absolute bottom-0 capitalize  px-4 text-center">${
                  weatherDataDaily.weather
                }</p>
      
    
              </div>

              <div class="flex gap-2 mt-2 justify-between">
                <div class="flex gap-1 items-center">
                  <img class="w-5" src="assets/sunrise.svg" />
                  <p>${formatTime(sunrise)}</p>

                </div>
                <div class="flex gap-1 items-center">
                  <img class="w-5" src="assets/sunset.svg" />
                  <p>${formatTime(sunset)}</p>
                </div>
              </div>`;
      weatherDailyDisplay.appendChild(card);
    }
  } catch (error) {
    errorGetCurrentLocation = true;
    loadContent();
    loadingCardLocationDaily();
    if (error == "bad request") {
      const text = `Oops! We couldn’t find any data for “${location}”`;
      errorPopup(text);
    } else {
      const text = "Cannot connect to the server. Please try again later.";
      errorPopup(text);
    }
  }
}

// mencari lokasi lan dan lon saat ini
function getCurrentLocation() {
  if (navigator.onLine) {
    if (navigator.geolocation) {
      errorGetCurrentLocation = false;
      navigator.geolocation.getCurrentPosition(showPosition, errorMessage);
    } else {
      const text = "Geolocation is not supported by this browser.";
      errorPopup(text);
    }
  } else {
    errorGetCurrentLocation = true;
    loadContent();
    const text = "Cannot connect to the server. Please try again later.";
    if (bgImage) {
      currentDisplay.classList.remove(bgImage);
    }
    errorPopup(text);
  }

  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    errorGetCurrentLocation = false;
    getWeatherCurrentLocation(lat, lon);
  }
  function errorMessage(error) {
    errorGetCurrentLocation = true;

    loadContent();
    loadingCardLocationDaily();
    if (error.code === 1) {
      currentLocationName.innerText = "Location access was denied";
      const text =
        "Location access was denied. Please enable location permissions!";
      errorPopup(text);
    } else if (error.code === 2) {
      currentLocationName.innerText = error.message;
      errorPopup(error.message);
    }

    if (bgImage) {
      currentDisplay.classList.remove(bgImage);
    }
  }
}

// event untuk mendapatkan data lokasi saat ini
document
  .getElementById("btn-current-location")
  .addEventListener("click", () => {
    getCurrentLocation();
  });
// event untuk mendapatkan data lokasi saat ini

// menampilkan animasi loading sebelum data tersedia
function loadingCardLocationDaily() {
  // menyesuakan text ketika terjadi error maka tampilkan informasi error
  const loadTextContent = errorGetCurrentLocation ? "Error" : "Loading ...";
  weatherDailyDisplay.innerHTML = "";
  for (let i = 1; i < 7; i++) {
    const card = document.createElement("div");
    card.className =
      "backdrop-blur-sm w-full text-[11px] md:text-xs flex flex-col justify-between hover:bg-white/15 bg-white/20 p-3 md:p-4 h-[100%] relative text-white text-sm rounded";

    card.innerHTML = `
              <div class="flex gap-1 justify-between">
                <p>${loadTextContent}</p>
                <p class="text-end">${dotsText} - ${dotsText}</p>
              </div>
              <div
                class="absolute mt-[-10px] w-full flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <img class="w-30 p-8" src="assets/tube-spinner.svg" />
                <p class="absolute bottom-0 capitalize text-[11px] md:text-xs px-4 text-center">${loadTextContent}</p>
      
    
              </div>
  
              <div class="flex gap-4 mt-2 justify-between">
                <div class="flex gap-2 items-center">
                  <img class="w-5" src="assets/sunrise.svg" />
                  <p>${dotsText}</p>
  
                </div>
                <div class="flex gap-2 items-center">
                  <img class="w-5" src="assets/sunset.svg" />
                  <p>${dotsText}</p>
                </div>
              </div>`;
    weatherDailyDisplay.appendChild(card);
  }
}
// menampilkan animasi loading sebelum mendapatkan data
function loadContent() {
  // menyesuakan text ketika terjadi error maka tampilkan informasi error
  const loadTextContent = errorGetCurrentLocation ? "Error" : "Loading ...";
  currentLocationName.innerText = errorGetCurrentLocation
    ? "Error"
    : "Geting Location Data ....";
  currentSubLocation.innerText = loadTextContent;
  currentTime.innerText = loadTextContent;
  currentHumidity.innerText = dotsText;
  currentWindSpeed.innerText = dotsText;
  currentTemperature.forEach((item) => {
    item.innerText = `${dotsText}`;
  });
  currentTemperatureUnit.forEach((item) => {
    item.innerText = "..";
  });
  currentWeather.forEach((item) => (item.innerText = loadTextContent));
  today.forEach((item) => (item.innerText = loadTextContent));
  currentImgWeather.forEach((item) => {
    item.classList.replace("p-2", "p-10");
    item.src = "assets/tube-spinner.svg";
  });
}

// memulai dengan mencari lokasi saat ini dan menampilkan loading pada daily weather
window.onload = function () {
  loadingCardLocationDaily();
  getCurrentLocation();
};
