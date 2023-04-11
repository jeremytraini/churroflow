import React from 'react';
import { useAuth } from '../hooks/useAuth';
import APIService from '../APIService';

function Login ({ onSuccess }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { login } = useAuth();

  async function loginUser () {
    const response = await APIService.loginUser(email, password);
    login(response.data.token);
  }

  return (
    <>
      Email: <input value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      Password: <input value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={loginUser}>Sign in</button>
    </>
  )
}

export default Login;
