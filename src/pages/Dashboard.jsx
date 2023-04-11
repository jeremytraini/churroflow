import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { BasicPage } from "./BasicPage";
import Home from "@mui/icons-material/Home";

const Dashboard = () => {
  const { user } = useAuth();

  return (
  <BasicPage title="Dashboard">
    <div>
      {user && <p>Welcome, {user.name}!</p>}
    </div>
  </BasicPage>
  );
};

export default Dashboard;

