import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/context/ModalContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { X, Check, AlertCircle } from "lucide-react";

export function TermsOfServiceModal() {
  const { closeTermsModal, closeLoginModal } = useModal();
  const { registerUser } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAccept = async () => {
    try {
      setIsLoading(true);
      setError("");
      // In a real app, this would register the user with the data from the login form
      await registerUser();
      closeTermsModal();
      closeLoginModal();
      toast({
        title: "Kayıt başarılı",
        description: "Hesabınız oluşturuldu. Hoş geldiniz!",
      });
    } catch (error) {
      setError("Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      toast({
        title: "Kayıt başarısız",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = () => {
    closeTermsModal();
    toast({
      title: "Kayıt iptal edildi",
      description: "Kullanım koşullarını kabul etmeden kayıt olamazsınız.",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-darkSurface rounded-lg max-w-md w-full p-6 shadow-xl animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-lightText">Kullanım Koşulları</h2>
          <button 
            onClick={closeTermsModal} 
            className="text-mediumText hover:text-lightText transition-colors"
            aria-label="Kapat"
            disabled={isLoading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-900 rounded-md flex items-start space-x-2 text-red-200">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        <div className="max-h-60 overflow-y-auto mb-6 text-mediumText text-sm p-4 bg-darkBg/50 rounded-md border border-darkBorder">
          <p className="mb-3">VideoYap hizmetlerini kullanarak aşağıdaki koşulları kabul etmiş olursunuz:</p>
          <p className="mb-3">1. Kullanıcılar, telif hakkı ihlali oluşturacak içerikler oluşturmamalıdır.</p>
          <p className="mb-3">2. Oluşturulan içerikler şiddet, nefret söylemi veya yasa dışı unsurlar içermemelidir.</p>
          <p className="mb-3">3. VideoYap, oluşturulan içerikleri denetleme ve uygunsuz içerikleri kaldırma hakkını saklı tutar.</p>
          <p className="mb-3">4. Kullanıcılar, puan sistemini adil ve kurallara uygun şekilde kullanmalıdır.</p>
          <p className="mb-3">5. VideoYap, herhangi bir zamanda hizmet koşullarını değiştirme hakkını saklı tutar.</p>
          <p>6. Kullanıcı bilgileri gizlilik politikamıza uygun olarak saklanır ve korunur.</p>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button 
            onClick={handleReject} 
            variant="outline"
            className="px-4 py-2 border border-darkBorder rounded text-mediumText hover:bg-darkBorder/50"
            disabled={isLoading}
          >
            Reddet
          </Button>
          <Button 
            onClick={handleAccept} 
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                İşleniyor...
              </span>
            ) : (
              <span className="flex items-center">
                <Check className="w-4 h-4 mr-1" />
                Kabul Ediyorum
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
