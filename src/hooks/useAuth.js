import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SyncUser } from './SyncUser';
// import APIService from '../services/APIService';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = SyncUser(JSON.stringify({
    id: 1,
    name: 'John Doe',
    email: 'john@email.com',
    role: 'admin'
  }));
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  async function login (email, password) {
    // const user = await APIService.login(email, password);
    setUser(JSON.stringify({
      id: 1,
      name: 'John Doe',
      email: 'john@email.com',
      role: 'admin'
    }));
    navigate('/dashboard');
  };

  const register = (name, email, password) => {
    setUser(JSON.stringify({
      id: 1,
      name: 'John Doe',
      email: 'john@email.com',
      role: 'admin'
    }));
    navigate('/dashboard');
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate('/login', { replace: true });
  };

  const value = React.useMemo(
    () => ({
      user,
      register,
      login,
      logout
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
