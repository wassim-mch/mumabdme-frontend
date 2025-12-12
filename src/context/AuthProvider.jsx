<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useState} from "react";
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
<<<<<<< HEAD

  const login = (userToken) => {
    setToken(userToken);
=======
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);

    localStorage.setItem("user", JSON.stringify(userData));
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
    localStorage.setItem("token", userToken);
  };

  const logout = () => {
<<<<<<< HEAD
    setToken(null);
=======
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
    localStorage.removeItem("token");
  };

  return (
<<<<<<< HEAD
    <AuthContext.Provider value={{ token, login, logout }}>
=======
    <AuthContext.Provider value={{ user, token, login, logout }}>
>>>>>>> f29fa4c7497703f04fef1cb8e9bad254768fc4b4
      {children}
    </AuthContext.Provider>
  );
};
