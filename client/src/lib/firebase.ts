import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  signInWithRedirect, 
  getRedirectResult 
} from "firebase/auth";

// Firebase yapılandırması ve daha detaylı günlükleme
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Yapılandırmayı günlüğe kaydet (API anahtarını gizleyerek)
console.log('Firebase yapılandırması:', {
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  apiKeyExists: !!firebaseConfig.apiKey,
  appIdExists: !!firebaseConfig.appId
});

// Firebase uygulamasını başlat
let firebaseApp;

try {
  firebaseApp = initializeApp(firebaseConfig);
  console.log('Firebase başlatıldı:', firebaseApp.name);
} catch (error) {
  console.error('Firebase başlatma hatası:', error);
  throw error;
}

// Kimlik doğrulama hizmetini al
export const auth = getAuth(firebaseApp);

// Sağlayıcıları hazırla
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Yönlendirme sonucunu işleyen fonksiyon
export const handleRedirectResult = async () => {
  try {
    // Yönlendirme sonucunu kontrol et
    const result = await getRedirectResult(auth);
    
    if (result) {
      // Başarılı giriş
      return {
        user: result.user,
        success: true
      };
    }
    
    // Henüz bir yönlendirme sonucu yok
    return { 
      user: null, 
      success: false, 
      pending: true 
    };
  } catch (error) {
    console.error("Yönlendirme sonucu işlenirken hata oluştu:", error);
    return {
      user: null,
      success: false,
      error,
      pending: false
    };
  }
};

// Redirect ile sosyal giriş için fonksiyonlar
export const signInWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
    return { success: true, pending: true };
  } catch (error) {
    console.error("Google ile giriş yaparken hata oluştu:", error);
    return {
      success: false,
      error,
      pending: false
    };
  }
};

export const signInWithFacebook = async () => {
  try {
    await signInWithRedirect(auth, facebookProvider);
    return { success: true, pending: true };
  } catch (error) {
    console.error("Facebook ile giriş yaparken hata oluştu:", error);
    return {
      success: false,
      error,
      pending: false
    };
  }
};

// Firebase oturumunu sonlandır
export const signOut = async () => {
  try {
    await auth.signOut();
    return { success: true };
  } catch (error) {
    console.error("Çıkış yaparken hata oluştu:", error);
    return { success: false, error };
  }
};