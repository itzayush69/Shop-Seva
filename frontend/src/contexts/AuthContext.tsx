
import React, { createContext, useState, useContext, ReactNode } from 'react';
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
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  const isAuthenticated = user !== null;
  
  // Mock login function for prototype
  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      if (email && password.length >= 6) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setUser({
          id: '1',
          name: email.split('@')[0],
          email: email
        });
        
        localStorage.setItem('user', JSON.stringify({
          id: '1',
          name: email.split('@')[0],
          email: email
        }));
        
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
  
  // Mock signup function for prototype
  const signup = async (name: string, email: string, password: string, ) => {
    try {
      // In a real app, this would be an API call
      if (name && email && password.length >= 6) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const newUser = {
          id: Math.random().toString(36).substring(2, 9),
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
      }
      throw new Error('Invalid signup data');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "Please check your information and try again",
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
  
  // Check for stored user on load
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
