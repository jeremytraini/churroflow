import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useTitle from '../useTitle';
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

export const BasicPage = ({ title, backButton, children }) => {
  useTitle("ChurroFlow - " + title);
  const navigate = useNavigate();

  return (
    <Container component="main" sx={{
      height: 'calc(100% - 70px - 24px)',
      // height: '100%',
      marginTop: '24px',
      paddingBottom: '50px',
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "left",
    }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '15px',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ paddingBottom: '0' }}>
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
