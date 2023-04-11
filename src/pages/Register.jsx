import React from 'react';
import { useAuth } from '../hooks/useAuth';
import APIService from '../APIService';

function Register ({ onSuccess }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const { login } = useAuth();

  async function registerUser () {
    const response = await APIService.registerUser(email, password);
    login(response.data.token);
  }

  return (
    <>
      Email: <input value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      Password: <input value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      Name: <input value={name} onChange={(e) => setName(e.target.value)} /><br />
      <button onClick={registerUser}>Sign up</button>
    </>
  )
}

export default Register;
