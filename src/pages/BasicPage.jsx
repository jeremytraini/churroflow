import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useTitle from '../useTitle';

export const BasicPage = ({ title, children }) => {
  useTitle("ChurroFlow - " + title);
  return (
    <Container component="main" sx={{
      background: 'linear-gradient(180deg, rgba(243, 244, 246, 100), rgb(186 209 255 / 48%))',
      height: '100%',
      width: '100%',
      maxWidth: false,
      marginTop: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      paddingTop: '35px',
      paddingLeft: '5px',
    }}>
      <Typography component="h1" variant="h5" sx={{ paddingBottom: '10px' }}>
        {title}
      </Typography>
      {children}
    </Container>
  );
};
