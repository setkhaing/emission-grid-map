document.addEventListener("DOMContentLoaded", function () {
  fetchGeoJSONAndPopulateTable();
});

function fetchGeoJSONAndPopulateTable() {
  fetch("data/raw/bkk-subdistrict.geojson")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      populateTable(data);
    })
    .catch((error) => {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
    });
}
let currentPage = 1;
const rowsPerPage = 5;

function populateTable(data) {
  const tableBody = document
    .getElementById("info-table")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Clear existing rows

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  data.features.slice(startIndex, endIndex).forEach(function (feature) {
    var row = tableBody.insertRow();
    var cell1 = row.insertCell(0);
    var subdistrictName = document.createElement("a");
    subdistrictName.href = "#";
    subdistrictName.innerHTML = feature.properties.subdistrict_name;
    subdistrictName.addEventListener("click", function () {
      zoomToFeature(feature);
    });
    cell1.appendChild(subdistrictName);

    var cell1 = row.insertCell(0);
    cell1.innerHTML = feature.properties.subdistrict_name;

    var cell2 = row.insertCell(1);
    cell2.innerHTML = feature.properties.percentage_average_total + "%";

    var cell3 = row.insertCell(2);
    cell3.innerHTML = feature.properties.percentage_average_total_morning + "%";

    var cell4 = row.insertCell(3);
    cell4.innerHTML =
      feature.properties.percentage_average_total_afternoon + "%";

    var cell5 = row.insertCell(4);
    cell5.innerHTML = feature.properties.percentage_average_total_evening + "%";

    var cell6 = row.insertCell(4);
    cell6.innerHTML = feature.properties.percentage_emission_rate + "%";

    var cell7 = row.insertCell(4);
    cell7.innerHTML = feature.properties.percentage_emission_rate_morning + "%";

    var cell8 = row.insertCell(4);
    cell8.innerHTML = feature.properties.percentage_emission_rate_afternoon + "%";

    var cell9 = row.insertCell(4);
    cell9.innerHTML = feature.properties.percentage_emission_rate_evening + "%";
  });
}

function changePage(direction) {
  fetch("data/raw/bkk-subdistrict.geojson")
    .then((response) => response.json())
    .then((data) => {
      const totalPages = Math.ceil(data.features.length / rowsPerPage);

      currentPage += direction;
      if (currentPage < 1) currentPage = 1;
      if (currentPage > totalPages) currentPage = totalPages;

      document.getElementById("currentPage").textContent = currentPage;
      populateTable(data);
    });
}

function zoomToFeature(feature) {
  // Create a temporary Leaflet GeoJSON layer to get the bounds
  var layer = L.geoJSON(feature);
  var bounds = layer.getBounds();
  map.fitBounds(bounds);
}
