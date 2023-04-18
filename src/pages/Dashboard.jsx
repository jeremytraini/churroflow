import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { BasicPage } from "./BasicPage";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import StatisticBox from '../components/boxes/StatisticBox';
import DataTableBox from '../components/boxes/DataTableBox';
import BlurredBox from '../components/boxes/BlurredBox';
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <BasicPage title="Dashboard">
    <Box sx={{
      gridTemplateRows: '1fr 1fr 1fr 1fr',
      gap: '20px',
      height: `calc(100vh - 200px)`
      }}>
      <Item sx={{
        gridArea: '1 / 1 / 2 / 2'
      }}>
        <StatisticBox type="numActiveCustomers" from_date={"2021-12-12"} to_date={"2023-12-12"} />
      </Item>

      <Item sx={{
        gridArea: '1 / 2 / 2 / 3'
      }}>
        <StatisticBox type="numInvoices" from_date={"2021-12-12"} to_date={"2023-12-12"} />
      </Item>

      <Item sx={{
        gridArea: '2 / 1 / 3 / 2'
      }}>
        {user.tier === 'Starter'
        ? <BlurredBox type="Delivery time stat" />
        : <StatisticBox type="averageDeliveryTime" from_date={"2021-12-12"} to_date={"2023-12-12"} />
        }
      </Item>

      <Item sx={{
        gridArea: '2 / 2 / 3 / 3'
      }}>
        {user.tier === 'Starter'
        ? <BlurredBox type="Delivery distance stat" />
        : <StatisticBox type="avgDeliveryDistance" from_date={"2021-12-12"} to_date={"2023-12-12"} />
        }
      </Item>

      <Item sx={{
        gridArea: '1 / 3 / 3 / 5'
      }}>
      Heatmap
      </Item>

      <Item sx={{
        gridArea: '3 / 1 / 5 / 3'
      }}>
      <DataTableBox type="clientDataTable" from_date={"2021-12-12"} to_date={"2023-12-12"} />
      </Item>

      <Item sx={{
        gridArea: '3 / 3 / 5 / 5'
      }}>
      {user.tier === 'Starter'
        ? <BlurredBox type="Client data table" />
        : <DataTableBox type="suburbDataTable" from_date={"2021-12-12"} to_date={"2023-12-12"} />
      }
      </Item>
    </Box>
  </BasicPage>
  );
};

export default Dashboard;

