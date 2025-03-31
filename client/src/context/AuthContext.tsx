import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { auth, signInWithGoogle, signInWithFacebook, signOut as firebaseSignOut } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

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
  registerUser: (username?: string, email?: string) => Promise<void>;
  socialLogin: (provider: string) => Promise<void>;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: async () => {},
  logout: async () => {},
  registerUser: async () => {},
  socialLogin: async () => {},
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Firebase kimlik doğrulama durumunu dinle
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Kullanıcı oturum açmış
        const appUser: User = {
          id: Date.now(), // Gerçek bir uygulamada backend'den gelecek
          username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "firebase_kullanici",
          points: 75, // Varsayılan başlangıç puanı
          plan: "free" as const,
        };
        
        setUser(appUser);
        console.log("Firebase oturumu açık:", firebaseUser.displayName);
      } else {
        // Kullanıcı oturum açmamış
        setUser(null);
        console.log("Firebase oturumu kapalı");
      }
    });
    
    // Temizlik fonksiyonu
    return () => unsubscribe();
  }, []);
  
  // Backend ile oturum durumunu kontrol et (Firebase ile entegrasyon için kaldırıldı)
  /*
  useEffect(() => {
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
  */

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
      // Önce Firebase oturumunu sonlandır
      const firebaseResult = await firebaseSignOut();
      
      // Ardından backend oturumunu sonlandır (eğer kullanılıyorsa)
      // await apiRequest('POST', '/api/auth/logout', {});
      
      // Yerel kullanıcı durumunu sıfırla
      setUser(null);
      
      // Sorguları güncelle
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
  const registerUser = async (username?: string, email?: string) => {
    // In a real app, this would take registration data
    try {
      // Örnek kullanıcı - varsayılan değerler
      const mockUser = {
        id: Date.now(), // Benzersiz bir ID
        username: username || "misafir_kullanici",
        points: 50,
        plan: "free" as const
      };
      
      toast({
        title: 'Kayıt başarılı',
        description: 'Hesabınız başarıyla oluşturuldu. Hoş geldiniz!',
      });
      
      // API çağrısını simüle et
      // const response = await apiRequest('POST', '/api/auth/register', registrationData);
      // const userData = await response.json();
      
      setUser(mockUser);
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      // Yeni sorguları geçersiz kıl - kullanıcı verileri değişti
      queryClient.invalidateQueries({ queryKey: ['/api/videos'] });
      queryClient.invalidateQueries({ queryKey: ['/api/daily-points'] });
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
  
  // Firebase ile sosyal medya girişi
  const socialLogin = async (provider: string) => {
    try {
      toast({
        title: 'Giriş yapılıyor',
        description: `${provider} ile giriş yapılıyor...`,
      });
      
      let result;
      
      if (provider === "Google") {
        result = await signInWithGoogle();
      } else if (provider === "Facebook") {
        result = await signInWithFacebook();
      } else {
        throw new Error(`${provider} kimlik doğrulama sağlayıcısı desteklenmiyor.`);
      }
      
      if (result.success && result.user) {
        const firebaseUser = result.user;
        
        // Firebase kullanıcı bilgilerinden uygulama kullanıcı modeline dönüşüm
        const appUser: User = {
          id: Date.now(), // Gerçek bir uygulamada backend'den gelecek
          username: firebaseUser.displayName || `${provider.toLowerCase()}_kullanici`,
          points: 75, // Varsayılan başlangıç puanı
          plan: "free" as const,
        };
        
        // Kullanıcıyı güncelle
        setUser(appUser);
        
        // Sorguları güncelleyin
        queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
        queryClient.invalidateQueries({ queryKey: ['/api/videos'] });
        
        toast({
          title: 'Giriş başarılı',
          description: `${provider} hesabınızla başarıyla giriş yaptınız.`,
        });
      } else {
        throw new Error("Giriş başarısız oldu");
      }
    } catch (error) {
      console.error(`${provider} login failed`, error);
      toast({
        title: 'Giriş başarısız',
        description: `${provider} ile giriş yapılırken bir hata oluştu.`,
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
    socialLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
