document.addEventListener("DOMContentLoaded", function () {
  const zipCodeInput = document.getElementById("zipCodeInput");
  const getWeatherBtn = document.getElementById("getWeatherBtn");
  const weatherInfo = document.getElementById("weatherInfo");

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

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const { location, current } = data;
        const weatherDescription = current.condition.text;
        const temperature = current.temp_f;
        const cityName = location.name;
        const feelsLike = current.feelslike_f;
        const uv = current.uv;
        const visMiles = current.vis_miles;

        weatherInfo.innerHTML = `${cityName}: ${weatherDescription}, ${temperature}°F`;
        moreInfo.innerHTML = `Feels like: ${feelsLike}°F | UV Index:${uv} | Visibility ${visMiles} Miles`;
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

        // Display the current weather
        // ...

        // Display the 3-day forecast
        const forecastInfo = document.getElementById("forecastInfo");
        forecastInfo.innerHTML = "<h2>3-Day Forecast</h2>";

        forecastDays.forEach((day) => {
          const date = day.date;
          const condition = day.day.condition.text;
          const maxTemp = day.day.maxtemp_f;
          const minTemp = day.day.mintemp_f;

          const forecastItem = document.createElement("div");
          forecastItem.classList.add("forecast-item");
          forecastItem.innerHTML = `
                            <div>Date: ${date}</div>
                            <div>Condition: ${condition}</div>
                            <div>Max Temp: ${maxTemp}°F</div>
                            <div>Min Temp: ${minTemp}°F</div>
                        `;

          forecastInfo.appendChild(forecastItem);
        });
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
        forecastInfo.innerHTML =
          "An error occurred while fetching forecast data.";
      });
  }
});
