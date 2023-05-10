import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useTitle from '../useTitle';
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const BasicPage = ({ title, backButton, children }) => {
  useTitle("ChurroFlow - " + title);
  const navigate = useNavigate();

  return (
    <Container component="main" sx={{
      height: 'calc(100% - 35px)',
      width: '100%',
      // maxWidth: false,
      minWidth: '850px',
      marginTop: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      paddingTop: '35px',
      paddingLeft: '5px',
    }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ paddingBottom: '10px' }}>
            {title}
          </Typography>
          {!!backButton && 
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          }
        </Box>
        {children}
      </LocalizationProvider>
    </Container>
  );
};
