// ===== Select DOM Elements =====
const dateInput = document.querySelector(".date-picker input");
const weatherDisplay = document.querySelector(".weather-display");

// ===== OpenWeatherMap API Setup =====
const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your API key
const CITY = "Delhi,IN"; // Change city as needed

// ===== Helper Function to Fetch Weather =====
async function fetchWeather(date) {
  try {
    //api
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    displayWeather(data, date);
  } catch (error) {
    weatherDisplay.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}

// ===== Display Weather in UI =====
function displayWeather(data, date) {
  weatherDisplay.innerHTML = `
    <h3>Weather for ${date}</h3>
    <p><strong>Location:</strong> ${data.name}, ${data.sys.country}</p>
    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
}

// ===== Event Listener =====
dateInput.addEventListener("change", (e) => {
  const selectedDate = e.target.value;
  fetchWeather(selectedDate);
});

// ===== Optional: Load Today’s Weather on Page Load =====
window.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  dateInput.value = today;
  fetchWeather(today);
});

// ===== Hamburger Toggle =====

const menuBtn = document.getElementById("menu-btn");
    const menu = document.getElementById("mobile-menu");

    menuBtn.addEventListener("click", () => {
      menu.classList.toggle("active");
      menuBtn.classList.toggle("open");
    });