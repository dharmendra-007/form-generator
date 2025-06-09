"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  userId: string;
  userName: string;
  userEmail: string;
  userAvtar: string;
  userRole: string;
}

interface AuthResponse {
  message: string;
  token: string;
  user?: User;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (e.g., check localStorage or session)
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (data: AuthResponse) => {
    console.log("Login called with data:", data);

    if (!data.token) {
      console.error("No token received in login data");
      return;
    }

    // Set token in both localStorage and cookies
    setToken(data.token);
    localStorage.setItem("token", data.token);

    if (data.user) {
      console.log("Setting user data:", data.user);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    setIsAuthenticated(true);
    console.log("Redirecting to home page...");

    // Redirect to the main home page
    router.push("/");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
