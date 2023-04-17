import React from 'react';
// import { useAuth } from '../hooks/useAuth';
import { BasicPage } from "./BasicPage";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import StatisticBox from '../components/boxes/StatisticBox';
import DataTableBox from '../components/boxes/DataTableBox';
import { useParams } from 'react-router-dom';
import ValidatorBox from '../components/ValidatorBox';

const Validator = () => {
  // const { user } = useAuth();
  const { invoiceId } = useParams();

  return (
  <BasicPage title="Invoice Validator" backButton={true} >
    <ValidatorBox
      invoiceId={invoiceId}
    />
  </BasicPage>
  );
};

export default Validator;

