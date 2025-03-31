import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import { MobileMenu } from "./MobileMenu";
import { NotificationsDropdown } from "./NotificationsDropdown";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const { openLoginModal } = useModal();
  const [, navigate] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-darkSurface shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="material-icons text-primary text-3xl">movie_filter</span>
          <h1 className="text-2xl font-bold text-primary">VideoYap</h1>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-lightText"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="material-icons">menu</span>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:text-primary transition-colors text-lightText font-medium">Ana Sayfa</Link>
          <Link href="/#how-it-works" className="hover:text-primary transition-colors text-lightText font-medium">Nasıl Çalışır?</Link>
          <Link href="/#examples" className="hover:text-primary transition-colors text-lightText font-medium">Örnekler</Link>
          <Link href="/#faq" className="hover:text-primary transition-colors text-lightText font-medium">Yardım</Link>
          <div className="flex items-center space-x-3">
            {isLoggedIn && <NotificationsDropdown />}
            
            {isLoggedIn ? (
              <div className="flex space-x-3">
                <Link href="/videos">
                  <Button
                    variant="ghost"
                    className="flex items-center text-mediumText hover:text-primary"
                  >
                    <span className="material-icons mr-1">movie</span>
                    <span className="hidden lg:inline">Videolarım</span>
                  </Button>
                </Link>
                
                <Button
                  className="bg-primary hover:bg-opacity-90 text-white px-5 py-2 rounded-full font-medium transition-all shadow-none hover:shadow-[0_0_15px_rgba(156,39,176,0.5)]"
                  onClick={() => navigate("/profile")}
                >
                  <span className="material-icons mr-1">person</span>
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
