import React from 'react';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withStyles } from "@mui/styles";
import { createMuiTheme } from "@mui/styles";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const DataTableBox = ({type, from_date, to_date}) => {
  let title = "Test";

  switch (type) {
    case "client":
      title = "Data by client";
      break;
    case "suburb":
      title = "Data by suburb";
      break;
  }

  const columns = [
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
    },
   ];

  const rows = [
    { id: 1, name: 'Jaden Collins', 'total-deliveries': 10000, 'total-revenue': 10000 },
    { id: 2, name: 'Franky Rees', 'total-deliveries': 10000, 'total-revenue': 10000 },
    { id: 3, name: 'Aaren Rose', 'total-deliveries': 100, 'total-revenue': 10000 },
    { id: 4, name: 'Johnny Jones', 'total-deliveries': 10000, 'total-revenue': 10000 },
    { id: 5, name: 'Jimmy Johns', 'total-deliveries': 10000, 'total-revenue': 10000 },
    { id: 6, name: 'Jack Jackson', 'total-deliveries': 20000, 'total-revenue': 10000 },
    { id: 7, name: 'Joe Jones', 'total-deliveries': 30000, 'total-revenue': 10000 },
    { id: 8, name: 'Jacky Jackson', 'total-deliveries': 10000, 'total-revenue': 10000 },
    { id: 9, name: 'Jo Jo', 'total-deliveries': 10000, 'total-revenue': 10000 },
    { id: 10, name: 'Donna Marie', 'total-deliveries': 10000, 'total-revenue': 10000 },
  ]

  return (
    <Box sx={{
      margin: '10px 10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      textAlign: 'left',
    }}>
      <Box>
        {title}
      </Box>
      <Box sx={{
          flexGrow: 1,
          marginBottom: '20px',
        }}>
        <DataGrid
          density="compact"
          rows={rows}
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
            border: 0

          }}
        />
      </Box>
    </Box>
  );
};

export default (DataTableBox);

