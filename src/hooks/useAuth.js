import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SyncUser } from './SyncUser';
import getAPI from '../services/APIService';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = SyncUser(null);
  const navigate = useNavigate();
  const APIService = getAPI();

  const setPlan = (plan) => {
    setUser({...user, tier: plan});
  };

  // call this function when you want to authenticate the user
  const login = async (email, password) => {
    const user = await APIService.login(email, password);

    if (!user.data) {
      return;
    }

    setUser({
      id: 1,
      name: 'John Doe',
      email: email,
      tier: 'starter',
      token: user.data.token
    });

    navigate('/dashboard');
  };

  const register = async (name, email, password) => {
    const user = await APIService.register(name, email, password);

    if (!user.data) {
      return;
    }

    setUser({
      id: 1,
      name: name,
      email: email,
      tier: 'starter',
      token: user.data.token
    });

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
      logout,
      setPlan
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
