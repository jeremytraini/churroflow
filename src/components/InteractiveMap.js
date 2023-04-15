import L from 'leaflet';
import { useEffect, useRef } from "react";
// import 'leaflet/dist/leaflet.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// import "leaflet.heat";
// import "leaflet-heatmap.js";
import HeatmapOverlay from "leaflet-heatmap";
// import "leaflet-heatmap";
// import 'leaflet-heatmap';

const InteractiveMap = () => {
      const mapRef = useRef(null);

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
        max: 100,
        data: [
          { lat: -33.8677, lng: 151.2089, count: 100 },
          { lat: -33.5877, lng: 151.3089, count: 100 },
          { lat: -33.6877, lng: 151.3089, count: 5 },
          { lat: -33.7877, lng: 151.3089, count: 40 },
          { lat: -33.7577, lng: 151.3089, count: 20 },
          { lat: -33.6577, lng: 151.3089, count: 25 },
          { lat: -33.8277, lng: 151.3089, count: 70 },
          { lat: -33.7177, lng: 151.3089, count: 40 }
        ]
      };

      var cfg = {
        radius: 0.01,
        maxOpacity: 1,
        scaleRadius: true,
        useLocalExtrema: true,
        latField: "lat",
        lngField: "lng",
        valueField: "count"
      };

      var heatmapLayer = new HeatmapOverlay(cfg);

      // const heatData = data.map(d => [d.lat, d.lng, d.value]);
      heatmapLayer.setData(myData);

      // function formatHeatmapData(data) {
      //   return {
      //     max: 100, // The maximum intensity value
      //     data: data.map((d) => [d.lat, d.lng, d.value]),
      //   };
      // }

      // const dummyHeatmapData = formatHeatmapData(data);

      useEffect(() => {
        const map_init = L.map(mapRef.current, {
          center: [-33.8677 , 151.2089],
          zoom: 11
        });
    
        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map_init);
    
        const marker = L.marker([-33.8677 ,151.2089], {
          icon: marketIcon
      }).addTo(map_init);
      
      var popupContent = document.createElement('div');
      popupContent.innerHTML = "<b>Hello world!</b><br />I am a popup.";
      marker.bindPopup(popupContent);
      marker.on('click', function(e) {
        marker.openPopup();
      });
        const Basemaps = {
          "OSM": osm
        };
    
        const Overlaymaps = {
          "Marker": marker,
          "Heatmap": heatmapLayer
        };

        // const a = L.heatLayer(dummyHeatmapData.data, { max: dummyHeatmapData.max }).addTo(map_init);

        L.control.layers(Basemaps, Overlaymaps).addTo(map_init);
    
        // That's for da memory leaks
        return () => {
          map_init.remove();
        };
      }, []);
    
      return (
        <div ref={mapRef} style={{ height: '50%', width: '50%' }}></div>
      );
};

export default InteractiveMap;