import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem("auth");
    return saved ? JSON.parse(saved) : { token: null, user: null };
  });

  const login = (token, user) => {
    const newAuth = { token, user };
    localStorage.setItem("auth", JSON.stringify(newAuth));
    setAuth(newAuth);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
