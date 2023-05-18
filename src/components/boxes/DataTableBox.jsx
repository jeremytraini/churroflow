import React from 'react';
import MUIDataTable from "mui-datatables";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import getAPI from '../../services/APIService';

const DataTableBox = ({type, from_date, to_date, warehouse_lat, warehouse_long}) => {
  const [title, setTitle] = React.useState("Test");
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([{}]);
  const [update, setUpdate] = React.useState(false);
  const APIService = getAPI();

  React.useEffect(() => {
    switch (type) {
      case "clientDataTable":
        setTitle("Data by client");
        setColumns([
          {
            field: "name",
            headerName: "Client",
            type: 'string',
            width: 120,
          },
          {
            field: "total-deliveries",
            headerName: "Total Deliveries",
            type: 'number',
            width: 150,
          },
          {
            field: "total-revenue",
            headerName: "Total Revenue",
            type: 'number',
            width: 150,
            valueFormatter: (params) => {
              if (params.value == null) {
                return '';
              }
              return `$${params.value}`;
            },
          },
         ]);
        fetchQuery(type);
        break;
      case "suburbDataTable":
        setTitle("Data by suburb");
        fetchQuery(type, warehouse_lat, warehouse_long);
        setColumns([
          {
            field: "name",
            headerName: "Suburb",
            type: 'string',
            width: 90,
          },
          {
            field: "total-deliveries",
            headerName: "Total Deliveries",
            type: 'number',
            width: 120,
          },
          {
            field: "total-revenue",
            headerName: "Total Revenue",
            type: 'number',
            width: 120,
            valueFormatter: (params) => {
              if (params.value == null) {
                return '';
              }
              return `$${params.value}`;
            },
          },
          {
            field: "avg-delivery-time",
            headerName: "Avg. Delivery Time (days)",
            type: 'number',
            width: 140,
            valueFormatter: (params) => {
              if (params.value == null) {
                return '';
              }
              return Math.round(params.value * 100) / 100;
            },
          },
         ]);
        break;
      case "warehouseProductDataTable":
        setTitle("Data by product");
        fetchQuery(type, warehouse_lat, warehouse_long);
        setColumns([
          {
            field: "name",
            headerName: "Product",
            type: 'string',
            width: 100,
          },
          {
            field: "total-units",
            headerName: "Total Units",
            type: 'number',
            width: 150,
          },
          {
            field: "total-value",
            headerName: "Total Value",
            type: 'number',
            width: 150,
          },
         ]);
        break;
    }
  }, [update, from_date, to_date, warehouse_lat, warehouse_long]);

  async function fetchQuery (query, warehouse_lat, warehouse_long) {
    const response = await APIService.invoiceProcessingQuery(query, from_date, to_date, warehouse_lat, warehouse_long).catch((err) => {
      console.log(err);
      return;
    });

    if (response == null) {
      return;
    }
    
    const data = response.data;

    if (data == null) {
      return;
    }

    setRows(data.data);
  }

  return (
    <Box sx={{
      margin: '10px 10px',
      // display: 'flex',
      // flexDirection: 'column',
      // justifyContent: 'space-between',
      height: '100%',
      textAlign: 'left',
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
          // flexGrow: 1,
          height: '90%',
          paddingBottom: '20px',
        }}>
        <DataGrid
          density="compact"
          rows={rows ?? []}
          columns={columns}
          initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20,
                },
              },
              sorting: {
                sortModel: [
                  {
                    field: 'total-deliveries',
                    sort: 'desc',
                  },
                ],
              },
            }}
          // rowsPerPageOptions={[5]}
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          hideFooterPagination
          hideFooter
          sx={{
            '& .RaDatagrid-clickableRow': { cursor: 'default' },
            // Remove inner borders
            '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
              borderRight: 'none',
              borderBottom: 'none',
            },
            // Remove the outer borders
            border: 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default (DataTableBox);

