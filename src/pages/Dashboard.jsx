import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { BasicPage } from "./BasicPage";
import Home from "@mui/icons-material/Home";

const Dashboard = () => {
  const { user } = useAuth();

  return (
  <BasicPage title="Dashboard" icon={<Home />}>
    <div>
      <h1>Dashboard1</h1>
    </div>
    {user && <p>Welcome, {user.name}!</p>}
  </BasicPage>
  );
};

export default Dashboard;

