import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userSignedIn, setUserSignedIn] = useState(false);

  const signIn = () => {
    setUserSignedIn(true);
  };

  const signOut = () => {
    setUserSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ userSignedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
