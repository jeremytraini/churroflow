import { BasicPage } from "./BasicPage";
import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from "@mui/material/Typography";
import { sizing } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  color: theme.palette.text.secondary,
}));

const InventoryActions = () => {
  const onDownload = () => {
    const link = document.createElement("a");
    link.download = `download.txt`;
    link.href = "./download.txt";
    link.click();
  };
  return <BasicPage>
      <h1 style={{ color: 'black' }}>Inventory Actions</h1>
      <h2>Churro's Metro Warehouse</h2>

      
      
      
      <Container maxWidth="lg" maxHeight = "md" style={{ background: '#ffffff' }}>

      <FormControlLabel
        control={
            <Checkbox
                name="SomeName"
                value="SomeValue"
            />
        }
        label="Move 1000 units of Pens from West Warehouse to this warehouse"/>
        <p>Reason: Your Pen sales in Kensington spiked 32% in the 3 days and 1000 units are needed by 2023-04-08.</p>
        
        <Box
          m={1}
        //margin
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          sx={{ height: 20 }}
        >
          <Button variant="contained" color="success" sx={{ height: 30 }}>
            Notify Warehouse
          </Button>
        </Box>
      </Container>

      <Container maxWidth="lg" style={{ background: '#ffffff' }}>

      <FormControlLabel
        control={
            <Checkbox
                name="SomeName"
                value="SomeValue"
            />
        }
        label="Move 750 units of notebooks from East Warehouse to this warehouse"/>
        <p>Reason: Your notebook sales in Revesby spiked 72% in the 6 days and 1500 units are needed by 2023-12-16.</p>
        
        <Box
          m={1}
        //margin
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          sx={{ height: 20 }}
        >
          <Button variant="contained" color="success" sx={{ height: 30 }}>
            Notify Warehouse
          </Button>
        </Box>
      </Container>

      <h2>Churro's West Warehouse</h2>


      <Container maxWidth="lg" maxHeight = "md" style={{ background: '#ffffff' }}>

<FormControlLabel
  control={
      <Checkbox
          name="SomeName"
          value="SomeValue"
      />
  }
  label="Expected payment for 10,000 rubbers from OfficeGo from Metro Warehouse to West Warehouse"/>
  <p>Reason: Upcoming scheduled payment on a weekly delivery for OfficeGo - 10,000 units delivered every Wednesday.</p>
  
  <Box
    m={1}
  //margin
    display="flex"
    justifyContent="flex-end"
    alignItems="flex-end"
    sx={{ height: 20 }}
  >
    <Button variant="contained" color="warning" sx={{ height: 30 }} >
      Send Invoice
    </Button>

    
  </Box>
</Container>

<Container maxWidth="lg" style={{ background: '#ffffff' }}>

<FormControlLabel
  control={
      <Checkbox
          name="SomeName"
          value="SomeValue"
      />
  }
  label="Move 7000 units of tote bags from South Warehouse to this warehouse"/>
  <p>Reason: Your Tote Bag sales in Strathfield spiked 92% in the 4 days and an additional 2500 units are needed by 2023-05-02.</p>
  
  <Box
    m={1}
  //margin
    display="flex"
    justifyContent="flex-end"
    alignItems="flex-end"
    sx={{ height: 20 }}
  >
    <Button variant="contained" color="success" sx={{ height: 30 }}>
      Notify Warehouse
    </Button>
  </Box>
</Container>
      
      
    </BasicPage>
};

export default InventoryActions;
