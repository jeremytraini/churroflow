import { useState } from 'react';

export const syncUser = () => {
  const [user, setStoredUser] = useState(() => {
    try {
      const user = window.localStorage.getItem('user');

      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  });

  const setUser = (newUser) => {
    try {
      if (newUser === null) {
        window.localStorage.removeItem('user');
      } else {
        window.localStorage.setItem('user', newUser);
      }
    } catch (err) {}
    setStoredUser(newUser);
  };

  return [user, setUser];
};
