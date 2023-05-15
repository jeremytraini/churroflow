import React from 'react';
import Chart from 'chart.js/auto';
import Box from '@mui/material/Box';
import getAPI from '../services/APIService';


function LineGraph( {data, type, from_date, to_date} ) {
  const [title, setTitle] = React.useState("Test");
  const APIService = getAPI();

  const chartRef = React.useRef(null);

  async function fetchQuery (query, warehouseLat, warehouseLong) {
    const response = await APIService.invoiceProcessingQuery(query, from_date, to_date, warehouseLat, warehouseLong).catch((err) => {
      console.log(err);
      return;
    });
    if (response == null) {
      return;
    }
    
    const data = response.data

    if (data == null) {
      return;
    }

    return data;
  }

  React.useEffect(() => {
    if (chartRef.current) {
      let data = null;

      switch (type) {
        case "warehouseUnitsOverTime":
          setTitle("Number of active customers");
          data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            data: [1200, 1900, 3000, 5000, 2000, 3000, 8000, 4000],
          };
          fetchQuery(type, true);
          break;
        case "warehouseAvgDeliveryDistance":
          setTitle("Avg. Delivery Distance (Km)");
          data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            data: [34, 28, 30, 37, 39, 35, 30, 36],
          };
          fetchQuery(type, true);
          break;
        case "warehouseAvgDeliveryTime":
          setTitle("Avg. Delivery Time");
          data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            data: [2, 3, 1, 5, 8, 3, 3, 3],
          };
          fetchQuery(type, false);
          break;
      }

      const chartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'No Units Delivered Over Time',
              data: data.data,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.4,
            },
          ],
        },
        options: {
            maintainAspectRatio: false,
        }
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, []);

  return (
    <Box
      sx={{
        height: '100%',
      }}
    >
      <canvas ref={chartRef} style={{width: '100%', height: '100%'}}></canvas>
    </Box>
  );
}

export default LineGraph;