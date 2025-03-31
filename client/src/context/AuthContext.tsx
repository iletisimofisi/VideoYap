import React, { createContext, useContext, useState, ReactNode } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";

// Define the shape of our auth context
type User = {
  id: number;
  username: string;
  points: number;
  plan: "free" | "basic" | "premium";
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  registerUser: () => Promise<void>;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: async () => {},
  logout: async () => {},
  registerUser: async () => {},
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Check if the user is already logged in
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to check authentication status', error);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await apiRequest('POST', '/api/auth/login', { email, password });
      const userData = await response.json();
      setUser(userData);
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    } catch (error) {
      console.error('Login failed', error);
      toast({
        title: 'Giriş başarısız',
        description: 'E-posta veya şifre hatalı.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await apiRequest('POST', '/api/auth/logout', {});
      setUser(null);
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      toast({
        title: 'Çıkış başarılı',
        description: 'Güvenli bir şekilde çıkış yaptınız.',
      });
    } catch (error) {
      console.error('Logout failed', error);
      toast({
        title: 'Çıkış başarısız',
        description: 'Çıkış yaparken bir hata oluştu.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Register function
  const registerUser = async () => {
    // In a real app, this would take registration data
    try {
      const mockUser = {
        id: 1,
        username: "yeni_kullanici",
        points: 10,
        plan: "free" as const
      };
      
      // Simulate API call
      // const response = await apiRequest('POST', '/api/auth/register', registrationData);
      // const userData = await response.json();
      
      setUser(mockUser);
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    } catch (error) {
      console.error('Registration failed', error);
      toast({
        title: 'Kayıt başarısız',
        description: 'Kayıt olurken bir hata oluştu.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const value = {
    isLoggedIn: !!user,
    user,
    login,
    logout,
    registerUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
