import React from 'react';
import { useNavigate } from 'react-router-dom';
import { syncUser } from './syncUser';
const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = syncUser();
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = (user) => {
    setUser(user);
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
