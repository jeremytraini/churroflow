import React from 'react';
import Box from '@mui/material/Box';
import ChangeHistoryOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined';
import getAPI from '../../services/APIService';

const StatisticBox = ({type, from_date, to_date, warehouse_lat, warehouse_long}) => {
  let timePeriod = "12 months";

  const [title, setTitle] = React.useState("Test");
  const [unit, setUnit] = React.useState("");
  const [isOpposite, setIsOpposite] = React.useState(false);
  const [value, setValue] = React.useState("-");
  const [change, setChange] = React.useState("-");
  const [is_positive, setIsPositive] = React.useState("+");
  const [update, setUpdate] = React.useState(false);
  const APIService = getAPI();

  React.useEffect(() => {
    switch (type) {
      case "numActiveCustomers":
        setTitle("Number of active customers");
        setUnit("");
        fetchQuery(type, true);
        break;
      case "numInvoices":
        setTitle("Number of invoices");
        setUnit("");
        fetchQuery(type, true);
        break;
      case "averageDeliveryTime":
        setTitle("Avg. Delivery Time");
        setUnit(" days");
        fetchQuery(type, false);
        break;
      case "avgDeliveryDistance":
        setTitle("Avg. Delivery Distance");
        setUnit(" km");
        setIsOpposite(true);
        fetchQuery(type, false);
        break;
      case "numUniqueCustomers":
        setTitle("Number of unique customers");
        setUnit("");
        fetchQuery(type, true, warehouse_lat, warehouse_long);
        break;
      case "totalRevenue":
        setTitle("Total warehouse revenue");
        setUnit("");
        fetchQuery(type, true, warehouse_lat, warehouse_long);
        break;
    }
  }, [update, from_date, to_date]);

  async function fetchQuery (query, is_int, warehouse_lat, warehouse_long) {
    const response = await APIService.invoiceProcessingQuery(query, from_date, to_date, warehouse_lat, warehouse_long).catch((err) => {
      console.log(err);
      return;
    });
    if (response == null) {
      return;
    }
    
    const data = response.data

    if (data == null) {
      return;
    }
    
    if (is_int) {
      if (query === "totalRevenue") {
        setValue(Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(data.value));
      } else {
        setValue(data.value.toFixed(0));
      }
    } else {
      setValue(Math.round(data.value * 10) / 10);
    }

    

    setIsPositive(data.change > 0);
    setChange(data.change > 0 ? data.change : -data.change);
  }

  return (
    <Box sx={{
      margin: '10px 10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '90%',
      color: 'black',
    }}>
      <Box sx={{
        fontSize: '0.9rem',
        textAlign: 'left',
        paddingBottom: '10px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {title}
      </Box>
      <Box sx={{
        fontSize: '2.4rem',
        alignItems: 'center',
        flexGrow: 1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        margin: 'auto 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',

      }}>
        <Box
          sx={{
          }}
        >
          {value}{unit}
        </Box>
      </Box>
      <Box sx={{
        fontSize: '0.8rem',
        color: (is_positive && !isOpposite) || (!is_positive && !isOpposite) ? 'green' : 'red',
      }}>
        {is_positive ? (
          <ChangeHistoryOutlinedIcon sx={{
            fontSize: '0.8rem',
            verticalAlign: 'middle',
            paddingLeft: '5px',
            paddingBottom: '5px'
          }} />
        ) : (
          <ChangeHistoryOutlinedIcon sx={{
            fontSize: '0.8rem',
            verticalAlign: 'middle',
            paddingRight: '5px',
            paddingTop: '4px',
            transform: 'rotate(180deg)'
          }} />
        )}
        {/* Rounded change */}
        {Math.round(change)}{"%"}
      </Box>
      <Box sx={{
        fontSize: '0.7rem',
        color: 'grey',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        12 months
      </Box>
    </Box>
  );
}

export default StatisticBox;
