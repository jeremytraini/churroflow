import { BasicPage } from "./BasicPage";
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box } from "@mui/material";

const columns = [
  { field: 'icon', headerName: '', width: 50 },
  { field: 'action', headerName: 'Action', width: 220 },
  { field: 'reason', headerName: 'Reason', width: 220 },
  { field: 'action_by', headerName: 'Action by', width: 100 },
  { field: 'raised', headerName: 'Raised', width: 100 },
];


const InventoryActions = () => {
  return <BasicPage title="Inventory Actions">
    <Box
      sx={{
        margin: 'auto',
        width: '80%',
      }}
    >
      <Typography component="h1" variant="h6" sx={{ margin: '0 10px' }}>
        Churro's Metro Warehouse
      </Typography>

      <DataGrid
          sx={{
            backgroundColor: 'white',
            minHeight: '300px',
          }}
          rows={[
            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
          ]}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          hideFooterPagination
          hideFooter
        />

      <Typography component="h1" variant="h6" sx={{ marginTop: '40px' }}>
        Churro's West Warehouse
      </Typography>
      <DataGrid
        sx={{
          backgroundColor: 'white',
          minHeight: '300px',
        }}
        rows={[
          { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        ]}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
        hideFooterPagination
        hideFooter
      />

      <Typography component="h1" variant="h6" sx={{ marginTop: '40px' }}>
        Churro's East Warehouse
      </Typography>
      <DataGrid
        sx={{
          backgroundColor: 'white',
          minHeight: '300px',
        }}
        rows={[
          { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        ]}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
        hideFooterPagination
        hideFooter
      />
    </Box>
    
  </BasicPage>;
};

export default InventoryActions;
