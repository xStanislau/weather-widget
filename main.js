window.addEventListener('DOMContentLoaded', () => {
  getLocation();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  function getWeather(position) {
    const api = 'https://fcc-weather-api.glitch.me/api/current?';
    const latitude = 'lat=' + position.coords.latitude;
    const longtitude = '&lon=' + position.coords.longitude;
    const url = api + latitude + longtitude;

    createGetRequest(url)
      .then(weather => JSON.parse(weather))
      .then(showWeather);
  }

  function createGetRequest(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onload = () => {
        if (xhr.status == 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText + " " + xhr.status);
        }
      }
      xhr.onerror = () => {
        reject(new Error("Network error"));
      };
      xhr.send();
    });
  }

  function showWeather(weatherJson) {
    const location = document.querySelector('.location');
    const temp = document.querySelector('.temp');
    const weatherText = document.querySelector('.weather-text');
    const weatherIcon = document.querySelector('.weather-icon');
    const icon = document.createElement('IMG');

    icon.src = weatherJson.weather[0].icon;
    location.textContent = weatherJson.name + ', ' + weatherJson.sys.country;
    temp.textContent = weatherJson.main.temp + '\u2103';
    weatherText.textContent = weatherJson.weather[0].main;
    weatherJson.weather[0].icon;
    weatherIcon.appendChild(icon);
  }

});