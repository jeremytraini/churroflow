import L from 'leaflet';
import { useEffect, useRef, useState } from "react";
// import 'leaflet/dist/leaflet.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// import APIService from "../services/APIService.js";
import http from "../http-common";

import HeatmapOverlay from "leaflet-heatmap";

const InteractiveMap = () => {
  const [heatmapData, setHeatmapData] = useState({max:0, data:[]});
  const mapRef = useRef(null);
  // useEffect(() => {
  //   http.get("/random_heatmap_data").then((response) => {
  //     return response.data;
  //   }).then(hData => setHeatmapData({max:1000, data:hData}));
  //   // then((response) => {
  //   //   setIsAlive(response.data.is_alive);
  //   // }).catch((err) => {
  //   //   setIsAlive(false);
  //   // });
  //   // APIService.checkAliveness().then((response) => {
  //   //   console.log(response.data.is_alive);
  //   // });
  //   //   .then(response => console.log(response))
  //     // .then(data => console.log(data))
  //     // .catch(error => console.error(error));
  // }, []);

  // useEffect(() => {
  //   console.log(heatmapData);
  // }, [heatmapData]);
  
  function getHeatmapData() {
    http.get("/random_heatmap_data").then((response) => {
      return response.data;
    }).then(hData => setHeatmapData({max:1000, data:hData}));
    // return heatmapData;
  }

  useEffect(() => {
    getHeatmapData();
  }, []);

  const marketIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIconRetina,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -36],
    tooltipAnchor: [12, -31],
    shadowSize: [41, 41]
  });


  var myData = {
    max: 1000,
    data: [
      {lat: -33.998826, lng: 150.55182, count: 514 },
      {lat: -33.664457, lng: 151.127358, count: 482 },
      {lat: -33.605669, lng: 151.039052, count: 750 },
      {lat: -33.65857, lng: 150.827173, count: 753 },
      {lat: -33.984124, lng: 150.687985, count: 770 },
      {lat: -33.842805, lng: 151.279476, count: 724 },
      {lat: -33.65857, lng: 150.827173, count: 527 },
      {lat: -33.71747, lng: 150.549074, count: 438 },
      {lat: -33.984124, lng: 150.687985, count: 137 },
      {lat: -33.685555, lng: 151.221704, count: 538 },
      {lat: -33.664457, lng: 151.127358, count: 4 },
      {lat: -33.984124, lng: 150.687985, count: 217 },
      {lat: -33.951124, lng: 151.237018, count: 506 },
      {lat: -33.940115, lng: 151.146702, count: 168 },
      {lat: -33.842805, lng: 151.279476, count: 446 },
      {lat: -33.951124, lng: 151.237018, count: 213 },
      {lat: -33.813083, lng: 150.812361, count: 50 },
      {lat: -33.951124, lng: 151.237018, count: 387 },
      {lat: -33.724418, lng: 150.782603, count: 873 },
      {lat: -33.627338, lng: 150.599307, count: 875 },
      {lat: -34.045782, lng: 151.308497, count: 121 },
      {lat: -33.940115, lng: 151.146702, count: 651 },
      {lat: -33.625918, lng: 150.97108, count: 10 },
      {lat: -33.625918, lng: 150.97108, count: 666 },
      {lat: -33.774937, lng: 150.635718, count: 570 },
      {lat: -33.842805, lng: 151.279476, count: 843 },
      {lat: -33.940115, lng: 151.146702, count: 90 },
      {lat: -33.89591, lng: 150.521925, count: 451 },
      {lat: -33.603527, lng: 150.785003, count: 33 },
      {lat: -33.722685, lng: 150.81, count: 885 },
      {lat: -33.65857, lng: 150.827173, count: 833 },
      {lat: -33.984124, lng: 150.687985, count: 16 },
      {lat: -33.842805, lng: 151.279476, count: 356 },
      {lat: -34.025002, lng: 150.568444, count: 485 },
      {lat: -34.045782, lng: 151.308497, count: 362 },
      {lat: -33.71747, lng: 150.549074, count: 189 },
      {lat: -33.625918, lng: 150.97108, count: 711 },
      {lat: -33.71747, lng: 150.549074, count: 615 },
      {lat: -33.842805, lng: 151.279476, count: 891 },
      {lat: -33.813083, lng: 150.812361, count: 142 },
      {lat: -33.71747, lng: 150.549074, count: 85 },
      {lat: -33.722685, lng: 150.81, count: 657 },
      {lat: -33.998826, lng: 150.55182, count: 622 },
      {lat: -34.025002, lng: 150.568444, count: 896 },
      {lat: -33.605669, lng: 151.039052, count: 442 },
      {lat: -33.722685, lng: 150.81, count: 723 },
      {lat: -33.89591, lng: 150.521925, count: 187 },
      {lat: -33.724418, lng: 150.782603, count: 290 },
      {lat: -33.984124, lng: 150.687985, count: 244 },
      {lat: -33.89591, lng: 150.521925, count: 696 },
      {lat: -33.664457, lng: 151.127358, count: 601 },
      {lat: -33.813083, lng: 150.812361, count: 762 },
      {lat: -33.722685, lng: 150.81, count: 822 },
      {lat: -33.603527, lng: 150.785003, count: 801 },
      {lat: -33.664457, lng: 151.127358, count: 971 },
      {lat: -33.940115, lng: 151.146702, count: 419 },
      {lat: -33.813083, lng: 150.812361, count: 74 },
      {lat: -33.774937, lng: 150.635718, count: 448 },
      {lat: -33.603527, lng: 150.785003, count: 416 },
      {lat: -34.045782, lng: 151.308497, count: 516 },
      {lat: -33.984124, lng: 150.687985, count: 863 },
      {lat: -33.813083, lng: 150.812361, count: 236 },
      {lat: -33.603527, lng: 150.785003, count: 384 },
      {lat: -34.045782, lng: 151.308497, count: 280 },
      {lat: -33.940115, lng: 151.146702, count: 826 },
      {lat: -33.627338, lng: 150.599307, count: 342 },
      {lat: -33.65857, lng: 150.827173, count: 289 },
      {lat: -33.664457, lng: 151.127358, count: 749 },
      {lat: -33.940115, lng: 151.146702, count: 363 },
      {lat: -33.940115, lng: 151.146702, count: 756 },
      {lat: -33.603527, lng: 150.785003, count: 33 },
      {lat: -33.89591, lng: 150.521925, count: 820 },
      {lat: -34.025002, lng: 150.568444, count: 415 },
      {lat: -33.842805, lng: 151.279476, count: 24 },
      {lat: -33.627338, lng: 150.599307, count: 804 },
      {lat: -33.605669, lng: 151.039052, count: 90 },
      {lat: -33.627338, lng: 150.599307, count: 954 },
      {lat: -33.627338, lng: 150.599307, count: 970 },
      {lat: -33.664457, lng: 151.127358, count: 753 },
      {lat: -33.774937, lng: 150.635718, count: 319 },
      {lat: -33.984124, lng: 150.687985, count: 726 },
      {lat: -33.984124, lng: 150.687985, count: 873 },
      {lat: -33.722685, lng: 150.81, count: 348 },
      {lat: -33.664457, lng: 151.127358, count: 933 },
      {lat: -33.774937, lng: 150.635718, count: 597 },
      {lat: -33.685555, lng: 151.221704, count: 468 },
      {lat: -33.664457, lng: 151.127358, count: 956 },
      {lat: -34.045782, lng: 151.308497, count: 307 },
      {lat: -33.625918, lng: 150.97108, count: 39 },
      {lat: -33.65857, lng: 150.827173, count: 132 },
      {lat: -33.664457, lng: 151.127358, count: 991 },
      {lat: -33.627338, lng: 150.599307, count: 68 },
      {lat: -34.025002, lng: 150.568444, count: 303 },
      {lat: -33.842805, lng: 151.279476, count: 469 },
      {lat: -33.984124, lng: 150.687985, count: 272 },
      {lat: -33.605669, lng: 151.039052, count: 83 },
      {lat: -33.664457, lng: 151.127358, count: 925 },
      {lat: -33.605669, lng: 151.039052, count: 155 },
      {lat: -33.984124, lng: 150.687985, count: 337 },
      {lat: -33.605669, lng: 151.039052, count: 601 }
    ]
  };
  var gradientColors = {
    0.05: '#0000FF',
    0.1: '#00FF00',
    0.2: '#FFFF00',
    0.4: '#FFA500',
    1.0: '#FF0000'
  };
  var cfg = {
    radius: 0.05,
    gradient: gradientColors,
    maxOpacity: 1,
    scaleRadius: true,
    useLocalExtrema: false,
    latField: "lat",
    lngField: "lng",
    valueField: "count"
  };

  var heatmapLayer = new HeatmapOverlay(cfg);
  heatmapLayer.setData(myData);
  useEffect(() => {
    const map_init = L.map(mapRef.current, {
      center: [-33.8677, 151.2089],
      zoom: 11
    });


    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
      var div = L.DomUtil.create('div', 'legend');
      var grades = [0, 50, 100, 200, 400, 1000];
      var colors = ['blue', 'green', 'yellow', 'orange', 'red'];

      for (var i = 0; i < grades.length; i++) {
        div.innerHTML += '<p style="color: white; background-color:' + colors[i] + ';">' + grades[i] + grades[i + 1] + '&ndash;' + grades[i + 1] + (i===(grades.length-1) ? '+': '') + '</p>';
      }

      return div;
    };
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map_init);

    const marker = L.marker([-33.92103282, 151.2346622], {
      icon: marketIcon
    }).addTo(map_init);

    const marker1 = L.marker([-33.69192318, 150.72025822], {
      icon: marketIcon
    }).addTo(map_init);

    const marker2 = L.marker([-33.97523447, 150.61044607], {
      icon: marketIcon
    }).addTo(map_init);

    const marker3 = L.marker([-33.65116439, 151.10090747], {
      icon: marketIcon
    }).addTo(map_init);

    var popupContent = document.createElement('div');
    popupContent.innerHTML = "<b>Hello world!</b><br />I am a popup.";
    marker.bindPopup(popupContent);
    marker.on('click', function (e) {
      marker.openPopup();
    });
    // const Basemaps = {
    //   "OSM": osm
    // };
    const layerGroup = L.layerGroup([marker1, heatmapLayer, marker, marker2, marker3]);
    const Overlaymaps = {
      "Marker": marker,
      "Mark1": marker1,
      "Mark2": marker2,
      "Heatmap": layerGroup
      // "legend":legend
    };

    L.control.layers(Overlaymaps).addTo(map_init);
    legend.addTo(map_init);


    // That's for da memory leaks
    return () => {
      map_init.remove();
    };
  });

  return (
    <div ref={mapRef} style={{ height: '90%', width: '100%' }}></div>
  );
};

export default InteractiveMap;