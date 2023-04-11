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

  const sidebarWidth = "250px";

  return (
    <div>
      <AppBar
        position="fixed"
        pages={[
          { label: "Settings", path: "settings" },
          { label: "Profile", path: "profile" }
        ]}
        sx={{ width: `calc(100% - ${sidebarWidth}px)`, left: 0, minWidth: '200px', ml: `${sidebarWidth}px`, height: '60px' }}
      />
      <Navbar drawerWidth={sidebarWidth} />
      {outlet}
    </div>
  );
};

export default ProtectedLayout;
