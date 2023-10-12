function updateLegend(layerType) {
    var legend = document.getElementById("legend");
    if (layerType === "totalEmission") {
      legend.innerHTML = `
          <h4>LEGEND</h4>
          <div><span style="background-color: #2b83ba; display: inline-block; width: 20px; height: 20px; margin-right: 5px;"></span> 0.001 - 0.054182</div>
          <div><span style="background-color: #b2df8a; display: inline-block; width: 20px; height: 20px; margin-right: 5px;"></span> 0.054182 - 0.074475</div>
          <div><span style="background-color: #fee9cd; display: inline-block; width: 20px; height: 20px; margin-right: 5px;"></span> 0.074475 - 0.103276</div>
          <div><span style="background-color: #d75f61; display: inline-block; width: 20px; height: 20px; margin-right: 5px;"></span> 0.103276 - 0.324125</div>
      </div>
          `;
    } else if (layerType === "emissionRate") {
      legend.innerHTML = `
          <h4>LEGEND</h4>
          <div><span style="background-color: #2b83ba; display: inline-block; width: 20px; height: 20px; margin-right: 5px;"></span> test</div>
          <div><span style="background-color: #b2df8a; display: inline-block; width: 20px; height: 20px; margin-right: 5px;"></span> test</div>
          <div><span style="background-color: #fee9cd; display: inline-block; width: 20px; height: 20px; margin-right: 5px;"></span> Test</div>
          <div><span style="background-color: #d75f61; display: inline-block; width: 20px; height: 20px; margin-right: 5px;"></span> TEst</div>
      </div>
          `;
    } else {
      legend.innerHTML = ""; // Clear the legend if no layers are active
    }
  }
  