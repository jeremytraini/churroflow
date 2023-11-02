import React from 'react';
import { BasicPage } from "./BasicPage";
import { useParams } from 'react-router-dom';
import ValidatorBox from '../components/ValidatorBox';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';

const Validator = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();

  return (
  <BasicPage
    title="Invoice Validator"
    action={
      <IconButton
        aria-label="back" 
        onClick={() => navigate(-1)}
        sx={{ marginRight: '10px' }}
      >
        <ArrowBackIosNewIcon fontSize="inherit" />
      </IconButton>
    }
  >
    <ValidatorBox
      invoiceId={invoiceId}
    />
  </BasicPage>
  );
};

export default Validator;

