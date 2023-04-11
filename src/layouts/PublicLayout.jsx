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
    <div>
      {outlet}
    </div>
  );
};

export default PublicLayout;
