import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { auth, googleProvider, facebookProvider, handleRedirectResult } from "@/lib/firebase";
import { onAuthStateChanged, signInWithRedirect } from "firebase/auth";

export default function TestFirebasePage() {
  const [firebaseStatus, setFirebaseStatus] = useState("Firebase durumu kontrol ediliyor...");
  const [apiKeyStatus, setApiKeyStatus] = useState("API Anahtarı kontrol ediliyor...");
  const [authStatus, setAuthStatus] = useState("Kimlik doğrulama durumu kontrol ediliyor...");
  const [redirectStatus, setRedirectStatus] = useState("Yönlendirme sonucu bekleniyor...");
  const [error, setError] = useState<string | null>(null);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  
  const addLog = (message: string) => {
    setDebugLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };
  
  // Yönlendirme sonucunu kontrol et
  useEffect(() => {
    async function checkRedirect() {
      try {
        addLog("Yönlendirme sonucu kontrol ediliyor...");
        const result = await handleRedirectResult();
        addLog(`Yönlendirme sonucu: ${JSON.stringify(result)}`);
        
        if (result.success && result.user) {
          setRedirectStatus(`Başarılı giriş: ${result.user.displayName || result.user.email} ✅`);
        } else if (result.error && typeof result.error === 'object' && 'message' in result.error) {
          setRedirectStatus(`Yönlendirme hatası: ${result.error.message} ❌`);
        } else if (result.pending) {
          setRedirectStatus("Yönlendirme sonucu bekleniyor (henüz bir sonuç yok) ⌛");
        } else {
          setRedirectStatus("Giriş yapılmadı ⚠️");
        }
      } catch (err) {
        addLog(`Yönlendirme hatası: ${err instanceof Error ? err.message : String(err)}`);
        setRedirectStatus(`Yönlendirme sırasında hata oluştu ❌`);
      }
    }
    
    checkRedirect();
  }, []);
  
  // Firebase ve kimlik doğrulama durumunu kontrol et
  useEffect(() => {
    // Firebase durumunu kontrol et
    if (auth) {
      setFirebaseStatus("Firebase başarıyla yüklendi ✅");
      addLog("Firebase başarıyla yüklendi");
    } else {
      setFirebaseStatus("Firebase yüklenemedi ❌");
      addLog("Firebase yüklenemedi");
    }
    
    // API anahtarını kontrol et
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    if (apiKey) {
      setApiKeyStatus(`API Anahtarı mevcut (${apiKey.substring(0, 5)}...) ✅`);
      addLog("API Anahtarı mevcut");
    } else {
      setApiKeyStatus("API Anahtarı bulunamadı ❌");
      addLog("API Anahtarı bulunamadı - VITE_FIREBASE_API_KEY eksik");
    }
    
    // Auth state değişikliklerini dinle
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthStatus(`Giriş yapıldı: ${user.displayName || user.email} ✅`);
        addLog(`Oturum açıldı: ${user.displayName || user.email}`);
      } else {
        setAuthStatus("Giriş yapılmadı ⚠️");
        addLog("Oturum açılmadı");
      }
    });
    
    // Component unmount olduğunda listener'ı temizle
    return () => unsubscribe();
  }, []);
  
  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      addLog("Google ile giriş başlatılıyor...");
      console.log("Google ile giriş başlatılıyor...");
      
      // Debug için önemli bilgileri göster
      console.log("Auth nesnesi mevcut:", !!auth, "Google Provider mevcut:", !!googleProvider);
      
      // Doğrudan Firebase signInWithRedirect kullanarak giriş yap
      try {
        await signInWithRedirect(auth, googleProvider);
        addLog("Google yönlendirmesi başlatıldı");
      } catch (innerErr) {
        console.error("Google ile giriş hatası:", innerErr);
        addLog(`Google yönlendirme hatası: ${innerErr instanceof Error ? innerErr.message : String(innerErr)}`);
        setError(innerErr instanceof Error ? innerErr.message : String(innerErr));
      }
    } catch (err) {
      console.error("Google ile giriş hatası (dış try-catch):", err);
      addLog(`Google giriş exception (dış): ${err instanceof Error ? err.message : String(err)}`);
      setError(err instanceof Error ? err.message : String(err));
    }
  };
  
  const handleFacebookSignIn = async () => {
    try {
      setError(null);
      addLog("Facebook ile giriş başlatılıyor...");
      console.log("Facebook ile giriş başlatılıyor...");
      
      // Debug için önemli bilgileri göster
      console.log("Auth nesnesi mevcut:", !!auth, "Facebook Provider mevcut:", !!facebookProvider);
      
      // Doğrudan Firebase signInWithRedirect kullanarak giriş yap
      try {
        await signInWithRedirect(auth, facebookProvider);
        addLog("Facebook yönlendirmesi başlatıldı");
      } catch (innerErr) {
        console.error("Facebook ile giriş hatası:", innerErr);
        addLog(`Facebook yönlendirme hatası: ${innerErr instanceof Error ? innerErr.message : String(innerErr)}`);
        setError(innerErr instanceof Error ? innerErr.message : String(innerErr));
      }
    } catch (err) {
      console.error("Facebook ile giriş hatası (dış try-catch):", err);
      addLog(`Facebook giriş exception (dış): ${err instanceof Error ? err.message : String(err)}`);
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
          <div className="p-3 bg-darkBg rounded">
            <p>{authStatus}</p>
          </div>
          <div className="p-3 bg-darkBg rounded">
            <p>{redirectStatus}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-darkSurface p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Giriş Testleri</h2>
        <div className="flex flex-col space-y-4">
          <Button 
            onClick={handleGoogleSignIn}
            className="bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3">
              <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
              <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
              <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
              <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
            </svg>
            Google ile Giriş Yap
          </Button>
          
          <Button 
            onClick={handleFacebookSignIn}
            className="bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-white flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
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
        <h2 className="text-xl font-semibold mb-4">Hata Ayıklama Günlükleri</h2>
        <p className="text-mediumText mb-2">Sayfa yüklendiğinden beri kaydedilen günlükler:</p>
        <div className="p-3 bg-black/50 rounded max-h-60 overflow-y-auto">
          {debugLogs.length > 0 ? (
            <div className="space-y-1">
              {debugLogs.map((log, index) => (
                <p key={index} className="text-xs text-green-400 font-mono">
                  {log}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-xs text-yellow-400 font-mono">
              Henüz günlük kaydı yok
            </p>
          )}
        </div>
        
        <div className="mt-4">
          <p className="text-mediumText mb-2">Browser konsolunda daha fazla detay:</p>
          <div className="p-3 bg-darkBg rounded">
            <p className="text-xs text-yellow-400 font-mono">
              Daha fazla detay için tarayıcı konsolunuzu açın (F12 tuşu) ve günlükleri inceleyin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}