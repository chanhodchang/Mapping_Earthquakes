# Mapping_Earthquakes
Using JavaScript and D3 to populate a geographical map from data in GeoJSON <br />
Access WebPage: https://chanhodchang.github.io/Mapping_Earthquakes/

## Project Overview
Using JavaScript to manipulate data from a JSON file using Leaflet and Mapbox to create maps. Used D3 and GeoJSON to mark labels and create data points onto the maps.
Created multiple branches to organize the different maps by the different mapping styles. The Earthquake_past7days branch held the data and map that displayed earthquake data around the world. 

The challenge was to add tectonic plate data in the earthquakes map. GeoJSON Linestrings and polygons were used to display the different tectonic fault lines on the map.

## Resources
- Data Sources: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson, https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json
- Software: JavaScript 1.8.5, Leaflet 1.6.0, Mapbox API, HTML5, CSS3

## Summary
JavaScript and GeoJSON were used to create maps and map datapoints about earthquakes around the world. D3 was used to grab the data from the JSON files and displayed on an HTML file designed with CSS.

1. First set variables for the different layers used in the maps using the Mapbox API and also set a variable that displayed the different layers.
2. Set the variable to adjus the strating zoom and positon of the map.
3. Set the data source websites as a variable and grabbed the data using GeoJSON and D3.
4. Created different styles for the different circlemarkers that marked the different earhtquake apperances.
5. Edited the formatting to display a color and size scale based on the magnitude of the earthquakes.

The challenge section was to create several line that displayed the different tectonic sheets on the map.

1. Set the webpage holding the JSON file for the tectonic plates as a variable.
2. Used D3 and GeoJSON to grab the data and create borders on the map using linestrings.
3. Formated the color to an orange so it can be seem easier.

## Analysis
Look at the data map created, there seems to be more earthquake activity near the fault lines. The stronger earthquakes also all directly on the fault line. The JSON seems to have more recorded data in NOrht America and it shows that most of the earthquakes happen on the western US border. 