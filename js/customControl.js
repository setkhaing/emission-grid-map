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

        var totalEmissionCheckbox = L.DomUtil.create("input", "", container);
        totalEmissionCheckbox.type = "checkbox";
        totalEmissionCheckbox.id = "totalEmissionCheckbox";
        totalEmissionCheckbox.checked = false;

        var totalEmissionLabel = L.DomUtil.create("label", "", container);
        totalEmissionLabel.htmlFor = "totalEmissionCheckbox";
        totalEmissionLabel.innerHTML = "Total Emission";

        var emissionRateCheckbox = L.DomUtil.create("input", "", container);
        emissionRateCheckbox.type = "checkbox";
        emissionRateCheckbox.id = "emissionRateCheckbox";
        emissionRateCheckbox.checked = false;

        var emissionRateLabel = L.DomUtil.create("label", "", container);
        emissionRateLabel.htmlFor = "emissionRateCheckbox";
        emissionRateLabel.innerHTML = "Emission Rate";

        L.DomEvent.on(totalEmissionCheckbox, "change", function () {
            if (totalEmissionCheckbox.checked) {
                map.addLayer(totalEmissionLayer);
                map.removeLayer(emissionRateLayer);
                emissionRateCheckbox.checked = false;
            } else {
                map.removeLayer(totalEmissionLayer);
            }
            subdistrictLayer.bringToFront();
        });

        L.DomEvent.on(emissionRateCheckbox, "change", function () {
            if (emissionRateCheckbox.checked) {
                map.addLayer(emissionRateLayer);
                map.removeLayer(totalEmissionLayer);
                totalEmissionCheckbox.checked = false;
            } else {
                map.removeLayer(emissionRateLayer);
            }
            subdistrictLayer.bringToFront();
        });

        return container;
    },
});
