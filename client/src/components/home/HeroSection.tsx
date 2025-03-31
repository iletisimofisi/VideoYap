import { Button } from "@/components/ui/button";
import { useModal } from "@/context/ModalContext";
import { Link } from "wouter";

export function HeroSection() {
  const { openLoginModal } = useModal();

  return (
    <section id="hero" className="py-12 md:py-20 bg-gradient-to-br from-darkBg to-darkSurface">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="text-primary">Metinden</span> Video Oluşturmak Artık Çok Kolay!
            </h1>
            <p className="text-lg md:text-xl text-mediumText mb-8 max-w-lg">
              VideoYap ile yazılı metinlerinizi saniyeler içinde etkileyici videolara dönüştürün. Yapay zeka destekli, ücretsiz ve herkes için kullanımı kolay.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                className="bg-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-full font-medium transition-all flex items-center justify-center shadow-none hover:shadow-[0_0_15px_rgba(156,39,176,0.5)]"
                onClick={openLoginModal}
              >
                <span className="material-icons mr-2">play_arrow</span>
                Hemen Başla
              </Button>
              <Link href="/#examples">
                <Button 
                  variant="outline"
                  className="border border-primary text-primary hover:bg-primary hover:bg-opacity-10 px-8 py-3 rounded-full font-medium transition-all flex items-center justify-center w-full sm:w-auto"
                >
                  <span className="material-icons mr-2">video_library</span>
                  Örnekleri Gör
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?q=80&w=2070&auto=format&fit=crop" 
                alt="VideoYap Yapay Zeka Video Oluşturucu" 
                className="rounded-lg shadow-2xl w-full h-auto max-w-lg mx-auto"
              />
              <div className="absolute -bottom-5 -right-5 bg-darkSurface p-3 rounded-lg shadow-lg flex items-center space-x-2 border border-darkBorder">
                <span className="material-icons text-secondary">check_circle</span>
                <span className="font-medium">Tamamen Ücretsiz</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
