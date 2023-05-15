import React from 'react';
import { BasicPage } from "./BasicPage";
import { useParams } from 'react-router-dom';
import ValidatorBox from '../components/ValidatorBox';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

const Validator = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();

  return (
  <BasicPage
    title="Invoice Validator"
    action={
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    }
  >
    <ValidatorBox
      invoiceId={invoiceId}
    />
  </BasicPage>
  );
};

export default Validator;

