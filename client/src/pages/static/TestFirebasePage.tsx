import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { auth, signInWithGoogle, signInWithFacebook } from "@/lib/firebase";

export default function TestFirebasePage() {
  const [firebaseStatus, setFirebaseStatus] = useState("Firebase durumu kontrol ediliyor...");
  const [apiKeyStatus, setApiKeyStatus] = useState("API Anahtarı kontrol ediliyor...");
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Firebase durumunu kontrol et
    if (auth) {
      setFirebaseStatus("Firebase başarıyla yüklendi ✅");
    } else {
      setFirebaseStatus("Firebase yüklenemedi ❌");
    }
    
    // API anahtarını kontrol et
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    if (apiKey) {
      setApiKeyStatus(`API Anahtarı mevcut (${apiKey.substring(0, 5)}...) ✅`);
    } else {
      setApiKeyStatus("API Anahtarı bulunamadı ❌");
    }
  }, []);
  
  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      console.log("Google ile giriş başlatılıyor...");
      const result = await signInWithGoogle();
      console.log("Google giriş işlemi sonucu:", result);
    } catch (err) {
      console.error("Google ile giriş hatası:", err);
      setError(err instanceof Error ? err.message : String(err));
    }
  };
  
  const handleFacebookSignIn = async () => {
    try {
      setError(null);
      console.log("Facebook ile giriş başlatılıyor...");
      const result = await signInWithFacebook();
      console.log("Facebook giriş işlemi sonucu:", result);
    } catch (err) {
      console.error("Facebook ile giriş hatası:", err);
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Firebase Test Sayfası</h1>
      
      <div className="bg-darkSurface p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Firebase Durumu</h2>
        <div className="space-y-4">
          <div className="p-3 bg-darkBg rounded">
            <p>{firebaseStatus}</p>
          </div>
          <div className="p-3 bg-darkBg rounded">
            <p>{apiKeyStatus}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-darkSurface p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Giriş Testleri</h2>
        <div className="flex flex-col space-y-4">
          <Button 
            onClick={handleGoogleSignIn}
            className="bg-white/10 hover:bg-white/20 text-white"
          >
            Google ile Giriş Yap
          </Button>
          
          <Button 
            onClick={handleFacebookSignIn}
            className="bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-white"
          >
            Facebook ile Giriş Yap
          </Button>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-900 rounded-md">
            <p className="text-red-200">{error}</p>
          </div>
        )}
      </div>
      
      <div className="bg-darkSurface p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Konsol Günlükleri</h2>
        <p className="text-mediumText mb-2">Hata ayıklama için tarayıcı konsolunuzu açın (F12 tuşu)</p>
        <div className="p-3 bg-darkBg rounded">
          <p className="text-xs text-yellow-400 font-mono">
            Giriş yapmak için yukarıdaki düğmelere tıklayın ve konsol çıktılarını izleyin.
          </p>
        </div>
      </div>
    </div>
  );
}