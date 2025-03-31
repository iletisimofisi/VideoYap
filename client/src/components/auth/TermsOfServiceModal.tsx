import { Button } from "@/components/ui/button";
import { useModal } from "@/context/ModalContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function TermsOfServiceModal() {
  const { closeTermsModal, closeLoginModal } = useModal();
  const { registerUser } = useAuth();
  const { toast } = useToast();

  const handleAccept = async () => {
    try {
      // In a real app, this would register the user with the data from the login form
      await registerUser();
      closeTermsModal();
      closeLoginModal();
      toast({
        title: "Kayıt başarılı",
        description: "Hesabınız oluşturuldu. Hoş geldiniz!",
      });
    } catch (error) {
      toast({
        title: "Kayıt başarısız",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-darkSurface rounded-lg max-w-md w-full p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-lightText">Kullanım Koşulları</h2>
          <button 
            onClick={closeTermsModal} 
            className="text-mediumText hover:text-lightText"
            aria-label="Kapat"
          >
            <span className="material-icons">close</span>
          </button>
        </div>
        
        <div className="max-h-60 overflow-y-auto mb-6 text-mediumText text-sm">
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
            className="px-4 py-2 border border-darkBorder rounded text-mediumText hover:bg-darkBorder"
          >
            Reddet
          </Button>
          <Button 
            onClick={handleAccept} 
            className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
          >
            Kabul Ediyorum
          </Button>
        </div>
      </div>
    </div>
  );
}
