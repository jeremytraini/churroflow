import React from 'react';
import { BasicPage } from "./BasicPage";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import getAPI from '../services/APIService';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5d0d4',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 260,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const InvoiceDataManager = () => {
  const [invalidRows, setInvalidRows] = React.useState([]);
  const [processedRows, setProcessedRows] = React.useState([]);
  const [numberUploaded, setNumberUploaded] = React.useState(0);
  const [numberToUpload, setNumberToUpload] = React.useState(0);
  const navigate = useNavigate();
  const APIService = getAPI();

  const fetchInvoices = async () => {
    const invalidResponse = await APIService.listInvalidInvoices(true);

    if (invalidResponse.data) {
      console.log(invalidResponse.data);
      setInvalidRows(invalidResponse.data);
    }

    const validResponse = await APIService.listValidInvoices(true);

    if (validResponse.data) {
      setProcessedRows(validResponse.data);
    }
  };

  React.useEffect(() => {
    fetchInvoices();
  }, []);

  const normaliseLineEndings = (str, normalized = '\n') =>
    str.replace(/\r?\n/g, normalized);

  const uploadInvoices = async (event) => {
    if (!event.target.files[0]) {
      return;
    }
    
    setNumberToUpload(event.target.files.length);

    const reader = new FileReader();
    for (let i = 0; i < event.target.files.length; i++) {
      reader.onloadend = (function(file) {
        return function(evt) {
          APIService.uploadInvoice(file.name, normaliseLineEndings(evt.target.result));
        };
      })(event.target.files[i]);
      reader.readAsText(event.target.files[i]);
      setNumberUploaded(i);
      await new Promise(resolve => setTimeout(resolve, 800));
      fetchInvoices();
    }

    setNumberToUpload(0);
    setNumberUploaded(0);
    event.target.value = null;
  }

  return (
    <BasicPage
      title="Invoice Data Manager"
      action={
        <Button
          variant="contained"
          component="label"
          disableElevation
        >
          <CloudUploadIcon sx={{ marginRight: '10px' }} />
          Upload Invoices
          <input
            type="file"
            hidden
            className='hidden'
            multiple
            accept='xml/*'
            name="invoices"
            onChange={(event) => {
              uploadInvoices(event);
            }} />
        </Button>
      }
    > 
      
      {numberToUpload !== 0 &&
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <LinearProgress
            variant='determinate'
            value={numberUploaded / numberToUpload * 100}
            sx={{
              marginBottom: '20px',
              width: '100%',
              height: '10px',
              }}
          />
        </Box>
      }
      {invalidRows.length !== 0 &&
      <>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            marginBottom: '10px',
          }}
        >
          <Typography component="h1" variant="h6">
            Awaiting Rectification
          </Typography>
          <HtmlTooltip
            title={
                <>
                  <Typography color="inherit" variant="body2" fontWeight='bold'>Errors have been found in your invoices!</Typography>
                  <Typography color="inherit" variant="body2">
                    We cannot process data within invalid invoices as they are not PEPPOL compliant and may contain errors.
                  </Typography>
                  <Typography color="inherit" variant="body2">
                    Such invoices will not be included in your reports until they are rectified!
                  </Typography>
                </>
            }
            arrow
            placement="right"
          >
            <ErrorIcon
              sx={{
                marginLeft: '10px',
                height: '100%',
                color: '#e04f5e',
              }}
            />
          </HtmlTooltip>
        </Box>
        <DataGrid
          sx={{
            marginBottom: '20px',
            minHeight: '300px',
            backgroundColor: 'white',
            }}
          onCellClick={(event)=> event.stopPropagation}
          columns={[
            {
              field: 'name',
              hideable: false,
              headerName: 'Filename',
              width: 200,
            },
            {
              field: 'num_errors',
              headerName: 'Errors'
            },
            {
              field: 'num_warnings',
              headerName: 'Warnings'
            },
            {
              field: 'date_added',
              headerName: 'Date Added'
            },
            {
              field: 'date_last_modified',
              headerName: 'Last Modified'
            },
            {
              field: "actions",
              headerName: "",
              width: 150,
              sortable: false,
              disableClickEventBubbling: true,
              renderCell: (params) => {
                  const onDelete = () => {
                    const currentRow = params.row;
                    try {
                      APIService.deleteInvoice(currentRow.id);
                    } catch (error) {
                      console.log(error);
                    }
                    setInvalidRows((rows) => rows.filter((row) => row.id !== currentRow.id));
                  };

                  const onView = () => {
                    navigate('/invoice-validator/' + params.row.id);
                  };
                  
                  return (
                    <Stack direction="row" >
                      <IconButton size="large" onClick={onDelete}>
                        <DeleteIcon />
                      </IconButton>

                      <IconButton size="large" onClick={onView}>
                        <PlayArrowIcon />
                      </IconButton>
                    </Stack>
                  );
              },
            },
          ]}
          rows={invalidRows}
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
        />
      </>
      }
      
      <Typography component="h1" variant="h6" sx={{ marginBottom: '10px' }}>
        Processed Invoices ({processedRows.length})
      </Typography>
      <DataGrid
        sx={{
          marginBottom: '20px',
          minHeight: '500px',
          backgroundColor: 'white',
          }}
        columns={[
          {
            field: 'order_id',
            hideable: false,
            headerName: 'Order ID',
          },
          {
            field: 'invoice_title',
            headerName: 'Name',
          },
          {
            field: 'total_amount',
            headerName: 'Total',
            valueFormatter: (params) => {
              return '$' + params.value;
            }
          },
          {
            field: 'customer_name',
            headerName: 'Customer'
          },
          {
            field: 'issue_date',
            headerName: 'Issue Date'
          },
          {
            field: 'delivery_date',
            headerName: 'Delivery Date'
          },
          {
            field: 'date_added',
            headerName: 'Date Added'
          },
          {
            field: 'date_last_modified',
            headerName: 'Last Modified'
          },
          {
            field: "actions",
            headerName: "",
            width: 150,
            sortable: false,
            renderCell: (params) => {
                const onDelete = () => {
                  const currentRow = params.row;
                  try {
                    APIService.deleteInvoice(currentRow.id);
                  } catch (error) {
                    console.log(error);
                  }
                  setProcessedRows(processedRows.filter((row) => row.id !== currentRow.id));
                };

                const onView = () => {
                  navigate('/invoice-validator/' + params.row.id);
                };
                
                return (
                  <Stack direction="row" >
                    <IconButton size="large" onClick={onDelete}>
                      <DeleteIcon />
                    </IconButton>

                    <IconButton size="large" onClick={onView}>
                      <EditIcon />
                    </IconButton>
                  </Stack>
                );
            },
          },
        ]}
        rows={processedRows}
        slots={{
          toolbar: GridToolbar,
        }}
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
        backgroundColor='white'
      />
    </BasicPage>
  );
};

export default InvoiceDataManager;
