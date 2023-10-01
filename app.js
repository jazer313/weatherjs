document.addEventListener("DOMContentLoaded", function () {
  const zipCodeInput = document.getElementById("zipCodeInput");
  const getWeatherBtn = document.getElementById("getWeatherBtn");
  const weatherInfo = document.getElementById("weatherInfo");
  const moreInfo = document.getElementById("moreInfo");

  getWeatherBtn.addEventListener("click", function () {
    const zipCode = zipCodeInput.value.trim();
    if (zipCode) {
      fetchWeather(zipCode);
    } else {
      weatherInfo.innerHTML = "Please enter a valid Zip Code.";
    }
  });

  function fetchWeather(zipCode) {
    // Replace 'YOUR_API_KEY' with your actual API key from a weather service provider.
    const apiKey = "";
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${zipCode}`;

    const currentWeather = document.createElement("div");
    currentWeather.classList.add("current-weather");

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const conditionText = data.current.condition.text;
        const currentTempC = data.current.temp_c;
        const currentTempF = data.current.temp_f;
        const humidity = data.current.humidity;
        const cityName = data.location.name;
        const feelsLike = data.current.feelslike_f;
        const uv = data.current.uv;
        const visMiles = data.current.vis_miles;

        currentWeather.innerHTML = `
    <h2>Current Weather</h2>
    <div class="condition">${conditionText}</div>
    <div class="temp">
        <span class="temp-c">${currentTempC}°C</span>
        <span class="temp-f">${currentTempF}°F</span>
    </div>
    <div class="feelslike">Feels like: ${feelsLike}°F</div>
    <div class="uv">UV Index: ${uv}</div>
    <div class="humidity">Humidity: ${humidity}%</div>
    <div class="visibility">Visibility: ${visMiles} Miles</div>
`;

        weatherInfo.innerHTML = `${cityName}: ${conditionText}, ${currentTempF}°F`;
        moreInfo.appendChild(currentWeather);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        weatherInfo.innerHTML =
          "An error occurred while fetching weather data.";
      });

    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${zipCode}&days=3`;

    fetch(forecastUrl)
      .then((response) => response.json())
      .then((data) => {
        const { forecast } = data;
        const forecastDays = forecast.forecastday;
        const forecastInfo = document.getElementById("forecastInfo");
        forecastInfo.innerHTML = "<h2>3-Day Forecast</h2>";
        const forecastItems = document.createElement("div");
        forecastItems.classList.add("forecast-items");

        forecastDays.forEach((day) => {
          const date = day.date;
          const condition = day.day.condition.text;
          const maxTemp = day.day.maxtemp_f;
          const minTemp = day.day.mintemp_f;

          const forecastItem = document.createElement("div");
          forecastItem.classList.add("forecast-item");
          forecastItem.innerHTML = `
                <div class="date">${date}</div>
                <div class="condition">${condition}</div>
                <div class="temp">Max Temp: ${maxTemp}°F</div>
                <div class="temp">Min Temp: ${minTemp}°F</div>
            `;

          forecastItems.appendChild(forecastItem);
        });

        forecastInfo.appendChild(forecastItems);
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
        forecastInfo.innerHTML =
          "An error occurred while fetching forecast data.";
      });
  }
});
