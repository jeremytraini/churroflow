import React from 'react';
import Chart from 'chart.js/auto';
import Box from '@mui/material/Box';
import getAPI from '../services/APIService';


function LineGraph( {data, type, from_date, to_date, warehouse_lat, warehouse_long} ) {
  const [title, setTitle] = React.useState("Test");
  const [chartData, setChartData] = React.useState(null);
  const [update, setUpdate] = React.useState(false);

  const APIService = getAPI();

  const chartRef = React.useRef(null);

  async function fetchQuery (query) {
    const response = await APIService.invoiceProcessingQuery(query, from_date, to_date, warehouse_lat, warehouse_long).catch((err) => {
      console.log(err);
      return;
    });
    if (response == null) {
      return;
    }

    if (response.data == null) {
      return;
    }

    setChartData(response.data);
  }

  React.useEffect(() => {
    switch (type) {
      case "deliveriesMadeMonthly":
        setTitle("No. Deliveries Made Monthly");
        fetchQuery(type);
        break;
      case "warehouseMonthlyAvgDeliveryDistance":
        setTitle("Avg. Montly Delivery Distance (km)");
        fetchQuery(type);
        break;
      case "warehouseMonthlyAvgDeliveryTime":
        setTitle("Avg. Montly Delivery Time");
        fetchQuery(type);
        break;
    }
  }, [update]);

  React.useEffect(() => {
    if (chartRef.current && chartData) {
      const chartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: title,
              data: chartData.data,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.4,
              
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [chartRef, chartData, title]);

  return (
    <Box
      sx={{
        margin: '10px 10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '80%',
        color: 'black',
      }}
    >
      <Box sx={{
        fontSize: '0.9rem',
        textAlign: 'left',
        paddingBottom: '10px',

      }}>
        {title}
      </Box>
      <canvas ref={chartRef} style={{width: '100%', flexGrow: 1 }}></canvas>
    </Box>
  );
}

export default LineGraph;