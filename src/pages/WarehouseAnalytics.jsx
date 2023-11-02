import React from "react";
import { BasicPage } from "./BasicPage";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LineGraph from "../components/boxes/LineGraphBox";
import BlurredBox from "../components/boxes/BlurredBox";
import { useAuth } from '../hooks/useAuth';
import StatisticBox from '../components/boxes/StatisticBox';
import DataTableBox from '../components/boxes/DataTableBox';
import Typography from "@mui/material/Typography";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useParams, useNavigate } from 'react-router-dom';
import getAPI from '../services/APIService';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  color: theme.palette.text.secondary,
}));


const WarehouseAnalytics = () => {
  const { user } = useAuth();
  const { lat, long } = useParams();
  const APIService = getAPI();
  const navigate = useNavigate();

  const [currentWarehouse, setCurrentWarehouse] = React.useState({
        lat: null,
        lon: null,
        name: "Loading..."
      });
  const [allWarehouses, setAllWarehouses] = React.useState([]);
  const [ sampleFrom, setSampleFrom ] = React.useState("All time");
  const [ dateRange, setDateRange ] = React.useState(null);

  React.useEffect(() => {
    if (sampleFrom === "All time") {
      const today = new Date();
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(today.getFullYear() - 5);
      setDateRange({
        from_date: fiveYearsAgo.toISOString().split('T')[0],
        to_date: today.toISOString().split('T')[0]
      });
    } else if (sampleFrom === "Last 3 months") {
      const today = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(today.getMonth() - 3);
      setDateRange({
        from_date: threeMonthsAgo.toISOString().split('T')[0],
        to_date: today.toISOString().split('T')[0]
      });
    } else if (sampleFrom === "Last 6 months") {
      const today = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(today.getMonth() - 6);
      setDateRange({
        from_date: sixMonthsAgo.toISOString().split('T')[0],
        to_date: today.toISOString().split('T')[0]
      });
    } else if (sampleFrom === "Last 12 months") {
      const today = new Date();
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(today.getMonth() - 12);
      setDateRange({
        from_date: twelveMonthsAgo.toISOString().split('T')[0],
        to_date: today.toISOString().split('T')[0]
      });
    }
  }, [sampleFrom]);

  React.useEffect(() => {
    console.log(lat, long, dateRange);
    if (dateRange) {
      // fetch warehouse data
      APIService.invoiceProcessingQuery("warehouseCoords", dateRange.from_date, dateRange.to_date).catch((err) => {
        setCurrentWarehouse({
          lat: null,
          lon: null,
          name: "All Warehouses"
        });
      }).then((response) => {
        const warehouses = response.data.data;

        if (lat && long) {
          const warehouse = warehouses.find((warehouse) => {
            // Find warehouse using tolerance of 0.0001
            return Math.abs(warehouse.lat - lat) < 0.0001 && Math.abs(warehouse.lon - long) < 0.0001;
          });
          setCurrentWarehouse(warehouse);

          // set all warehouses for select. remove current warehouse from list
          // setAllWarehouses(warehouses.filter((warehouse) => {
          //   console.log(warehouse.lat, lat, warehouse.lon, long);
          //   console.log(Math.abs(warehouse.lat - lat) < 0.0001 && Math.abs(warehouse.lon - long) < 0.0001);
          //   return !(Math.abs(warehouse.lat - lat) < 0.0001 && Math.abs(warehouse.lon - long) < 0.0001);
          // }));
        } else {
          setCurrentWarehouse({
            lat: null,
            lon: null,
            name: "All Warehouses"
          });
        }
        setAllWarehouses(warehouses);
      });
    } else {
      setCurrentWarehouse({
        lat: null,
        lon: null,
        name: "All Warehouses"
      });
    }
  }, [lat, long, dateRange]);

  return (
    <BasicPage
      title="Warehouse Analytics"
      action={
        <Select
          value={sampleFrom}
          onChange={(e) => setSampleFrom(e.target.value)}
          size="small"
          sx={{ color: 'grey', backgroundColor: 'white' }}
        >
          <MenuItem value="All time">All time</MenuItem>
          <MenuItem value="Last 3 months">Last 3 months</MenuItem>
          <MenuItem value="Last 6 months">Last 6 months</MenuItem>
          <MenuItem value="Last 12 months">Last 12 months</MenuItem>
        </Select>
      }
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          mb: 2
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            color: 'grey',
            mr: 1,
            fontSize: '1.4em'
          }}
          >
          Current Warehouse:
        </Typography>
        {!!allWarehouses.length &&
          <Select
            defaultValue={''}
            value={currentWarehouse.lat !== null ? currentWarehouse.lat+'/'+currentWarehouse.lon : ''}
            onChange={(e) => {
              navigate("/warehouse-analytics/"+e.target.value);
              }}
            size="small"
            sx={{
              color: 'grey',
              backgroundColor: 'white',
              width: '300px',
            }}
            displayEmpty
          >
            {console.log(currentWarehouse.lat !== null ? currentWarehouse.lat+'/'+currentWarehouse.lon : '')}
            <MenuItem value={''}>All Warehouses</MenuItem>
            {allWarehouses.map((warehouse) => {
              return <MenuItem value={warehouse.lat + "/" + warehouse.lon}>{warehouse.name}</MenuItem>
            })}
          </Select>
        }
      </Box>

      {!!dateRange && !!currentWarehouse &&
        <Box sx={{
          flexGrow: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr',
          gap: '20px',
          maxHeight: `calc(100vh - 250px)`
        }}>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '0.8fr 1.1fr 1.1fr',
            gap: '20px',
            gridArea: '1 / 1 / 7 / 3',
          }}>

            <Item sx={{
              gridArea: '1 / 1 / 2 / 2',
            }}>
              <StatisticBox type="numUniqueCustomers" from_date={dateRange.from_date} to_date={dateRange.to_date} warehouse_lat={currentWarehouse.lat} warehouse_long={currentWarehouse.lon} />
            </Item>
            
            <Item sx={{
              gridArea: '1 / 2 / 2 / 3',
            }}>
              <StatisticBox type="totalRevenue" from_date={dateRange.from_date} to_date={dateRange.to_date} warehouse_lat={currentWarehouse.lat} warehouse_long={currentWarehouse.lon} />
            </Item>

            <Item sx={{
              gridArea: '2 / 1 / 3 / 3',
            }}>
              <BlurredBox type="Warehouse product data table" isBlurred={user.tier !== 'Ultimate'}>
                <DataTableBox type="warehouseProductDataTable" from_date={dateRange.from_date} to_date={dateRange.to_date} warehouse_lat={currentWarehouse.lat} warehouse_long={currentWarehouse.lon} />
              </BlurredBox>
            </Item>

            <Item sx={{
              gridArea: '3 / 1 / 4 / 3',
            }}>
              <BlurredBox type="Suburb data table" isBlurred={user.tier !== 'Ultimate'}>
                <DataTableBox type="suburbDataTable" from_date={dateRange.from_date} to_date={dateRange.to_date} warehouse_lat={currentWarehouse.lat} warehouse_long={currentWarehouse.lon} />
              </BlurredBox>
            </Item>

          </Box>

          <Item sx={{
            gridArea: '1 / 3 / 3 / 5 ',
          }}>
            <BlurredBox type="Units over time graph" isBlurred={user.tier === 'Starter'}>
              <LineGraph type='deliveriesMadeMonthly' from_date={dateRange.from_date} to_date={dateRange.to_date} warehouse_lat={currentWarehouse.lat} warehouse_long={currentWarehouse.lon} />
            </BlurredBox>
          </Item>

          <Item sx={{
            gridArea: '3 / 3 / 5 / 5',
          }}>
            <BlurredBox type="Delivery distance istance graph" isBlurred={user.tier !== 'Ultimate'}>
              <LineGraph type='warehouseMonthlyAvgDeliveryDistance' from_date={dateRange.from_date} to_date={dateRange.to_date} warehouse_lat={currentWarehouse.lat} warehouse_long={currentWarehouse.lon} />
            </BlurredBox>
          </Item>


          <Item sx={{
            gridArea: '5 / 3 / 7 / 5',
          }}>
            <BlurredBox type="Delivery time graph"  isBlurred={user.tier !== 'Ultimate'}>
              <LineGraph type='warehouseMonthlyAvgDeliveryTime' from_date={dateRange.from_date} to_date={dateRange.to_date} warehouse_lat={currentWarehouse.lat} warehouse_long={currentWarehouse.lon} />
            </BlurredBox>
          </Item>

        </Box>
      }
      
    </BasicPage>
  );
};

export default WarehouseAnalytics;
