import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import WarehousePlanning from './pages/WarehousePlanning';
import WarehouseAnalytics from './pages/WarehouseAnalytics';
import InventoryActions from './pages/InventoryActions';
import InvoiceDataManager from './pages/InvoiceDataManager';
import ProtectedLayout from "./layouts/ProtectedLayout";
import PublicLayout from "./layouts/PublicLayout";
import { Helmet } from 'react-helmet';
import Upgrade from './pages/Upgrade';
import Validator from './pages/Validator';
import Welcome from './pages/Welcome';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />

      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/warehouse-planning" element={<WarehousePlanning />} />
        <Route path="/warehouse-analytics/:lat?/:long?" element={<WarehouseAnalytics />} />
        <Route path="/inventory-actions" element={<InventoryActions />} />
        <Route path="/invoice-data-manager" element={<InvoiceDataManager />} />
        <Route path="/invoice-validator/:invoiceId" element={<Validator />} />
        <Route path="/upgrade-account" element={<Upgrade />} />
      </Route>
    </Routes>
  )
}

export default App;
