// initialize the map
window.map = L.map("map").setView([13.7563, 100.5018], 10); // Centered on Bangkok

// Add a base tile layer
window.baseTileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(window.map);
