import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: "customer" | "shopkeeper") => Promise<boolean>;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  const isAuthenticated = user !== null;
  
  // Mock login function remains unchanged for now.
  const login = async (email: string, password: string) => {
    try {
      if (email && password.length >= 6) {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const loggedInUser = {
          id: '1',
          name: email.split('@')[0],
          email: email
        };
        
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        
        return true;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again",
      });
      return false;
    }
  };

  // Updated signup function that makes an API call to /auth/signup.
  const signup = async (name: string, email: string, password: string, role: "customer" | "shopkeeper") => {
    try {
      // Construct the payload.
      const payload = {
        name,
        email,
        password,
        role: role === "customer" ? "USER" : "SELLER",
      };
      // Make POST request to the backend.
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup/user`,
        payload
      );
      
      // Assuming the backend returns an object with userId.
      const newUser: User = {
        id: response.data.userId.toString(),
        name: name,
        email: email,
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: "Signup successful",
        description: "Welcome to ShopSeva!",
      });
      
      return true;
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error.response?.data?.message || "Please check your information and try again",
      });
      return false;
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };
  
  // Check for stored user on load.
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
