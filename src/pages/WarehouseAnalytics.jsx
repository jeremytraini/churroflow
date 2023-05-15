import { BasicPage } from "./BasicPage";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LineGraph from "../components/LineGraph";
import BlurredBox from "../components/boxes/BlurredBox";
import { useAuth } from '../hooks/useAuth';
import StatisticBox from '../components/boxes/StatisticBox';
import DataTableBox from '../components/boxes/DataTableBox';
import Typography from "@mui/material/Typography";

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

  return (
    <BasicPage title="Warehouse Analytics" >
      <Typography component="h1" variant="h5" sx={{ color: 'grey', mb: 1, fontSize: '1.4em' }}>
        All Warehouses
      </Typography>
      <Box sx={{
        flexGrow: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr',
        gap: '20px',
        height: `calc(100vh - 200px)`
      }}>
        <Item sx={{
          gridArea: '1 / 1 / 3 / 2',
        }}>
          <StatisticBox type="numUniqueCustomers" from_date={"2021-12-12"} to_date={"2023-12-12"} warehouse_lat={'-33.84938'} warehouse_long={'150.9033'} />
        </Item>

        <Item sx={{
          gridArea: '1 / 2 / 3 / 3',
        }}>
          <StatisticBox type="numActiveCustomers" from_date={"2021-12-12"} to_date={"2023-12-12"} warehouse_lat={'-33.84938'} warehouse_long={'150.9033'} />
        </Item>

        <Item sx={{
          gridArea: '3 / 1 / 7 / 3',
        }}>
          <BlurredBox type="Warehouse product data table" isBlurred={user.tier === 'Ultimate+'}>
            <DataTableBox type="warehouseProductDataTable" from_date={"2021-12-12"} to_date={"2023-12-12"} />
          </BlurredBox>
        </Item>

        <Item sx={{
          gridArea: '1 / 3 / 3 / 5 ',
        }}>
          <BlurredBox type="Units over time graph" isBlurred={user.tier === 'Starter'}>
            <LineGraph type='deliveriesMadeMonthly' from_date={"2021-12-12"} to_date={"2023-12-12"} warehouse_lat={'-33.84938'} warehouse_long={'150.9033'} />
          </BlurredBox>
        </Item>

        <Item sx={{
          gridArea: '3 / 3 / 5 / 5',
        }}>
          <BlurredBox type="Delivery distance istance graph" isBlurred={user.tier !== 'Ultimate'}>
            <LineGraph type='warehouseMonthlyAvgDeliveryDistance' from_date={"2021-12-12"} to_date={"2023-12-12"} warehouse_lat={'-33.84938'} warehouse_long={'150.9033'} />
          </BlurredBox>
        </Item>


        <Item sx={{
          gridArea: '5 / 3 / 7 / 5',
        }}>
          <BlurredBox type="Delivery time graph"  isBlurred={user.tier !== 'Ultimate'}>
            <LineGraph type='warehouseMonthlyAvgDeliveryTime' from_date={"2021-12-12"} to_date={"2023-12-12"} warehouse_lat={'-33.84938'} warehouse_long={'150.9033'} />
          </BlurredBox>
        </Item>

      </Box>
    </BasicPage>
  );
};

export default WarehouseAnalytics;
