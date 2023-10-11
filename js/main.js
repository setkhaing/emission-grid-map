// Define the style for the subdistrict boundaries
function styleFeature(feature) {
    return {
        fillColor: '#FFFFFF',  // White fill color
        fillOpacity: 0.5,      // 50% opacity
        color: 'blue',         // Blue stroke color
        weight: 0.26,          // This is in pixels; you might need to adjust for exact mm
        dashArray: 'none'      // Solid line
    };
}
// Load the GeoJSON data and add it to the map
fetch("data/raw/bkk-subdistrict.geojson")
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: styleFeature,
            onEachFeature: onEachFeature
        }).addTo(map);
    })
    .catch(error => console.error("Error loading GeoJSON data:", error));

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: function(e) {
            var layer = e.target;
            layer.bindPopup("Subdistrict: " + feature.properties.ADM3_EN).openPopup();
        },
        mouseout: function(e) {
            var layer = e.target;
            layer.closePopup();
        }
    });
}
