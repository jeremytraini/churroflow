import { Link, Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AppBar from "../components/AppBar";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";

const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const sidebarWidth = "260px";
  const navBarHeight = "70px";

  return (
    <>
      <AppBar
        sidebarWidth={sidebarWidth}
        navBarHeight={navBarHeight}
      />
      <Navbar drawerWidth={sidebarWidth}  />
      <Box sx={{
        marginLeft: sidebarWidth,
        marginTop: navBarHeight,
        height: `calc(100vh - ${navBarHeight})`,
        width: `calc(100% - ${sidebarWidth})`,
      }}>
        {outlet}
      </Box>
    </>
  );
};

export default ProtectedLayout;
