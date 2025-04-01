import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll olayını izleme
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Sayfanın üstüne kaydırma işlevi
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className={`fixed bottom-8 right-8 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <Button 
        onClick={scrollToTop} 
        size="icon" 
        className="rounded-full bg-primary hover:bg-primary/90 w-12 h-12 shadow-lg shadow-primary/20"
        aria-label="Sayfanın üstüne çık"
      >
        <ChevronUp className="h-6 w-6" />
      </Button>
    </div>
  );
}