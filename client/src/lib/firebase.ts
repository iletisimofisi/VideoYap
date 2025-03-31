import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Kimlik doğrulama hizmetini al
export const auth = getAuth(app);

// Sağlayıcıları hazırla
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Popupla sosyal giriş için fonksiyon
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return {
      user: result.user,
      success: true
    };
  } catch (error) {
    console.error("Google ile giriş yaparken hata oluştu:", error);
    return {
      user: null,
      success: false,
      error
    };
  }
};

export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return {
      user: result.user,
      success: true
    };
  } catch (error) {
    console.error("Facebook ile giriş yaparken hata oluştu:", error);
    return {
      user: null,
      success: false,
      error
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