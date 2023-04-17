import React from 'react';
// import { useAuth } from '../hooks/useAuth';
import { BasicPage } from "./BasicPage";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import StatisticBox from '../components/boxes/StatisticBox';
import DataTableBox from '../components/boxes/DataTableBox';
import { useParams } from 'react-router-dom';

const Validator = () => {
  // const { user } = useAuth();
  const { invoiceId } = useParams();

  return (
  <BasicPage title="Invoice Validator" backButton={true} >
    <Box sx={{
      display: 'grid',
      // gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridTemplateRows: '1fr 1fr 1fr 1fr',
      gap: '20px',
      height: `calc(100vh - 200px)`
      }}>
      Test validator {invoiceId}
    </Box>

  </BasicPage>
  );
};

export default Validator;

