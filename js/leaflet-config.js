// initialize the map
window.map = L.map("map", {
  // This will prevent users from dragging outside the max bounds
  maxBoundsViscosity: 1.0,
});

// Add a base tile layer
window.baseTileLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(window.map);
