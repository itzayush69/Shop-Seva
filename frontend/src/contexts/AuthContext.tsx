import React, { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; role?: "customer" | "shopkeeper" }>;
  signup: (
    name: string,
    email: string,
    password: string,
    role: "customer" | "shopkeeper"
  ) => Promise<{ success: boolean, role?: "customer" | "shopkeeper" }>;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const isAuthenticated = user !== null;

  const login = async (email: string, password: string) => {
    try {
      const payload = { email, password };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signin`,
        payload
      );

      if (response.data.message === "Invalid password") {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid password",
        });
        return { success: false };
      }

      if (response.data.message === "User not found") {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "User not found",
        });
        return { success: false };
      }

      const loggedInUser: User = {
        name: response.data.name,
        email: email,
        password: password,
      };

      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });

      const role: "customer" | "shopkeeper" =
        response.data.role === "USER" ? "customer" : "shopkeeper";
      return { success: true, role };
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description:
          error.response?.data?.message ||
          "Please check your credentials and try again",
      });
      return { success: false };
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: "customer" | "shopkeeper"
  ) => {
    try {
      const payload = {
        name,
        email,
        password,
        role: role === "customer" ? "USER" : "SELLER",
      };
      const endpoint =
        role === "customer" ? "/auth/signup/user" : "/auth/signup/seller";

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        payload
      );
      // if user already exists
      if (response.data.message === "User already exists") {
        toast({
          variant: "destructive",
          title: "Signup failed",
          description: "User already exists",
        });
        return;
      }

      const newUser: User = {
        name: name,
        email: email,
        password: password,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      toast({
        title: "Signup successful",
        description: "Welcome to ShopSeva!",
      });

      return { success: true, role };
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description:
          error.response?.data?.message ||
          "Please check your information and try again",
      });
      return { success: false };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
