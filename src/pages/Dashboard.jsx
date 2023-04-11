import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { BasicPage } from "./BasicPage";
import Home from "@mui/icons-material/Home";
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import StatisticBox from '../components/boxes/StatisticBox';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  const { user } = useAuth();

  return (
  <BasicPage title="Dashboard">
    <Box sx={{
      display: 'grid',
      // gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridTemplateRows: '1fr 1fr 1fr 1fr',
      gap: '20px',
      height: `calc(100vh - 200px)`
      }}>
      <Item sx={{
        gridArea: '1 / 1 / 2 / 2'
      }}>
        <StatisticBox type="activeCustomers" />
      </Item>

      <Item sx={{
        gridArea: '1 / 2 / 2 / 3'
      }}>
        <StatisticBox type="deliveries" />
      </Item>

      <Item sx={{
        gridArea: '2 / 1 / 3 / 2'
      }}>
       <StatisticBox type="deliveryTime" />
      </Item>

      <Item sx={{
        gridArea: '2 / 2 / 3 / 3'
      }}>
        <StatisticBox type="deliveryDistance" />
      </Item>

      <Item sx={{
        gridArea: '1 / 3 / 3 / 5'
      }}>
      Heatmap
      </Item>

      <Item sx={{
        gridArea: '3 / 1 / 5 / 3'
      }}>
      Client
      </Item>

      <Item sx={{
        gridArea: '3 / 3 / 5 / 5'
      }}>
      Suburb
      </Item>
    </Box>
  </BasicPage>
  );
};

export default Dashboard;

