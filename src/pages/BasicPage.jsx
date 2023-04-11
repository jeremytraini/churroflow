import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const BasicPage = ({ title, icon, children }) => {
  return (
    <Container component="main" sx={{
      background: 'linear-gradient(180deg, rgba(243, 244, 246, 100), rgb(186 209 255 / 48%))',
      height: '100%'
    }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>{icon}</Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
      </Box>
      {children}
    </Container>
  );
};
