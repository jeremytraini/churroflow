import { BasicPage } from "./BasicPage";
import Home from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import ImageUpload from "../components/ImageUpload";
import Upload from '@mui/icons-material/Upload';
import FileCopy from '@mui/icons-material/FileCopy';
import { Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { KeyboardArrowRight } from "@mui/icons-material";

const InvoiceDataManager = () => {
  let invoices_data = [
    {
      name: 'Invoice_563.xml',
      errors: 1,
      warnings: 3,
      added: Date.now(),
      processed: Date.now(),
      edited: Date.now(),
    },
    {
      name: 'Invoice_564.xml',
      errors: 2,
      warnings: 5,
      added: Date.now(),
      processed: Date.now(),
      edited: Date.now(),
    },
    {
      name: 'Invoice_565.xml',
      errors: 5,
      warnings: 3,
      added: Date.now(),
      processed: Date.now(),
      edited: Date.now(),
    },
    {
      name: 'Invoice_566.xml',
      errors: 0,
      warnings: 3,
      added: Date.now(),
      processed: Date.now(),
      edited: Date.now(),
    },
    {
      name: 'Invoice_567.xml',
      errors: 0,
      warnings: 0,
      added: Date.now(),
      processed: Date.now(),
      edited: Date.now(),
    },
    {
      name: 'Invoice_568.xml',
      errors: 0,
      warnings: 0,
      added: Date.now(),
      processed: Date.now(),
      edited: Date.now(),
    },
  ]

  let error_invoices = invoices_data.filter(invoice => invoice.errors || invoice.warnings)
  let valid_invoices = invoices_data.filter(invoice => !(invoice.errors || invoice.warnings))

  return (
    <BasicPage title="Invoice Data Manager" icon={<Home />}>
      <Box>
        <Button startIcon={<Upload />} sx={{ backgroundColor: 'white', my: 2, color: 'black' }}><h3>Upload Invoices</h3></Button>
        <Button startIcon={<FileCopy />} sx={{ backgroundColor: 'white', my: 2, color: 'black', left: '62.5%' }}><h3>Download Reports</h3></Button>
      </Box>
      
      <h3>Processing Error Queue ({error_invoices.length})</h3>

      <List sx={{ width: '100%' }}>
        {error_invoices.map((invoice) => {
          const labelId = `checkbox-list-label-${invoice.name}`;

          return (
            <ListItem
              sx={{ marginBottom: '8px', backgroundColor: 'white' }}
              key={invoice.name}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <KeyboardArrowRight />
                </IconButton>
              }
              disablePadding
            >
              <ListItem>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>

                <Box sx ={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                  gap: '40px',
                  backgroundColor: 'white'
                  }}>
                  <h3 style={{
                    gridArea: '1 / 1 / 2 / 2',
                    }}>
                    {invoice.name}
                  </h3>
                  
                  <h5 style={{
                    gridArea: '1 / 2 / 2 / 3',
                    color: 'gray'
                    }}>
                    Errors: {invoice.errors}
                    <br />
                    Warnings: {invoice.warnings}
                  </h5>
                  
                  <h5 style={{
                    gridArea: '1 / 5 / 2 / 6',
                    color: 'gray'
                    }}>
                    Added: {invoice.added}
                    <br />
                    Edited: {invoice.edited}
                  </h5>
                </Box>

              </ListItem>
            </ListItem>
          );
        })}
      </List>

      <h3>Processed Invoices ({valid_invoices.length})</h3>

      <List sx={{ width: '100%' }}>
        {valid_invoices.map((invoice) => {
          const labelId = `checkbox-list-label-${invoice.name}`;

          return (
            <ListItem
              sx={{marginBottom: '8px', backgroundColor: 'white'}}
              key={invoice.name}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <KeyboardArrowRight />
                </IconButton>
              }
              disablePadding
            >
              <ListItem>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>

                <Box sx ={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                  gap: '22px',
                  backgroundColor: 'white'
                  }}>
                  <h3 style={{
                    gridArea: '1 / 1 / 2 / 2',
                    }}>
                    {invoice.name}
                  </h3>
                  
                  <h5 style={{
                    gridArea: '1 / 5 / 2 / 6',
                    color: 'gray'
                    }}>
                    Added: {invoice.added}
                    <br />
                    Processed: {invoice.processed}
                    <br />
                    Edited: {invoice.edited}
                  </h5>
                </Box>

              </ListItem>
            </ListItem>
          );
        })}
      </List>
      
    </BasicPage>
    );
};

export default InvoiceDataManager;
