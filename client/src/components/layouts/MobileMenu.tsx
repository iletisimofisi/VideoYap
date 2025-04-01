import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import { Film, User } from "lucide-react";

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const { isLoggedIn, user } = useAuth();
  const { openLoginModal } = useModal();
  const [, navigate] = useLocation();
  
  const isAdmin = isLoggedIn && user?.plan === 'premium';

  const handleLoginClick = () => {
    onClose();
    openLoginModal();
  };
  
  const handleProfileClick = () => {
    onClose();
    navigate("/profile");
  };

  return (
    <div className="md:hidden px-4 py-3 bg-darkSurface border-t border-darkBorder">
      <nav className="flex flex-col space-y-4">
        <Link href="/" onClick={onClose} className="hover:text-primary transition-colors text-lightText">
          Ana Sayfa
        </Link>
        <Link href="/#how-it-works" onClick={onClose} className="hover:text-primary transition-colors text-lightText">
          Nasıl Çalışır?
        </Link>
        <Link href="/#examples" onClick={onClose} className="hover:text-primary transition-colors text-lightText">
          Örnekler
        </Link>
        <Link href="/yardim" onClick={onClose} className="hover:text-primary transition-colors text-lightText">
          Yardım
        </Link>
        <Link href="/hakkimizda" onClick={onClose} className="hover:text-primary transition-colors text-lightText">
          Hakkımızda
        </Link>
        <Link href="/iletisim" onClick={onClose} className="hover:text-primary transition-colors text-lightText">
          İletişim
        </Link>
        {isLoggedIn ? (
          <>
            <Link 
              href="/videos" 
              onClick={onClose} 
              className="hover:text-primary transition-colors text-lightText flex items-center"
            >
              <Film className="w-5 h-5 mr-2" />
              Videolarım
            </Link>
            
            {isAdmin && (
              <Link 
                href="/admin" 
                onClick={onClose} 
                className="hover:text-primary transition-colors text-lightText flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                Yönetim
              </Link>
            )}
            
            <Button
              className="bg-primary hover:bg-opacity-90 text-white px-5 py-2 rounded-full font-medium transition-all w-full"
              onClick={handleProfileClick}
            >
              <User className="w-5 h-5 mr-2" />
              Hesabım
            </Button>
          </>
        ) : (
          <Button
            className="bg-primary hover:bg-opacity-90 text-white px-5 py-2 rounded-full font-medium transition-all w-full"
            onClick={handleLoginClick}
          >
            Giriş Yap
          </Button>
        )}
      </nav>
    </div>
  );
}
