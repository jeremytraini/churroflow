import { Link, Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AppBar from "../components/AppBar";
import Navbar from "../components/Navbar";

const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const sidebarWidth = "260";
  const navBarHeight = "70";

  return (
    <div>
      <AppBar
        sidebarWidth={sidebarWidth}
        navBarHeight={navBarHeight}
      />
      <Navbar drawerWidth={sidebarWidth}  />
      <div style={{ marginLeft: sidebarWidth, marginTop: "80px" }}>
        {outlet}
      </div>
    </div>
  );
};

export default ProtectedLayout;
