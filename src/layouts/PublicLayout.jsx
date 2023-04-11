import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AppBar from "../components/AppBar";

const PublicLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      {outlet}
    </>
  );
};

export default PublicLayout;
