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
    fillColor: getColorTotal(feature.properties.Average__1),
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
var totalEmissionLayer;
var emissionRateLayer;

// Load the subdistrict boundaries
fetch("data/raw/bkk-subdistrict.geojson")
  .then((response) => response.json())
  .then((data) => {
    subdistrictLayer = L.geoJSON(data, {
      style: styleFeature,
      onEachFeature: onEachFeature,
    }).addTo(map); // Add to map as this is a base layer

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

    map.addControl(new customControl());
  })

  .catch((error) => console.error("Error loading GeoJSON data:", error));

