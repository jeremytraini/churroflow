import { BasicPage } from "./BasicPage";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InteractiveMap from "../components/InteractiveMap";
import LineGraph from "../components/LineGraph";
import BlurredBox from "../components/boxes/BlurredBox";
import { useAuth } from '../hooks/useAuth';

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
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gap: '20px',
        height: `calc(100vh - 200px)`
      }}>

        <Item sx={{
          gridArea: '1 / 1 / 3 / 3 ',
        }}>
          <BlurredBox type="Units over time graph" isBlurred={user.tier === 'Starter'}>
            <LineGraph type='warehouseUnitsOverTime' from_date={"2021-12-12"} to_date={"2023-12-12"} />
          </BlurredBox>
        </Item>

        <Item sx={{
          gridArea: '3 / 1 / 5 / 3 ',
        }}>
          <BlurredBox type="Delivery distance istance graph" isBlurred={user.tier !== 'Ultimate'}>
            <LineGraph type='warehouseAvgDeliveryDistance' from_date={"2021-12-12"} to_date={"2023-12-12"} />
          </BlurredBox>
        </Item>


        <Item sx={{
          gridArea: '5 / 1 / 8 / 3 ',
        }}>
          <BlurredBox type="Delivery time graph"  isBlurred={user.tier !== 'Ultimate'}>
            <LineGraph type='warehouseAvgDeliveryTime' from_date={"2021-12-12"} to_date={"2023-12-12"} />
          </BlurredBox>
        </Item>

        <Item sx={{
          gridArea: '1 / 3 / 8 / 5 ',
        }}>
          <BlurredBox type="Interactive heatmap" isBlurred={user.tier !== 'Ultimate'}>
            <InteractiveMap />
          </BlurredBox>
        </Item>

      </Box>
    </BasicPage>
  );
};

export default WarehouseAnalytics;
