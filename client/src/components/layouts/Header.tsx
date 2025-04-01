import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import { MobileMenu } from "./MobileMenu";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { Film, User, Menu, Clapperboard } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();
  const { openLoginModal } = useModal();
  const [, navigate] = useLocation();
  
  const isAdmin = isLoggedIn && user?.plan === 'premium';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-darkSurface shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Clapperboard size={28} className="text-primary" />
          <h1 className="text-2xl font-bold text-primary">VideoYap</h1>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-lightText"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:text-primary transition-colors text-lightText font-medium">Ana Sayfa</Link>
          <Link href="/#how-it-works" className="hover:text-primary transition-colors text-lightText font-medium">Nasıl Çalışır?</Link>
          <Link href="/#examples" className="hover:text-primary transition-colors text-lightText font-medium">Örnekler</Link>
          <Link href="/yardim" className="hover:text-primary transition-colors text-lightText font-medium">Yardım</Link>
          <Link href="/hakkimizda" className="hover:text-primary transition-colors text-lightText font-medium">Hakkımızda</Link>
          <div className="flex items-center space-x-3">
            {isLoggedIn && <NotificationsDropdown />}
            
            {isLoggedIn ? (
              <div className="flex space-x-3">
                <Link href="/videos">
                  <Button
                    variant="ghost"
                    className="flex items-center text-mediumText hover:text-primary"
                  >
                    <Film className="w-5 h-5 mr-1" />
                    <span className="hidden lg:inline">Videolarım</span>
                  </Button>
                </Link>
                
                {isAdmin && (
                  <Link href="/admin">
                    <Button
                      variant="ghost"
                      className="flex items-center text-mediumText hover:text-primary"
                    >
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                      <span className="hidden lg:inline">Yönetim</span>
                    </Button>
                  </Link>
                )}
                
                <Button
                  className="bg-primary hover:bg-opacity-90 text-white px-5 py-2 rounded-full font-medium transition-all shadow-none hover:shadow-[0_0_15px_rgba(156,39,176,0.5)]"
                  onClick={() => navigate("/profile")}
                >
                  <User className="w-5 h-5 mr-1" />
                  <span className="hidden sm:inline">Hesabım</span>
                </Button>
              </div>
            ) : (
              <Button
                className="bg-primary hover:bg-opacity-90 text-white px-5 py-2 rounded-full font-medium transition-all shadow-none hover:shadow-[0_0_15px_rgba(156,39,176,0.5)]"
                onClick={openLoginModal}
              >
                Giriş Yap
              </Button>
            )}
          </div>
        </nav>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && <MobileMenu onClose={toggleMobileMenu} />}
    </header>
  );
}
