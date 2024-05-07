import React, { useState } from 'react';

const AuthContext = React.createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [loggedInUser, setLoggedInUser] = useState(user);

  const updateLoggedInUser = (user) => {
    setLoggedInUser(user);
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, updateLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};
