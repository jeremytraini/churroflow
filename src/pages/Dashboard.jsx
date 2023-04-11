import React from 'react';
import { useAuth } from '../hooks/useAuth';
import APIService from '../APIService';

function Dashboard () {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}!</p>
    </div>
  )
}

export default Register;
