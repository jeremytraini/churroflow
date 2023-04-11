import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const AppBar = ({ sidebarWidth, navBarHeight }) => {
  const { user, logout } = useAuth();

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sidebarWidth})`,
        left: 0,
        minWidth: '200px',
        ml: `${sidebarWidth}`,
        height: navBarHeight,
        backgroundColor: "white",
        boxShadow: "none",
      }} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex", alignContent: "right" } }}>
            {!!user && (
              <Button
                key={"logout"}
                onClick={logout}
                sx={{ my: 2, color: "black" }}
              >
                {"logout"}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};

export default AppBar;
