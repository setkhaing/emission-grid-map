function updateLegend(layerType) {
    var legend = document.getElementById("legend");
    if (layerType === "totalEmission") {
      legend.innerHTML = `
          <h4>Average Total Emission (kg) </h4>
          <div><span style="background-color: #d75f61; display: inline-block; width: 20px; height: 20px; margin-right: 5px;"></span> >0.137 kg </div>
          <div><span style="background-color: #fee9cd; display: inline-block; width: 20px; height: 20px; margin-right: 5px;"></span> >0.105 kg to 0.137 kg</div>
          <div><span style="background-color: #b2df8a; display: inline-block; width: 20px; height: 20px; margin-right: 5px;"></span> >0.080 kg to 0.105 kg</div>
          <div><span style="background-color: #2b83ba; display: inline-block; width: 20px; height: 20px; margin-right: 5px;"></span> <0.080 kg</div>

      </div>
          `;
    } else if (layerType === "emissionRate") {
      legend.innerHTML = `
          <h4>Emission Rate (kg/km) </h4>
          <div><span style="background-color: #d75f61; display: inline-block; width: 20px; height: 20px; margin-right: 5px;"></span> >0.177 kg/km</div>
          <div><span style="background-color: #fee9cd; display: inline-block; width: 20px; height: 20px; margin-right: 5px;"></span> >0.165 kg/km to 0.177 kg/km</div>
          <div><span style="background-color: #b2df8a; display: inline-block; width: 20px; height: 20px; margin-right: 5px;"></span> >0.152 kg/km to 0.165 kg/km</div>
          <div><span style="background-color: #2b83ba; display: inline-block; width: 20px; height: 20px; margin-right: 5px;"></span> <0.152 kg/km</div>

      </div>
          `;
    } else {
      legend.innerHTML = ""; // Clear the legend if no layers are active
    }
  }
  