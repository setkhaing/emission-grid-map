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
      layer
        .bindPopup("Subdistrict: " + feature.properties.subdistrict_name)
        .openPopup();
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

// Average emission per grid

function getColorTotal(value) {
  if (value === null) return "#CCCCCC"; // Gray color for null values
  if (value >= 0.001333 && value <= 0.079878) return "#2b83ba";
  if (value > 0.079878 && value <= 0.104576) return "#b2df8a";
  if (value > 0.104576 && value <= 0.136991) return "#fee9cd";
  if (value > 0.136991 && value <= 0.726017) return "#d75f61";
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
  if (value >= 0.12057 && value <= 0.152443) return "#2b83ba";
  if (value > 0.152443 && value <= 0.164997) return "#b2df8a";
  if (value > 0.164997 && value <= 0.177230) return "#fee9cd";
  if (value > 0.177230 && value <= 0.22702) return "#d75f61";
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

// Average emission rate - morning
function getColorRateMorning(value) {
  if (value === null) return "#CCCCCC"; // Gray color for null values
  if (value >= 0.12057 && value <= 0.152443) return "#2b83ba";
  if (value > 0.152443 && value <= 0.164997) return "#b2df8a";
  if (value > 0.164997 && value <= 0.177230) return "#fee9cd";
  if (value > 0.177230 && value <= 0.22702) return "#d75f61";
  return "#FFFFFF"; // Default color if none of the conditions are met
}

function EmissionRateMorningStyle(feature) {
  return {
    fillColor: getColorRateMorning(feature.properties.Average__1),
    fillOpacity: 0.9,
    color: "black",
    weight: 1,
  };
}
// Average emission rate - afternoon
function getColorRateAfternoon(value) {
  if (value === null) return "#CCCCCC"; // Gray color for null values
  if (value >= 0.12057 && value <= 0.152443) return "#2b83ba";
  if (value > 0.152443 && value <= 0.164997) return "#b2df8a";
  if (value > 0.164997 && value <= 0.177230) return "#fee9cd";
  if (value > 0.177230 && value <= 0.22702) return "#d75f61";
  return "#FFFFFF"; // Default color if none of the conditions are met
}

function EmissionRateAfternoonStyle(feature) {
  return {
    fillColor: getColorRateAfternoon(feature.properties.Average__1),
    fillOpacity: 0.9,
    color: "black",
    weight: 1,
  };
}
// Average emission rate -evening
function getColorRateEvening(value) {
  if (value === null) return "#CCCCCC"; // Gray color for null values
  if (value >= 0.12057 && value <= 0.152443) return "#2b83ba";
  if (value > 0.152443 && value <= 0.164997) return "#b2df8a";
  if (value > 0.164997 && value <= 0.177230) return "#fee9cd";
  if (value > 0.177230 && value <= 0.22702) return "#d75f61";
  return "#FFFFFF"; // Default color if none of the conditions are met
}

function EmissionRateEveningStyle(feature) {
  return {
    fillColor: getColorRateEvening(feature.properties.Average__1),
    fillOpacity: 0.9,
    color: "black",
    weight: 1,
  };
}
window.subdistrictLayer = null;
window.totalEmissionLayer = null;
window.emissionRateLayer = null;
window.emissionRateMorningLayer = null;
window.emissionRateAfternoonLayer = null;
window.emissionRateEveningLayer = null;
window.totalEmissionMorningLayer = null;
window.totalEmissionEveningLayer = null;
window.totalEmissionAfternoonLayer = null;

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

    return fetch("data/processed/average-emission-rate-morning.geojson");
  })
  .then((response) => response.json())
  .then((data) => {
    emissionRateMorningLayer = L.geoJSON(data, {
      style: EmissionRateMorningStyle,
      filter: filterFeatures,
    });
    return fetch("data/processed/average-emission-rate-afternoon.geojson");
  })
  .then((response) => response.json())
  .then((data) => {
    emissionRateAfternoonLayer = L.geoJSON(data, {
      style: EmissionRateAfternoonStyle,
      filter: filterFeatures,
    });
    return fetch("data/processed/average-emission-rate-evening.geojson");
  })
  .then((response) => response.json())
  .then((data) => {
    emissionRateEveningLayer = L.geoJSON(data, {
      style: EmissionRateEveningStyle,
      filter: filterFeatures,
    });
    map.addControl(new customControl());

    // Add the opacity control to the map
    map.addControl(new layerOpacityControl());
  })
  .catch((error) => console.error("Error loading GeoJSON data:", error));
