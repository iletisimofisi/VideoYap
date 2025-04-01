import { SiGoogle, SiFacebook, SiGithub } from "react-icons/si";

interface SocialLoginButtonProps {
  provider: string;
  onClick: () => void;
  className?: string;
  icon?: string;
  disabled?: boolean;
}

export function SocialLoginButton({ provider, onClick, className, icon, disabled = false }: SocialLoginButtonProps) {
  // İkon bileşenini seç
  const getIcon = () => {
    if (icon) {
      return <img src={icon} alt={provider} className="w-5 h-5 mr-3" />;
    }
    
    switch (provider) {
      case 'Google':
        return <SiGoogle className="w-5 h-5 mr-3" />;
      case 'Facebook':
        return <SiFacebook className="w-5 h-5 mr-3" />;
      // Şimdilik Twitter ikonu kullanmıyoruz
      case 'Twitter':
        return <div className="w-5 h-5 mr-3" />;
      case 'GitHub':
        return <SiGithub className="w-5 h-5 mr-3" />;
      default:
        return null;
    }
  };

  return (
    <button 
      className={`social-btn flex items-center justify-center w-full py-3 px-4 rounded-lg transition-all ${className} ${disabled ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(156,39,176,0.4)]'}`}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {disabled ? (
        <svg className="animate-spin w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        getIcon()
      )}
      {provider} ile {disabled ? 'giriş yapılıyor...' : 'giriş yap'}
    </button>
  );
}
