import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import { 
  Sparkles, 
  Building2, 
  Laugh, 
  Clapperboard, 
  Film, 
  InfoIcon 
} from "lucide-react";

interface VideoFormatOptionProps {
  aspectRatio: string;
  label: string;
  tooltip: string;
  isSelected: boolean;
  onClick: () => void;
}

function VideoFormatOption({ aspectRatio, label, tooltip, isSelected, onClick }: VideoFormatOptionProps) {
  const aspectClasses = {
    "9/16": "aspect-[9/16]",
    "4/5": "aspect-[4/5]",
    "16/9": "aspect-[16/9]"
  };

  return (
    <div 
      className={`video-format-option ${isSelected ? 'bg-primary bg-opacity-20 border-2 border-primary' : 'bg-darkBg hover:bg-opacity-80 border border-darkBorder'} rounded-lg p-2 text-center cursor-pointer tooltip`} 
      data-tooltip={tooltip}
      onClick={onClick}
    >
      <div className={`${aspectClasses[aspectRatio as keyof typeof aspectClasses]} ${isSelected ? 'bg-primary bg-opacity-30' : 'bg-darkBorder'} rounded mx-auto mb-1 w-8`}></div>
      <span className="text-xs">{label}</span>
    </div>
  );
}

interface StyleOptionProps {
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function StyleOption({ icon, label, isSelected, onClick }: StyleOptionProps) {
  return (
    <div 
      className={`${isSelected ? 'bg-primary bg-opacity-20 border-2 border-primary' : 'bg-darkBg hover:bg-opacity-80 border border-darkBorder'} rounded-lg p-3 text-center cursor-pointer transition-all`}
      onClick={onClick}
    >
      <div className="mb-1 flex justify-center">{icon}</div>
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function VideoCreationDemoSection() {
  const { isLoggedIn } = useAuth();
  const { openLoginModal } = useModal();
  const { toast } = useToast();
  const [videoText, setVideoText] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("1");
  const [selectedFormat, setSelectedFormat] = useState("16/9");
  const [selectedStyle, setSelectedStyle] = useState("Kurumsal");

  const formats = [
    { aspectRatio: "9/16", label: "9:16", tooltip: "YouTube Shorts için ideal" },
    { aspectRatio: "4/5", label: "4:5", tooltip: "Instagram Reels için ideal" },
    { aspectRatio: "16/9", label: "16:9", tooltip: "Standart video formatı" }
  ];

  const styles = [
    { icon: <Sparkles className="w-6 h-6 text-primary" />, label: "Modern" },
    { icon: <Building2 className="w-6 h-6 text-secondary" />, label: "Kurumsal" },
    { icon: <Laugh className="w-6 h-6 text-primary" />, label: "Eğlenceli" },
    { icon: <Clapperboard className="w-6 h-6 text-secondary" />, label: "Sinematik" }
  ];

  const handleCreateVideo = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    if (!videoText.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen bir metin girin.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Video oluşturuluyor",
      description: "Videonuz hazırlanıyor, lütfen bekleyin."
    });

    // In a real app, this would send the request to the server
    setTimeout(() => {
      toast({
        title: "Video oluşturuldu",
        description: "Videonuz başarıyla oluşturuldu. İndirme bağlantısı gönderildi."
      });
    }, 2000);
  };

  return (
    <section id="video-creator" className="py-16 bg-darkBg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4"><span className="text-primary">Video</span> Oluşturucu</h2>
          <p className="text-lg text-mediumText max-w-2xl mx-auto">
            Hemen deneyin! Metninizi yazın ve nasıl video oluşturulduğunu görün.
          </p>
        </div>
        
        <div className="bg-darkSurface rounded-xl shadow-xl p-6 lg:p-8 max-w-4xl mx-auto">
          <div className="mb-6">
            <label htmlFor="videoText" className="block text-lg font-medium mb-2">Metninizi Girin</label>
            <Textarea 
              id="videoText"
              value={videoText}
              onChange={(e) => setVideoText(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-darkBg border border-darkBorder text-white focus:border-primary focus:outline-none min-h-[120px] placeholder:text-gray-500" 
              placeholder="Videonuzda gösterilmesini istediğiniz metni buraya yazın..."
            />
            <p className="text-sm text-mediumText mt-2 flex items-center">
              <InfoIcon className="w-4 h-4 mr-1" />
              En iyi sonuç için 1-3 cümle kullanın.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-lg font-medium mb-3">Video Süresi</label>
              <div className="flex space-x-3">
                {["1", "3", "5"].map((duration) => (
                  <button
                    key={duration}
                    className={`flex-1 ${selectedDuration === duration ? 'bg-primary bg-opacity-20 border-2 border-primary' : 'bg-darkBg hover:bg-opacity-80 border-2 border-darkBorder'} rounded-lg py-3 text-center font-medium transition-all`}
                    onClick={() => setSelectedDuration(duration)}
                  >
                    {duration} Dakika
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-lg font-medium mb-3">Video Formatı</label>
              <div className="grid grid-cols-3 gap-3">
                {formats.map((format) => (
                  <VideoFormatOption
                    key={format.aspectRatio}
                    aspectRatio={format.aspectRatio}
                    label={format.label}
                    tooltip={format.tooltip}
                    isSelected={selectedFormat === format.aspectRatio}
                    onClick={() => setSelectedFormat(format.aspectRatio)}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-lg font-medium mb-3">Stil Seçenekleri</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {styles.map((style) => (
                <StyleOption
                  key={style.label}
                  icon={style.icon}
                  label={style.label}
                  isSelected={selectedStyle === style.label}
                  onClick={() => setSelectedStyle(style.label)}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={handleCreateVideo}
              className="bg-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-full font-medium transition-all flex items-center justify-center shadow-none hover:shadow-[0_0_15px_rgba(156,39,176,0.5)]"
            >
              <Film className="w-5 h-5 mr-2" />
              Video Oluştur
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
