import { Link } from "wouter";
import { Clapperboard, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-darkSurface py-12 border-t border-darkBorder">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Clapperboard size={28} className="text-primary" />
              <h1 className="text-2xl font-bold text-primary">VideoYap</h1>
            </Link>
            <p className="text-mediumText mb-4">
              Metin tabanlı içeriklerinizi yapay zeka ile profesyonel videolara dönüştürün.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-mediumText hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-mediumText hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-mediumText hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="https://youtube.com" className="text-mediumText hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-mediumText hover:text-primary transition-colors">Ana Sayfa</Link></li>
              <li><Link href="/#features" className="text-mediumText hover:text-primary transition-colors">Özellikler</Link></li>
              <li><Link href="/#pricing" className="text-mediumText hover:text-primary transition-colors">Fiyatlandırma</Link></li>
              <li><Link href="/#examples" className="text-mediumText hover:text-primary transition-colors">Örnekler</Link></li>
              <li><Link href="/#faq" className="text-mediumText hover:text-primary transition-colors">SSS</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Destek</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-mediumText hover:text-primary transition-colors">Yardım Merkezi</Link></li>
              <li><Link href="/contact" className="text-mediumText hover:text-primary transition-colors">İletişim</Link></li>
              <li><Link href="/guide" className="text-mediumText hover:text-primary transition-colors">Kullanım Kılavuzu</Link></li>
              <li><Link href="/tutorials" className="text-mediumText hover:text-primary transition-colors">Video Dersler</Link></li>
              <li><Link href="/community" className="text-mediumText hover:text-primary transition-colors">Topluluk</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Yasal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-mediumText hover:text-primary transition-colors">Kullanım Koşulları</Link></li>
              <li><Link href="/privacy" className="text-mediumText hover:text-primary transition-colors">Gizlilik Politikası</Link></li>
              <li><Link href="/cookies" className="text-mediumText hover:text-primary transition-colors">Çerez Politikası</Link></li>
              <li><Link href="/kvkk" className="text-mediumText hover:text-primary transition-colors">KVKK</Link></li>
              <li><Link href="/copyright" className="text-mediumText hover:text-primary transition-colors">Telif Hakkı</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-darkBorder mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-mediumText text-center md:text-left mb-4 md:mb-0">
            &copy; {currentYear} VideoYap. Tüm hakları saklıdır.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end space-x-4">
            <Link href="/tr" className="text-mediumText hover:text-primary transition-colors">Türkçe</Link>
            <Link href="/en" className="text-mediumText hover:text-primary transition-colors">English</Link>
            <Link href="/de" className="text-mediumText hover:text-primary transition-colors">Deutsch</Link>
            <Link href="/es" className="text-mediumText hover:text-primary transition-colors">Español</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
