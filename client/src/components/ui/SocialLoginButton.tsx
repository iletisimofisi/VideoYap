interface SocialLoginButtonProps {
  provider: string;
  onClick: () => void;
  className?: string;
  icon: string;
  disabled?: boolean;
}

export function SocialLoginButton({ provider, onClick, className, icon, disabled = false }: SocialLoginButtonProps) {
  return (
    <button 
      className={`social-btn flex items-center justify-center w-full py-3 px-4 rounded-lg transition-all hover:shadow-lg ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1'}`}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      <img src={icon} alt={provider} className="w-5 h-5 mr-3" />
      {provider} ile {disabled ? 'giriş yapılıyor...' : 'giriş yap'}
    </button>
  );
}
