import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useModal } from "@/context/ModalContext";
import { useAuth } from "@/context/AuthContext";
import { SocialLoginButton } from "@/components/ui/SocialLoginButton";
import { useToast } from "@/hooks/use-toast";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      // For sign up, show terms of service first
      openTermsModal();
    } else {
      try {
        // For login, attempt to login directly
        await login(formData.email, formData.password);
        closeLoginModal();
        toast({
          title: "Giriş başarılı",
          description: "Hoş geldiniz!",
        });
      } catch (error) {
        toast({
          title: "Giriş başarısız",
          description: "E-posta veya şifre hatalı.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      // In a real app, this would authenticate with the provider
      await socialLogin(provider);
      closeLoginModal();
    } catch (error) {
      toast({
        title: "Giriş başarısız",
        description: "Sosyal giriş yapılamadı.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-darkSurface rounded-lg max-w-md w-full p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-lightText">
            {isSignUp ? "Ücretsiz Hesap Oluşturun" : "Hesabınıza Giriş Yapın"}
          </h2>
          <button 
            onClick={closeLoginModal} 
            className="text-mediumText hover:text-lightText"
            aria-label="Kapat"
          >
            <span className="material-icons">close</span>
          </button>
        </div>
        
        <div className="space-y-4 mb-6">
          <SocialLoginButton 
            provider="Google" 
            onClick={() => handleSocialLogin("Google")}
            className="bg-google"
            icon="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
          <SocialLoginButton 
            provider="Facebook" 
            onClick={() => handleSocialLogin("Facebook")}
            className="bg-facebook"
            icon="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
          />
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-darkBorder"></div>
            <span className="mx-4 text-mediumText">veya</span>
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
              className="w-full px-4 py-3 rounded-lg bg-darkBg border border-darkBorder text-lightText focus:border-primary focus:outline-none"
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
              className="w-full px-4 py-3 rounded-lg bg-darkBg border border-darkBorder text-lightText focus:border-primary focus:outline-none"
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
                className="w-4 h-4 accent-primary"
              />
              <Label htmlFor="rememberMe" className="ml-2 text-mediumText">Beni hatırla</Label>
            </div>
            <a href="#" className="text-primary hover:underline">Şifremi unuttum</a>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-opacity-90 text-white py-3 rounded-lg font-medium shadow-none hover:shadow-[0_0_15px_rgba(156,39,176,0.5)]"
          >
            {isSignUp ? "Kaydol" : "Giriş Yap"}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          {isSignUp ? (
            <p className="text-mediumText">
              Zaten hesabınız var mı? 
              <button onClick={() => setIsSignUp(false)} className="text-primary hover:underline ml-1">
                Giriş Yapın
              </button>
            </p>
          ) : (
            <p className="text-mediumText">
              Hesabınız yok mu? 
              <button onClick={() => setIsSignUp(true)} className="text-primary hover:underline ml-1">
                Ücretsiz Kaydol
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
