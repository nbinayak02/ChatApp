import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface ContextType {
  token: string | null;
  login: (token: string, remember: boolean) => void;
  logout: () => void;
}
export const AuthContext = createContext<ContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  //get from local if remember_me else sessionstorage
  const [token, setToken] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  );

  //initialize when app loads
  useEffect(() => {
    //if token modified in local/session storage
    window.addEventListener("storage", handleStorage);

    //cleanup on unmount
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleStorage = () => {
    //set modified token - if user logouts, opts-out of saving credintials or delets then it will reflect change in token state
    setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
  };

  const login = (token: string, remember: boolean) => {
    if (remember) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }

    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setToken(null);
  };

  //make token and methods accessible to children components also enable chldren components to rendered

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("use auth must be used within auth provider");
  return context;
}
