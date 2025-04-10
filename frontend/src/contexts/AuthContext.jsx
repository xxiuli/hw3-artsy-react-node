import httpService from "../services/httpService"; 
import { createContext, useContext, useState,useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await httpService.get("/auth/profile"); // 后端返回当前用户信息
        setUser(res); // ✅ 重新设置 user
      } catch (err) {
        setUser(undefined);
      }
    };
  
    checkAuth();
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
