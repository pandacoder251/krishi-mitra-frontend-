// ===== DOM Elements =====
const floodEl = document.getElementById("flood");
const droughtEl = document.getElementById("drought");
const pestEl = document.getElementById("pest");
const cropEl = document.getElementById("crop");
const alertsLog = document.querySelector(".alerts-log");

// ===== Notification Permission =====
if ("Notification" in window) {
  Notification.requestPermission().then(permission => {
    if (permission !== "granted") {
      console.warn("Notifications denied");
    }
  });
}

// ===== Function to Send Notification & Log =====
function sendAlert(title, message, type = "info") {
  // Browser Notification
  if (Notification.permission === "granted") {
    new Notification(title, {
      body: message,
      icon: type === "pest" ? "icons/pest.png" :
            type === "crop" ? "icons/crop.png" :
            type === "flood" ? "icons/flood.png" :
            "icons/alert.png"
    });
  }

  // Log in UI
  const li = document.createElement("li");
  li.textContent = `[${new Date().toLocaleTimeString()}] ${title}: ${message}`;
  alertsLog.prepend(li);
}

// ===== Simulate Dynamic Alerts =====
// In real scenario, these values come from API
function updateAlerts() {
  const floodValue = Math.floor(Math.random() * 50);     // example °C or mm
  const droughtValue = Math.floor(Math.random() * 100);  // %
  const pestValue = Math.floor(Math.random() * 120);     // km/h or count
  const cropValue = Math.random() > 0.7 ? "Detected" : "Normal";

  floodEl.textContent = `Flood: ${floodValue} mm`;
  droughtEl.textContent = `Drought: ${droughtValue} %`;
  pestEl.textContent = `Pest: ${pestValue} locusts/km²`;
  cropEl.textContent = `Crop Viral: ${cropValue}`;

  // Trigger notifications if thresholds exceeded
  if (floodValue > 30) sendAlert("Flood Alert!", `Flood level ${floodValue} mm exceeds safe limit.`, "flood");
  if (droughtValue > 70) sendAlert("Drought Alert!", `Drought level ${droughtValue}% exceeds threshold.`, "flood");
  if (pestValue > 50) sendAlert("Pest Alert!", `${pestValue} locusts detected in your area!`, "pest");
  if (cropValue === "Detected") sendAlert("Crop Viral Alert!", "Crop viral infection detected!", "crop");
}

// ===== Update alerts every 10 seconds =====
updateAlerts(); // initial load
setInterval(updateAlerts, 10000);
