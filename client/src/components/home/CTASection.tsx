import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import { Link } from "wouter";

export function CTASection() {
  const { isLoggedIn } = useAuth();
  const { openLoginModal } = useModal();

  const handleSignUpClick = () => {
    if (!isLoggedIn) {
      openLoginModal();
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary to-purple-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Metninizi Hemen Videoya Dönüştürün!</h2>
        <p className="text-xl text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
          Ücretsiz üye olun ve yapay zeka destekli video oluşturucumuzla yaratıcılığınızı keşfedin.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <Button
            className="bg-white text-primary hover:bg-opacity-90 px-8 py-3 rounded-full font-medium transition-all flex items-center justify-center mx-auto sm:mx-0 shadow-lg"
            onClick={handleSignUpClick}
          >
            <span className="material-icons mr-2">person_add</span>
            Ücretsiz Kaydol
          </Button>
          <Link href="/#how-it-works">
            <Button
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 rounded-full font-medium transition-all flex items-center justify-center mx-auto sm:mx-0"
            >
              <span className="material-icons mr-2">play_circle</span>
              Nasıl Çalışır
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
