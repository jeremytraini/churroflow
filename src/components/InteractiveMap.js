import L from 'leaflet';
import { useEffect, useRef, useState } from "react";
import warehouseLogo from '../assets/warehouse.png';
import physicalWarehouse from '../assets/selfWarehouse.png';
import getAPI from '../services/APIService';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import HeatmapOverlay from "leaflet-heatmap";

const max = 4000;
const radius = 0.04;

const InteractiveMap = ({ from_date, to_date }) => {
  const [heatmapData, setHeatmapData] = useState({ max: max, data: [] });
  const [virtualWarehouseCoords, setVirutalWarehouseCoords] = useState({});
  const [actualWarehousesCoords, setActualWarehousesCoords] = useState([]);
  const [numClusters, setNumClusters] = useState(2);
  // const [startDate, setStartDate] = useState('2000-1-1');
  // const [endDate, setEndDate] = useState('2023-4-4');
  const mapRef = useRef(null);
  const APIService = getAPI();


  async function getHeatmapData() {
    try {
      const a = await APIService.invoiceProcessingQuery("heatmapCoords", from_date, to_date)
        .then(data => {
          return { max: max, data: data.data.data.map((item) => { return { lat: item.lat, lng: item.lng, count: item.count } }) }; // This is fun
        });
      setHeatmapData(a);

    } catch (err) {
      console.log("Heatmap data Error");
    }
  }


  let cooldown_c = false;
  function handleChangeClusters(event) {
    if (!cooldown_c) {
      cooldown_c = true;
      setTimeout(() => {
        if (event.target.value !== '') {
          setNumClusters(event.target.value);
        }
        cooldown_c = false;
      }, 500);
    }
  }

  // let cooldown_c2 = false;
  // function handleChangeDateStart(event) {
  //   if (!cooldown_c2) {
  //     cooldown_c2 = true;
  //     setTimeout(() => {
  //       if (event.target.value !== '') {
  //         console.log(event.target.value);
  //         setStartDate(event.target.value);
  //       }
  //       cooldown_c2 = false;
  //     }, 500);
  //   }
  // }

  // let cooldown_c3 = false;
  // function handleChangeDateEnd(event) {
  //   if (!cooldown_c3) {
  //     cooldown_c3 = true;
  //     setTimeout(() => {
  //       if (event.target.value !== '') {
  //         console.log(event.target.value);
  //         setEndDate(event.target.value);
  //       }
  //       cooldown_c3 = false;
  //     }, 500);
  //   }
  // }


  async function getVirutalWarehouseCoords(clusterCount) {
    if (clusterCount !== '') {
      try {
        await APIService.virtualWarehouseCoords(clusterCount, from_date, to_date)
          .then(data => {
            setVirutalWarehouseCoords(data.data.content.centers);
          });
      } catch (err) {
        console.log("Virtual Warehouse Coords error")
      }
    }
  }


  async function GetSelfWarehouseCoords() {
    try {
      const a = await APIService.invoiceProcessingQuery("warehouseCoords", from_date, to_date)
        .then(data => {
          return data.data.data.map((item) => { return { lat: item.lat, lng: item.lon, count: item.value, name: item.name } });
        });
      setActualWarehousesCoords(a);
    } catch (err) {
      console.log("Heatmap data Error");
    }
  }


  useEffect(() => {
    getHeatmapData();
    getVirutalWarehouseCoords(numClusters);
    GetSelfWarehouseCoords();

  }, [from_date, to_date, numClusters]);

  const b = heatmapData;

  var myData = {
    max: max,
    data: b.data
  };

  var gradientColors = {
    0: '#00FF00',
    0.1: '#00FF00',
    0.35: '#FFFF00',
    0.6: '#FFA500',
    1.0: '#FF0000'
  };


  var cfg = {
    radius: radius,
    gradient: gradientColors,
    maxOpacity: 0.9,
    scaleRadius: true,
    useLocalExtrema: true,
    latField: "lat",
    lngField: "lng",
    valueField: "count"
  };

  var heatmapLayer = new HeatmapOverlay(cfg);


  useEffect(() => {
    const map_init = L.map(mapRef.current, {
      center: [-33.8358, 150.9282],
      zoom: 10,
      attributionControl: false,
      minZoom: 6,
      maxZoom: 15,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map_init);

    const warehouseIcon = L.icon({
      iconUrl: warehouseLogo,
      iconSize: [25, 25]
    });

    const actualWarehouse = L.icon({
      iconUrl: physicalWarehouse,
      iconSize: [25, 25]
    });

    const markerGroup = L.featureGroup();
    for (let [lat, lng] of Object.entries(virtualWarehouseCoords)) {
      // Create a new marker for the current coordinate pair
      const marker = L.marker([lat, lng], {
        icon: warehouseIcon
      }).addTo(map_init);
      var popupContent = document.createElement('div');
      popupContent.innerHTML = "<p>Type: <span style=\"color: red;\">Virtual Warehouse</span></p> <p>Coordinates: " + lat + ", " + lng + "</p>";
      marker.bindPopup(popupContent);
      marker.on('hover', function () {
        marker.openPopup();
      });

      // Add the marker to the markerGroup
      markerGroup.addLayer(marker);
    }

    const actualWarehouses = L.featureGroup();
    actualWarehousesCoords.map((warehouse) => {

      const { lat, lng, count, name } = warehouse;
      const markerPhysical = L.marker([lat, lng], {
        icon: actualWarehouse
      }).addTo(map_init);
      var popupStuff = document.createElement('div');
      popupStuff.innerHTML = "<p>Type: <span style=\"color: red;\">Physical Warehouse</span></p> <a href='/warehouse-analytics/" + lat + "/" + lng + "'>Name: "+name+"</a> <p>Coordinates: " + lat + ", " + lng + "</p><p>Total Invoices Value:</p><span style=\"color: red;\"> $" + count + "</span>";
      markerPhysical.bindPopup(popupStuff);
      markerPhysical.on('hover', function () {
        markerPhysical.openPopup();
      });
      actualWarehouses.addLayer(markerPhysical);
      return true;
    });

    markerGroup.addTo(map_init);

    heatmapLayer.setData(myData);

    const layerGroup = L.layerGroup([heatmapLayer]);
    const Overlaymaps = {
      "Heatmap": layerGroup
    };


    // L.control.layers(Overlaymaps).addTo(map_init);

    // Make this defualt
    map_init.addLayer(layerGroup);

    // That's for da memory leaks
    return () => {
      map_init.remove();
    };
  });

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <Box
        ref={mapRef}
        style={{
          flexGrow: 1,
          width: '100%',
          height: '100%',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '13px',
          left: '13px',
          zIndex: 999,
          width: '150px',
        }}
      >
        <TextField
          label="# Virtual Warehouses"
          type="number"
          name="clusterCount"
          InputProps={{ inputProps: { min: 1, max: 10 } }}
          onChange={handleChangeClusters}
          variant="outlined"
          defaultValue={numClusters}
          sx={{
            width: '100%',
            backgroundColor: 'white',
          }}
        />
      </Box>
    </Box>
  );
};

export default InteractiveMap;