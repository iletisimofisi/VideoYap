interface SocialLoginButtonProps {
  provider: string;
  onClick: () => void;
  className?: string;
  icon: string;
}

export function SocialLoginButton({ provider, onClick, className, icon }: SocialLoginButtonProps) {
  return (
    <button 
      className={`social-btn flex items-center justify-center w-full text-white py-3 px-4 rounded-lg transition-transform hover:-translate-y-1 ${className}`}
      onClick={onClick}
      type="button"
    >
      <img src={icon} alt={provider} className="w-5 h-5 mr-3" />
      {provider} ile giriş yap
    </button>
  );
}
