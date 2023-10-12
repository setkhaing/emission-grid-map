// Custom Control for Layers
var customControl = L.Control.extend({
  options: {
    position: "topright",
  },

  onAdd: function (map) {
    var container = L.DomUtil.create(
      "div",
      "leaflet-bar leaflet-control leaflet-control-custom"
    );

    // Group for Total Emission and its subcategories
    var totalEmissionGroup = L.DomUtil.create(
      "div",
      "control-group",
      container
    );

    // Total Emission
    var totalEmissionCheckbox = L.DomUtil.create(
      "input",
      "",
      totalEmissionGroup
    );
    totalEmissionCheckbox.type = "checkbox";
    totalEmissionCheckbox.id = "totalEmissionCheckbox";
    totalEmissionCheckbox.checked = false;

    var totalEmissionLabel = L.DomUtil.create("label", "", totalEmissionGroup);
    totalEmissionLabel.htmlFor = "totalEmissionCheckbox";
    totalEmissionLabel.innerHTML = "Total Emission";

    // Emission Rate
    var emissionRateCheckbox = L.DomUtil.create("input", "", container);
    emissionRateCheckbox.type = "checkbox";
    emissionRateCheckbox.id = "emissionRateCheckbox";
    emissionRateCheckbox.checked = false;

    var emissionRateLabel = L.DomUtil.create("label", "", container);
    emissionRateLabel.htmlFor = "emissionRateCheckbox";
    emissionRateLabel.innerHTML = "Emission Rate";

    // Total Emission Morning
    var totalEmissionMorningCheckbox = L.DomUtil.create(
      "input",
      "",
      totalEmissionGroup
    );
    totalEmissionMorningCheckbox.type = "checkbox";
    totalEmissionMorningCheckbox.id = "totalEmissionMorningCheckbox";
    totalEmissionMorningCheckbox.checked = false;

    var totalEmissionMorningLabel = L.DomUtil.create(
      "label",
      "",
      totalEmissionGroup
    );
    totalEmissionMorningLabel.htmlFor = "totalEmissionMorningCheckbox";
    totalEmissionMorningLabel.innerHTML = "Total Emission Morning";

    // Total Emission Afternoon
    var totalEmissionAfternoonCheckbox = L.DomUtil.create(
      "input",
      "",
      totalEmissionGroup
    );
    totalEmissionAfternoonCheckbox.type = "checkbox";
    totalEmissionAfternoonCheckbox.id = "totalEmissionAfternoonCheckbox";
    totalEmissionAfternoonCheckbox.checked = false;

    var totalEmissionAfternoonLabel = L.DomUtil.create(
      "label",
      "",
      totalEmissionGroup
    );
    totalEmissionAfternoonLabel.htmlFor = "totalEmissionAfternoonCheckbox";
    totalEmissionAfternoonLabel.innerHTML = "Total Emission Afternoon";

    // Total Emission Evening
    var totalEmissionEveningCheckbox = L.DomUtil.create(
      "input",
      "",
      totalEmissionGroup
    );
    totalEmissionEveningCheckbox.type = "checkbox";
    totalEmissionEveningCheckbox.id = "totalEmissionEveningCheckbox";
    totalEmissionEveningCheckbox.checked = false;

    var totalEmissionEveningLabel = L.DomUtil.create(
      "label",
      "",
      totalEmissionGroup
    );
    totalEmissionEveningLabel.htmlFor = "totalEmissionEveningCheckbox";
    totalEmissionEveningLabel.innerHTML = "Total Emission Evening";

    // Emission Rate Morning
    var emissionRateMorningCheckbox = L.DomUtil.create("input", "", container);
    emissionRateMorningCheckbox.type = "checkbox";
    emissionRateMorningCheckbox.id = "emissionRateMorningCheckbox";
    emissionRateMorningCheckbox.checked = false;

    var emissionRateMorningLabel = L.DomUtil.create("label", "", container);
    emissionRateMorningLabel.htmlFor = "emissionRateMorningCheckbox";
    emissionRateMorningLabel.innerHTML = "Emission Rate Morning";

    // Emission Rate Afternoon
    var emissionRateAfternoonCheckbox = L.DomUtil.create(
      "input",
      "",
      container
    );
    emissionRateAfternoonCheckbox.type = "checkbox";
    emissionRateAfternoonCheckbox.id = "emissionRateAfternoonCheckbox";
    emissionRateAfternoonCheckbox.checked = false;

    var emissionRateAfternoonLabel = L.DomUtil.create("label", "", container);
    emissionRateAfternoonLabel.htmlFor = "emissionRateAfternoonCheckbox";
    emissionRateAfternoonLabel.innerHTML = "Emission Rate Afternoon";

    // Emission Rate Evening
    var emissionRateEveningCheckbox = L.DomUtil.create("input", "", container);
    emissionRateEveningCheckbox.type = "checkbox";
    emissionRateEveningCheckbox.id = "emissionRateEveningCheckbox";
    emissionRateEveningCheckbox.checked = false;

    var emissionRateEveningLabel = L.DomUtil.create("label", "", container);
    emissionRateEveningLabel.htmlFor = "emissionRateEveningCheckbox";
    emissionRateEveningLabel.innerHTML = "Emission Rate Evening";

    // Deselect all checkboxes
    function deselectAllCheckboxes() {
      totalEmissionCheckbox.checked = false;
      emissionRateCheckbox.checked = false;
      totalEmissionMorningCheckbox.checked = false;
      totalEmissionAfternoonCheckbox.checked = false;
      totalEmissionEveningCheckbox.checked = false;
      emissionRateMorningCheckbox.checked = false;
      emissionRateAfternoonCheckbox.checked = false;
      emissionRateEveningCheckbox.checked = false;

      // Add other checkboxes here if needed
    }
    var layerMapping = {
      totalEmissionCheckbox: totalEmissionLayer,
      emissionRateCheckbox: emissionRateLayer,
      emissionRateMorningCheckbox: emissionRateMorningLayer,
      emissionRateAfternoonCheckbox: emissionRateAfternoonLayer,
      emissionRateEveningCheckbox: emissionRateEveningLayer,
      totalEmissionMorningCheckbox: totalEmissionMorningLayer,
      totalEmissionAfternoonCheckbox: totalEmissionAfternoonLayer,
      totalEmissionEveningCheckbox: totalEmissionEveningLayer,

      // Add other layers here if needed
    };

    // Function to handle the addition and removal of layers
    function handleLayerChange(checkboxId, legendName) {
      deselectAllCheckboxes();
      document.getElementById(checkboxId).checked = true;

      // Remove all layers
      for (var layer in layerMapping) {
        map.removeLayer(layerMapping[layer]);
      }

      // Add the selected layer
      map.addLayer(layerMapping[checkboxId]);
      updateLegend(legendName);

      subdistrictLayer.bringToFront();
    }

    L.DomEvent.on(totalEmissionCheckbox, "change", function () {
      handleLayerChange("totalEmissionCheckbox", "totalEmission");
    });

    L.DomEvent.on(emissionRateCheckbox, "change", function () {
      handleLayerChange("emissionRateCheckbox", "emissionRate");
    });

    L.DomEvent.on(totalEmissionMorningCheckbox, "change", function () {
      handleLayerChange("totalEmissionMorningCheckbox", "totalEmission");
    });

    L.DomEvent.on(totalEmissionAfternoonCheckbox, "change", function () {
      handleLayerChange("totalEmissionAfternoonCheckbox", "totalEmission");
    });

    L.DomEvent.on(totalEmissionEveningCheckbox, "change", function () {
      handleLayerChange("totalEmissionEveningCheckbox", "totalEmission");
    });

    L.DomEvent.on(emissionRateMorningCheckbox, "change", function () {
      handleLayerChange("emissionRateMorningCheckbox", "emissionRate");
    });

    L.DomEvent.on(emissionRateAfternoonCheckbox, "change", function () {
      handleLayerChange("emissionRateAfternoonCheckbox", "emissionRate");
    });

    L.DomEvent.on(emissionRateEveningCheckbox, "change", function () {
      handleLayerChange("emissionRateEveningCheckbox", "emissionRate");
    });

    // ... [Any other checkboxes you have]

    return container;
  },
});
