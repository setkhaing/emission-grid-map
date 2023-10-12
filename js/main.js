// Define an object to hold your overlay layers
var overlayLayers = {};

// Define the style for the subdistrict boundaries
function styleFeature(feature) {
  return {
    fillColor: "#FFFFFF", // White fill color
    fillOpacity: 0, // 50% opacity
    color: "blue", // Blue stroke color
    weight: 0.5, // This is in pixels;
    dashArray: "none", // Solid line
  };
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: function (e) {
      var layer = e.target;
      layer.bindPopup("Subdistrict: " + feature.properties.ADM3_EN).openPopup();
    },
    mouseout: function (e) {
      var layer = e.target;
      layer.closePopup();
    },
  });
}

// For all

function filterFeatures(feature) {
  return feature.properties.Average__1 !== null;
}

// Average total emission

function getColorTotal(value) {
  if (value === null) return "#CCCCCC"; // Gray color for null values
  if (value >= 0.001 && value <= 0.054182) return "#2b83ba";
  if (value > 0.054182 && value <= 0.074475) return "#b2df8a";
  if (value > 0.074475 && value <= 0.103276) return "#fee9cd";
  if (value > 0.103276 && value <= 0.324125) return "#d75f61";
  return "#FFFFFF"; // Default color if none of the conditions are met
}

function totalEmissionStyle(feature) {
  return {
    fillColor: getColorTotal(feature.properties.emission),
    fillOpacity: 0.9,
    color: "black",
    weight: 1,
  };
}

// Average emission rate
function getColorRate(value) {
  if (value === null) return "#CCCCCC"; // Gray color for null values
  if (value >= 0.12057 && value <= 0.150635) return "#2b83ba";
  if (value > 0.150635 && value <= 0.165354) return "#b2df8a";
  if (value > 0.165354 && value <= 0.180441) return "#fee9cd";
  if (value > 0.180441 && value <= 0.22702) return "#d75f61";
  return "#FFFFFF"; // Default color if none of the conditions are met
}

function EmissionRateStyle(feature) {
  return {
    fillColor: getColorRate(feature.properties.Average__1),
    fillOpacity: 0.9,
    color: "black",
    weight: 1,
  };
}
// ... [Your styles and functions]

var subdistrictLayer;
window.totalEmissionLayer = null;
window.emissionRateLayer = null;
window.totalEmissionMorningLayer = null;
window.totalEmissionEveningLayer = null;
window.totalEmissionAfternoonLayer = null;
// ... [Your existing code]

var subdistrictLayer;
var totalEmissionLayer;
var emissionRateLayer;
var totalEmissionMorningLayer;
var totalEmissionEveningLayer;
var totalEmissionAfternoonLayer;

// Load the subdistrict boundaries
fetch("data/raw/bkk-subdistrict.geojson")
  .then((response) => response.json())
  .then((data) => {
    subdistrictLayer = L.geoJSON(data, {
      style: styleFeature,
      onEachFeature: onEachFeature,
    }).addTo(map); // Add to map as this is a base layer

    // Adjust the map view to fit the bounds of the subdistrictLayer
    map.fitBounds(subdistrictLayer.getBounds());

    // Set the minimum zoom level to the current zoom level
    map.setMinZoom(map.getZoom());

    // Set max bounds to the current bounds to prevent panning outside the initial view
    map.setMaxBounds(map.getBounds());

    return fetch("data/processed/average-total-emission.geojson");
  })
  .then((response) => response.json())
  .then((data) => {
    totalEmissionLayer = L.geoJSON(data, {
      style: totalEmissionStyle,
      filter: filterFeatures,
    });

    return fetch("data/processed/average-emission-rate.geojson");
  })
  .then((response) => response.json())
  .then((data) => {
    emissionRateLayer = L.geoJSON(data, {
      style: EmissionRateStyle,
      filter: filterFeatures,
    });

    return fetch("data/processed/average-total-emission-morning.geojson");
  })
  .then((response) => response.json())
  .then((data) => {
    totalEmissionMorningLayer = L.geoJSON(data, {
      style: totalEmissionStyle,
      filter: filterFeatures,
    });

    return fetch("data/processed/average-total-emission-evening.geojson");
  })
  .then((response) => response.json())
  .then((data) => {
    totalEmissionEveningLayer = L.geoJSON(data, {
      style: totalEmissionStyle,
      filter: filterFeatures,
    });

    return fetch("data/processed/average-total-emission-afternoon.geojson");
  })
  .then((response) => response.json())
  .then((data) => {
    totalEmissionAfternoonLayer = L.geoJSON(data, {
      style: totalEmissionStyle,
      filter: filterFeatures,
    });

    map.addControl(new customControl());

    // Add the opacity control to the map
    map.addControl(new layerOpacityControl());
  })
  .catch((error) => console.error("Error loading GeoJSON data:", error));
