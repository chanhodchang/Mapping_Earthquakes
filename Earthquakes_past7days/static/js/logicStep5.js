// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox/streets-v11',
	accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox/satellite-streets-v11',
	accessToken: API_KEY
});

// Create the map object with center and zoom level.
let map = L.map('mapid', {
  center: [39.5,-98.5],
  zoom: 3,
  layers: [streets]
});

// Create a base layer that holds both maps
let baseMaps = {
    'Streets': streets,
    'Satellite Streets': satelliteStreets
};

// Create the earthquake layer for the map
let earthquakes = new L.LayerGroup();

// Create overlay to display earthquakes layer
let overlays = {
  Earthquakes: earthquakes
};

// Add visibilty layer control to the map
L.control.layers(baseMaps, overlays).addTo(map);

// Accessing the Earthquakes GeoJSON URL.
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
  if (magnitude > 5) {
    return '#ea2c2c';
  }
  if (magnitude > 4) {
    return '#ea822c';
  }
  if (magnitude > 3) {
    return '#ee9c00';
  }
  if (magnitude > 2) {
    return '#eecc00';   
  }
  if (magnitude > 1) {
    return '#d4ee00'
  }
  return '#98ee00'
}

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

// Retrieve the earthquake GeoJSON data.
d3.json(earthquakeData).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
      // Turn each feature into a circleMarker on the map
      pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
      },
      // Set the style for each circleMarker using the styleInfo function
      style: styleInfo,
      // Create a popup for each circleMarker to display the magnitude
      onEachFeature: function(feature, layer) {
        layer.bindPopup('Magnitude: ' + feature.properties.mag + '<br>Location: ' + feature.properties.place);
      }
  }).addTo(earthquakes);

  // Add a legend control object
  let legend = L.control({
    position: "bottomright"
  });
  // Add all the details for legend
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];
    // Loop through the intervals to generate a label with color
    for (var i = 0; i < magnitudes.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        magnitudes[i] + (magnitudes[i + 1] ? "–" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
};
legend.addTo(map);
    // Add earthquakes layer to the map
    earthquakes.addTo(map);
});