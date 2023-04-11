import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import WarehousePlanning from './pages/WarehousePlanning';
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import { PublicLayout } from "./layouts/PublicLayout";

function App () {
  return (
    <div className="App">
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/warehouse-planning" element={<WarehousePlanning />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
