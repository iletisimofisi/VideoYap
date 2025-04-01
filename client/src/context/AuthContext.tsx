import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { 
  auth, 
  signInWithGoogle, 
  signInWithFacebook, 
  signOut as firebaseSignOut,
  handleRedirectResult
} from "@/lib/firebase";
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
  isAuthLoading: boolean;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: async () => {},
  logout: async () => {},
  registerUser: async () => {},
  socialLogin: async () => {},
  isAuthLoading: false,
});

// Hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
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

  // Yönlendirme sonucunu kontrol et (sayfa yüklendiğinde)
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        setIsAuthLoading(true);
        const result = await handleRedirectResult();
        
        if (result.success && 'user' in result && result.user) {
          // Toast mesajını göster
          toast({
            title: 'Giriş başarılı',
            description: `Sosyal hesabınızla başarıyla giriş yaptınız.`,
          });
        }
      } catch (error) {
        console.error('Redirect result error:', error);
      } finally {
        setIsAuthLoading(false);
      }
    };
    
    checkRedirectResult();
  }, [toast]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsAuthLoading(true);
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
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsAuthLoading(true);
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
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Register function
  const registerUser = async (username?: string, email?: string) => {
    // In a real app, this would take registration data
    try {
      setIsAuthLoading(true);
      // Örnek kullanıcı - varsayılan değerler
      const mockUser = {
        id: Date.now(), // Benzersiz bir ID
        username: username || "misafir_kullanici",
        points: 50,
        plan: "free" as const
      };
      
      // API çağrısını simüle et
      // const response = await apiRequest('POST', '/api/auth/register', registrationData);
      // const userData = await response.json();
      
      setUser(mockUser);
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      // Yeni sorguları geçersiz kıl - kullanıcı verileri değişti
      queryClient.invalidateQueries({ queryKey: ['/api/videos'] });
      queryClient.invalidateQueries({ queryKey: ['/api/daily-points'] });
      
      toast({
        title: 'Kayıt başarılı',
        description: 'Hesabınız başarıyla oluşturuldu. Hoş geldiniz!',
      });
    } catch (error) {
      console.error('Registration failed', error);
      toast({
        title: 'Kayıt başarısız',
        description: 'Kayıt olurken bir hata oluştu.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  };
  
  // Firebase ile sosyal medya girişi (yönlendirmeli)
  const socialLogin = async (provider: string) => {
    try {
      setIsAuthLoading(true);
      
      // Bildirim göster
      toast({
        title: 'Yönlendiriliyor',
        description: `${provider} ile giriş için yönlendiriliyor...`,
      });
      
      let result;
      
      if (provider === "Google") {
        result = await signInWithGoogle();
      } else if (provider === "Facebook") {
        result = await signInWithFacebook();
      } else {
        throw new Error(`${provider} kimlik doğrulama sağlayıcısı desteklenmiyor.`);
      }
      
      // Yönlendirme yapılıyor, sonuç yönlendirme sonrası alınacak
      if (!result.success && !result.pending) {
        throw new Error(`${provider} ile giriş başlatılamadı.`);
      }
      
      // Önemli: Yönlendirme durumunda bile yükleme durumunu kapatalım
      // çünkü yönlendirme sonrası sayfanın yeniden yüklenmesi muhtemel
      setIsAuthLoading(false);
      
      // Burada return kullanmaya gerek yok çünkü kullanıcı yönlendiriliyor
    } catch (error) {
      console.error(`${provider} login failed`, error);
      setIsAuthLoading(false);
      
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
    isAuthLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
