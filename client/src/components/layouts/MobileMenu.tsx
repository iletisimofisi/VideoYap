import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const { isLoggedIn } = useAuth();
  const { openLoginModal } = useModal();

  const handleLoginClick = () => {
    onClose();
    openLoginModal();
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
        <Link href="/#faq" onClick={onClose} className="hover:text-primary transition-colors text-lightText">
          Yardım
        </Link>
        {isLoggedIn ? (
          <Button
            className="bg-primary hover:bg-opacity-90 text-white px-5 py-2 rounded-full font-medium transition-all w-full"
            onClick={onClose}
          >
            Hesabım
          </Button>
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
