<<<<<<< HEAD
import { createContext, useState } from "react";
=======

import { createContext, useState, useEffect } from "react";
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
<<<<<<< HEAD
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const login = (userToken) => {
    setToken(userToken);
    localStorage.setItem("token", userToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
=======
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser }}>
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
      {children}
    </AuthContext.Provider>
  );
};
<<<<<<< HEAD
=======

>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
