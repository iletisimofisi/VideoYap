import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useModal } from "@/context/ModalContext";
import { useAuth } from "@/context/AuthContext";
import { SocialLoginButton } from "@/components/ui/SocialLoginButton";
import { useToast } from "@/hooks/use-toast";
import { X, AlertCircle } from "lucide-react";

export function LoginModal() {
  const { closeLoginModal, openTermsModal } = useModal();
  const { login, socialLogin } = useAuth();
  const { toast } = useToast();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    // Herhangi bir form elemanı değiştiğinde hatayı temizle
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      // For sign up, show terms of service first
      openTermsModal();
    } else {
      try {
        setIsLoading(true);
        setError("");
        // For login, attempt to login directly
        await login(formData.email, formData.password);
        closeLoginModal();
        toast({
          title: "Giriş başarılı",
          description: "Hoş geldiniz!",
        });
      } catch (error) {
        setError("E-posta veya şifre hatalı. Lütfen tekrar deneyin.");
        toast({
          title: "Giriş başarısız",
          description: "E-posta veya şifre hatalı.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      setIsLoading(true);
      setError("");
      // Firebase ile sosyal giriş yap
      await socialLogin(provider);
      closeLoginModal();
    } catch (error) {
      setError(`${provider} ile giriş yapılamadı. Lütfen tekrar deneyin.`);
      toast({
        title: "Giriş başarısız",
        description: `${provider} ile giriş yapılamadı.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-darkSurface rounded-lg max-w-md w-full p-6 shadow-xl animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-lightText">
            {isSignUp ? "Ücretsiz Hesap Oluşturun" : "Hesabınıza Giriş Yapın"}
          </h2>
          <button 
            onClick={closeLoginModal} 
            className="text-mediumText hover:text-lightText transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-900 rounded-md flex items-start space-x-2 text-red-200">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        <div className="space-y-3 mb-6">
          <SocialLoginButton 
            provider="Google" 
            onClick={() => handleSocialLogin("Google")}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
            icon="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
          <SocialLoginButton 
            provider="Facebook" 
            onClick={() => handleSocialLogin("Facebook")}
            className="bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-white border border-[#1877F2]/30"
            icon="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
          />
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-darkBorder"></div>
            <span className="mx-4 text-mediumText text-sm">veya e-posta ile devam et</span>
            <div className="flex-grow border-t border-darkBorder"></div>
          </div>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email" className="block text-mediumText mb-1">E-posta</Label>
            <Input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="ornek@email.com"
              className="w-full px-4 py-3 rounded-lg bg-darkBg border border-darkBorder text-lightText focus-visible:ring-primary focus-visible:border-primary"
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-mediumText mb-1">Şifre</Label>
            <Input 
              type="password" 
              id="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-darkBg border border-darkBorder text-lightText focus-visible:ring-primary focus-visible:border-primary"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Checkbox 
                id="rememberMe" 
                name="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => 
                  setFormData({...formData, rememberMe: checked as boolean})
                }
                disabled={isLoading}
                className="w-4 h-4 text-primary border-darkBorder"
              />
              <Label htmlFor="rememberMe" className="ml-2 text-mediumText text-sm">Beni hatırla</Label>
            </div>
            <a href="#" className="text-primary hover:underline text-sm">Şifremi unuttum</a>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium shadow-none hover:shadow-[0_0_15px_rgba(156,39,176,0.5)] transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isSignUp ? "Kaydolunuyor..." : "Giriş Yapılıyor..."}
              </span>
            ) : (
              <span>{isSignUp ? "Kaydol" : "Giriş Yap"}</span>
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          {isSignUp ? (
            <p className="text-mediumText text-sm">
              Zaten hesabınız var mı? 
              <button 
                onClick={() => {
                  setIsSignUp(false);
                  setError("");
                }} 
                className="text-primary hover:underline ml-1 font-medium"
                disabled={isLoading}
              >
                Giriş Yapın
              </button>
            </p>
          ) : (
            <p className="text-mediumText text-sm">
              Hesabınız yok mu? 
              <button 
                onClick={() => {
                  setIsSignUp(true);
                  setError("");
                }} 
                className="text-primary hover:underline ml-1 font-medium"
                disabled={isLoading}
              >
                Ücretsiz Kaydolun
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
