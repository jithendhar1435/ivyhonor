
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  email: string;
  subscription: 'free' | 'premium';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isPremium: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing auth session in localStorage
    const checkAuth = () => {
      const storedUser = localStorage.getItem('ivycraft_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Mock API call - In real app, this would validate with backend
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success - hardcoded for demo
      if (email === 'demo@example.com' && password === 'password') {
        const userData = {
          id: 'user-123',
          email: email,
          subscription: 'free' as const
        };
        setUser(userData);
        localStorage.setItem('ivycraft_user', JSON.stringify(userData));
        toast({
          title: "Login successful",
          description: "Welcome back to IvyCraft!",
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success
      const userData = {
        id: 'user-' + Math.floor(Math.random() * 1000),
        email: email,
        subscription: 'free' as const
      };
      setUser(userData);
      localStorage.setItem('ivycraft_user', JSON.stringify(userData));
      toast({
        title: "Account created",
        description: "Welcome to IvyCraft!",
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('ivycraft_user');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const isPremium = user?.subscription === 'premium';

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isPremium
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
