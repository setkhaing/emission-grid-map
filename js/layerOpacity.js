// Layer Opacity Control
var layerOpacityControl = L.Control.extend({
  options: {
    //position: "bottomleft", // Changed to a default position
  },

  onAdd: function (map) {
    var container = L.DomUtil.create("div", "opacity-control");

    var opacityLabel = L.DomUtil.create("label", "", container);
    opacityLabel.innerHTML = "Layer Opacity: ";
    var opacitySpan = L.DomUtil.create("span", "", opacityLabel);
    opacitySpan.id = "opacityValue";
    opacitySpan.innerHTML = "100%";

    var opacitySlider = L.DomUtil.create("input", "", container);
    opacitySlider.type = "range";
    opacitySlider.id = "opacitySlider";
    opacitySlider.min = "0";
    opacitySlider.max = "100";
    opacitySlider.value = "100";

    L.DomEvent.on(opacitySlider, "input", function () {
      var value = opacitySlider.value;
      opacitySpan.innerHTML = value + "%";
      if (
        document.getElementById("totalEmissionCheckbox").checked &&
        window.totalEmissionLayer
      ) {
        window.totalEmissionLayer.setStyle({ fillOpacity: value / 100 });
      }
      if (
        document.getElementById("emissionRateCheckbox").checked &&
        window.emissionRateLayer
      ) {
        window.emissionRateLayer.setStyle({ fillOpacity: value / 100 });
      }
    });

    return container;
  },
});
