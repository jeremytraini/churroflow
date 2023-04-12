import React from 'react';
import Box from '@mui/material/Box';
import ChangeHistoryOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined';

const StatisticBox = ({type, from_date, to_date}) => {
  let timePeriod = "12 months";

  let title = "Test";
  let value = "100";
  let unit = " km";
  let change = "100";
  let is_positive = true;

  switch (type) {
    case "activeCustomers":
      title = "Number of active customers";
      value = "100";
      unit = " km";
      change = "100";
      is_positive = false;
      break;
    case "deliveries":
      title = "Deliveries";
      value = "100";
      unit = "";
      change = "100";
      is_positive = true;
      break;
    case "deliveryTime":
      title = "Delivery Time";
      value = "100";
      unit = " minutes";
      change = "100";
      is_positive = true;
      break;
    case "deliveryDistance":
      title = "Delivery Distance";
      value = "100";
      unit = " km";
      change = "100";
      is_positive = true;
      break;
  }

  return (
    <Box sx={{
      margin: '10px 10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '90%',
      color: 'black',
    }}>
      <Box sx={{
        fontSize: '0.9rem',
        textAlign: 'left',
        paddingBottom: '10px'
      }}>
        {title}
      </Box>
      <Box sx={{
        fontSize: '2rem',
        alignItems: 'center',
        flexGrow: 1,
      }}>
        {value}{unit}
      </Box>
      <Box sx={{
        fontSize: '0.8rem',
        color: is_positive ? 'green' : 'red',
      }}>
        {is_positive ? (
          <ChangeHistoryOutlinedIcon sx={{
            color: 'green',
            fontSize: '0.8rem',
            verticalAlign: 'middle',
            paddingLeft: '5px',
            paddingBottom: '5px'
          }} />
        ) : (
          <ChangeHistoryOutlinedIcon sx={{
            color: 'red',
            fontSize: '0.8rem',
            verticalAlign: 'middle',
            paddingRight: '5px',
            paddingTop: '4px',
            transform: 'rotate(180deg)'
          }} />
        )}
        
        {change+"%"}
      </Box>
      <Box sx={{
        fontSize: '0.7rem',
        color: 'grey'
      }}>
        {timePeriod}
      </Box>
    </Box>
  );
};

export default StatisticBox;

