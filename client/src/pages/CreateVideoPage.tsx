import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { useModal } from "@/context/ModalContext";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  Film, 
  Upload, 
  Wand2, 
  Clock, 
  Sparkles, 
  MessageSquare, 
  Music, 
  Image as ImageIcon, 
  Video, 
  Type, 
  Layers, 
  Settings, 
  Download, 
  Share2, 
  Check, 
  Loader2, 
  AlertTriangle
} from "lucide-react";

// Video formatları
interface VideoFormat {
  id: string;
  name: string;
  aspectRatio: string;
  icon: React.ReactNode;
  description: string;
}

const videoFormats: VideoFormat[] = [
  {
    id: "landscape",
    name: "Yatay",
    aspectRatio: "16:9",
    icon: <div className="w-12 h-8 bg-primary/20 rounded-md flex items-center justify-center">16:9</div>,
    description: "YouTube, bilgisayar ve TV için en uygun format"
  },
  {
    id: "vertical",
    name: "Dikey",
    aspectRatio: "9:16",
    icon: <div className="w-8 h-12 bg-primary/20 rounded-md flex items-center justify-center">9:16</div>,
    description: "Instagram ve TikTok gibi mobil platformlar için"
  },
  {
    id: "square",
    name: "Kare",
    aspectRatio: "1:1",
    icon: <div className="w-10 h-10 bg-primary/20 rounded-md flex items-center justify-center">1:1</div>,
    description: "Instagram ve diğer sosyal medya platformları için"
  },
  {
    id: "wide",
    name: "Ultra Geniş",
    aspectRatio: "21:9",
    icon: <div className="w-14 h-6 bg-primary/20 rounded-md flex items-center justify-center">21:9</div>,
    description: "Sinematik bir görünüm için ideal"
  }
];

// Video stilleri
interface VideoStyle {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  premium: boolean;
}

const videoStyles: VideoStyle[] = [
  {
    id: "presentation",
    name: "Sunum",
    description: "Profesyonel iş sunumları için",
    icon: <Layers className="w-8 h-8 text-primary" />,
    premium: false
  },
  {
    id: "educational",
    name: "Eğitim",
    description: "Öğrenmeyi kolaylaştıran video formatı",
    icon: <MessageSquare className="w-8 h-8 text-primary" />,
    premium: false
  },
  {
    id: "social",
    name: "Sosyal Medya",
    description: "Dikkat çekici sosyal medya içerikleri",
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    premium: false
  },
  {
    id: "cinematic",
    name: "Sinematik",
    description: "Film kalitesinde görsel efektler",
    icon: <Film className="w-8 h-8 text-primary" />,
    premium: true
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Sade ve şık bir görünüm",
    icon: <Type className="w-8 h-8 text-primary" />,
    premium: false
  },
  {
    id: "music",
    name: "Müzik",
    description: "Müzik odaklı video formatı",
    icon: <Music className="w-8 h-8 text-primary" />,
    premium: true
  }
];

export default function CreateVideoPage() {
  const { isLoggedIn, user } = useAuth();
  const [, navigate] = useLocation();
  const { openLoginModal } = useModal();
  const { toast } = useToast();
  
  const isPremium = isLoggedIn && user?.plan !== "free";
  
  // State tanımlamaları
  const [step, setStep] = useState(1);
  const [videoText, setVideoText] = useState("");
  const [selectedFormat, setSelectedFormat] = useState<string>("landscape");
  const [selectedStyle, setSelectedStyle] = useState<string>("educational");
  const [videoLength, setVideoLength] = useState<number>(60); // saniye cinsinden
  const [autoVoice, setAutoVoice] = useState<boolean>(true);
  const [withMusic, setWithMusic] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [creationComplete, setCreationComplete] = useState<boolean>(false);
  const [creationError, setCreationError] = useState<string | null>(null);
  
  // Puan hesaplama
  const calculatePoints = () => {
    // Saniye başına puan hesaplama
    let basePoints = Math.ceil(videoLength / 10);
    
    // Premium stiller için ekstra puan
    if (videoStyles.find(style => style.id === selectedStyle)?.premium) {
      basePoints *= 1.5;
    }
    
    // Otomatik seslendirme için ekstra puan
    if (autoVoice) {
      basePoints += 5;
    }
    
    // Müzik için ekstra puan
    if (withMusic) {
      basePoints += 3;
    }
    
    return Math.ceil(basePoints);
  };
  
  // Kullanıcının yeterli puanı var mı kontrolü
  const hasEnoughPoints = () => {
    if (!isLoggedIn || !user) return false;
    return user.points >= calculatePoints();
  };
  
  // Adım değiştirme işlemleri
  const goToNextStep = () => {
    if (step < 3) setStep(step + 1);
  };
  
  const goToPreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };
  
  // Video oluşturma işlemi
  const createVideo = async () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    
    if (!hasEnoughPoints()) {
      toast({
        title: "Yetersiz Puan",
        description: "Bu videoyu oluşturmak için yeterli puanınız bulunmuyor. Lütfen daha kısa bir video deneyin veya premium üyeliğe geçiş yapın.",
        variant: "destructive"
      });
      return;
    }
    
    if (videoText.trim().length < 10) {
      toast({
        title: "İçerik Çok Kısa",
        description: "Lütfen en az 10 karakter uzunluğunda bir metin girin.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsCreating(true);
      setCreationError(null);
      
      // Seçilen format için en-boy oranını alalım
      const aspectRatio = videoFormats.find(f => f.id === selectedFormat)?.aspectRatio || "16:9";
      
      // API isteği oluştur
      const response = await fetch('/api/videos/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: videoText,
          title: `Video ${new Date().toLocaleDateString('tr-TR')}`,
          duration: videoLength,
          format: selectedFormat,
          aspectRatio,
          style: selectedStyle,
          withVoice: autoVoice,
          withMusic: withMusic,
          pointsCost: calculatePoints()
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Video oluşturulurken bir hata oluştu');
      }
      
      const data = await response.json();
      
      setIsCreating(false);
      setCreationComplete(true);
      
      // Kullanıcının puan bilgisini güncelle
      if (user) {
        user.points = data.remainingPoints;
      }
      
      // Başarılı bir şekilde oluşturulduğunda bildirim göster
      toast({
        title: "Video Oluşturuldu!",
        description: "Videonuz başarıyla oluşturuldu. Videolarım sayfasından erişebilirsiniz.",
        variant: "default"
      });
      
    } catch (error) {
      setIsCreating(false);
      setCreationError(error instanceof Error ? error.message : "Video oluşturulurken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      
      toast({
        title: "Hata!",
        description: error instanceof Error ? error.message : "Video oluşturulurken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
        variant: "destructive"
      });
    }
  };
  
  // Eğer kullanıcı giriş yapmamışsa, video oluşturma işlemine başlamadan önce login modalı göster
  const handleCreateClick = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    
    createVideo();
  };
  
  // Video formatını değiştirme işlemi
  const handleFormatChange = (formatId: string) => {
    setSelectedFormat(formatId);
  };
  
  // Video stilini değiştirme işlemi
  const handleStyleChange = (styleId: string) => {
    // Premium stiller için premium kontrolü
    const style = videoStyles.find(style => style.id === styleId);
    
    if (style?.premium && !isPremium) {
      toast({
        title: "Premium Özellik",
        description: "Bu stil sadece premium kullanıcılar için kullanılabilir. Premium üyeliğe geçerek tüm stiller ve özelliklere erişim sağlayabilirsiniz.",
        variant: "default"
      });
      return;
    }
    
    setSelectedStyle(styleId);
  };
  
  // Video süresini formatlama
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Başlık */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Video Oluştur</h1>
          <p className="text-gray-400">
            Metinden profesyonel videolar oluşturmak için yapay zeka teknolojimizi kullanın
          </p>
        </div>
        
        {/* Adımlar */}
        <div className="flex justify-between items-center mb-8">
          <div className="hidden md:flex w-full justify-center">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-darkBg text-gray-400'}`}>
                <Type className="w-5 h-5" />
              </div>
              <div className={`w-20 h-1 ${step >= 2 ? 'bg-primary' : 'bg-darkBorder'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-darkBg text-gray-400'}`}>
                <Settings className="w-5 h-5" />
              </div>
              <div className={`w-20 h-1 ${step >= 3 ? 'bg-primary' : 'bg-darkBorder'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-darkBg text-gray-400'}`}>
                <Wand2 className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          <div className="md:hidden flex w-full justify-between">
            <span className={`text-sm font-medium ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>İçerik</span>
            <span className={`text-sm font-medium ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>Ayarlar</span>
            <span className={`text-sm font-medium ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>Oluştur</span>
          </div>
        </div>
        
        {/* Ana içerik */}
        <Card className="bg-darkSurface border-darkBorder">
          <CardContent className="p-6">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Video İçeriği</h2>
                  <p className="text-gray-300 mb-4">
                    Videonuzda yer almasını istediğiniz metni girin. Yazınız ne kadar detaylı olursa, yapay zeka o kadar kaliteli bir video oluşturabilir.
                  </p>
                  
                  <Label htmlFor="video-text" className="text-white mb-2 block">Video Metni</Label>
                  <textarea 
                    id="video-text"
                    className="w-full h-64 p-3 bg-darkBg border border-darkBorder text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Videonuzun içeriğini buraya yazın... Örneğin: İstanbul, Türkiye'nin en büyük şehri ve kültürel, tarihi merkezi..."
                    value={videoText}
                    onChange={(e) => setVideoText(e.target.value)}
                  ></textarea>
                  
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>{videoText.length} karakter</span>
                    <span>Minimum: 10 karakter</span>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={goToNextStep} 
                    className="bg-primary"
                    disabled={videoText.trim().length < 10}
                  >
                    Devam Et
                  </Button>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Video Ayarları</h2>
                  <p className="text-gray-300 mb-4">
                    Videonuzun biçimini, stilini ve diğer özelliklerini seçin.
                  </p>
                  
                  <div className="space-y-8">
                    {/* Video Formatı */}
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Video Formatı</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {videoFormats.map((format) => (
                          <div 
                            key={format.id}
                            className={`bg-darkBg border ${selectedFormat === format.id ? 'border-primary' : 'border-darkBorder'} rounded-lg p-4 cursor-pointer transition-all hover:border-primary`}
                            onClick={() => handleFormatChange(format.id)}
                          >
                            <div className="flex flex-col items-center">
                              <div className="mb-3">{format.icon}</div>
                              <h4 className="text-white font-medium mb-1">{format.name}</h4>
                              <span className="text-xs text-gray-400 mb-2">{format.aspectRatio}</span>
                              <p className="text-xs text-gray-400 text-center">{format.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Video Stili */}
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Video Stili</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {videoStyles.map((style) => (
                          <div 
                            key={style.id}
                            className={`bg-darkBg border ${selectedStyle === style.id ? 'border-primary' : 'border-darkBorder'} rounded-lg p-4 cursor-pointer transition-all hover:border-primary relative`}
                            onClick={() => handleStyleChange(style.id)}
                          >
                            {style.premium && (
                              <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-600 to-yellow-400 text-white border-none">
                                Premium
                              </Badge>
                            )}
                            <div className="flex flex-col items-center">
                              <div className="mb-3">{style.icon}</div>
                              <h4 className="text-white font-medium mb-1">{style.name}</h4>
                              <p className="text-xs text-gray-400 text-center">{style.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Diğer Ayarlar */}
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Diğer Ayarlar</h3>
                      
                      <div className="space-y-4">
                        {/* Video Süresi */}
                        <div className="bg-darkBg border border-darkBorder rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <Label htmlFor="video-length" className="text-white">Video Süresi</Label>
                            <span className="text-gray-300">{formatDuration(videoLength)}</span>
                          </div>
                          <div className="px-2">
                            <Slider
                              id="video-length"
                              min={30}
                              max={isPremium ? 600 : 180}
                              step={10}
                              value={[videoLength]}
                              onValueChange={(value) => setVideoLength(value[0])}
                              className="my-4"
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>30 saniye</span>
                            <span>{isPremium ? '10 dakika' : '3 dakika'}</span>
                          </div>
                          {!isPremium && (
                            <p className="text-xs text-yellow-500 mt-2 flex items-center">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Daha uzun videolar için premium üyeliğe geçin
                            </p>
                          )}
                        </div>
                        
                        {/* Sesli Anlatım */}
                        <div className="bg-darkBg border border-darkBorder rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <h4 className="text-white font-medium mb-1">Otomatik Sesli Anlatım</h4>
                              <p className="text-xs text-gray-400">Metin içeriğiniz için otomatik sesli anlatım ekleyin</p>
                            </div>
                            <Switch
                              checked={autoVoice}
                              onCheckedChange={setAutoVoice}
                            />
                          </div>
                        </div>
                        
                        {/* Arka Plan Müziği */}
                        <div className="bg-darkBg border border-darkBorder rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <h4 className="text-white font-medium mb-1">Arkaplan Müziği</h4>
                              <p className="text-xs text-gray-400">Videonuzun atmosferini tamamlayacak müzik ekleyin</p>
                            </div>
                            <Switch
                              checked={withMusic}
                              onCheckedChange={setWithMusic}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    onClick={goToPreviousStep} 
                    variant="outline"
                  >
                    Geri
                  </Button>
                  <Button 
                    onClick={goToNextStep} 
                    className="bg-primary"
                  >
                    Devam Et
                  </Button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Video Oluşturma</h2>
                  <p className="text-gray-300 mb-4">
                    Seçtiğiniz ayarlarla video oluşturmaya hazırsınız. Oluşturma işlemi birkaç dakika sürebilir.
                  </p>
                  
                  <div className="bg-darkBg border border-darkBorder rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-medium text-white mb-3">Özet</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-darkBorder pb-3">
                        <span className="text-gray-300">Video Formatı:</span>
                        <span className="text-white font-medium">
                          {videoFormats.find(f => f.id === selectedFormat)?.name} ({videoFormats.find(f => f.id === selectedFormat)?.aspectRatio})
                        </span>
                      </div>
                      
                      <div className="flex justify-between border-b border-darkBorder pb-3">
                        <span className="text-gray-300">Video Stili:</span>
                        <span className="text-white font-medium">
                          {videoStyles.find(s => s.id === selectedStyle)?.name}
                        </span>
                      </div>
                      
                      <div className="flex justify-between border-b border-darkBorder pb-3">
                        <span className="text-gray-300">Video Süresi:</span>
                        <span className="text-white font-medium">{formatDuration(videoLength)}</span>
                      </div>
                      
                      <div className="flex justify-between border-b border-darkBorder pb-3">
                        <span className="text-gray-300">Otomatik Sesli Anlatım:</span>
                        <span className="text-white font-medium">{autoVoice ? 'Evet' : 'Hayır'}</span>
                      </div>
                      
                      <div className="flex justify-between border-b border-darkBorder pb-3">
                        <span className="text-gray-300">Arkaplan Müziği:</span>
                        <span className="text-white font-medium">{withMusic ? 'Evet' : 'Hayır'}</span>
                      </div>
                      
                      <div className="flex justify-between pt-2">
                        <span className="text-gray-300">Gereken Puan:</span>
                        <span className="text-primary font-medium">{calculatePoints()} puan</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Kullanılabilir puan bilgisi */}
                  {isLoggedIn && user && (
                    <div className="bg-darkBg border border-darkBorder rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-gray-300">Mevcut Puanınız:</span>
                          <span className="text-white font-medium ml-2">{user.points} puan</span>
                        </div>
                        
                        {hasEnoughPoints() ? (
                          <Badge className="bg-green-900 border-green-700 text-green-200">
                            <Check className="w-3 h-3 mr-1" />
                            Yeterli Puan
                          </Badge>
                        ) : (
                          <Badge className="bg-red-900 border-red-700 text-red-200">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Yetersiz Puan
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Video oluşturma süreci */}
                  <div className="bg-darkBg border border-darkBorder rounded-lg p-6">
                    {!isCreating && !creationComplete && !creationError && (
                      <div className="text-center py-6">
                        <Wand2 className="w-16 h-16 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-white mb-2">
                          Videonuzu Oluşturmaya Hazırsınız
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-md mx-auto">
                          "Video Oluştur" butonuna tıklayarak seçtiğiniz ayarlarla yapay zeka destekli videonuzu oluşturabilirsiniz.
                        </p>
                      </div>
                    )}
                    
                    {isCreating && (
                      <div className="text-center py-6">
                        <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Loader2 className="w-16 h-16 text-primary animate-spin" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">
                          Videonuz Oluşturuluyor
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-md mx-auto">
                          Bu işlem birkaç dakika sürebilir. Lütfen bekleyin...
                        </p>
                      </div>
                    )}
                    
                    {creationComplete && (
                      <div className="text-center py-6">
                        <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check className="w-10 h-10 text-green-200" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">
                          Videonuz Başarıyla Oluşturuldu!
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-md mx-auto">
                          Videonuzu Videolarım sayfasından görüntüleyebilir, indirebilir veya paylaşabilirsiniz.
                        </p>
                        <div className="flex justify-center space-x-3">
                          <Button 
                            variant="outline" 
                            className="flex items-center" 
                            onClick={() => navigate("/videos")}
                          >
                            <Video className="w-4 h-4 mr-2" />
                            Videolarım
                          </Button>
                          <Button 
                            className="bg-primary flex items-center"
                            onClick={() => {
                              setStep(1);
                              setVideoText("");
                              setSelectedFormat("landscape");
                              setSelectedStyle("educational");
                              setVideoLength(60);
                              setAutoVoice(true);
                              setWithMusic(true);
                              setCreationComplete(false);
                            }}
                          >
                            <Wand2 className="w-4 h-4 mr-2" />
                            Yeni Video Oluştur
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {creationError && (
                      <div className="text-center py-6">
                        <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                          <AlertTriangle className="w-10 h-10 text-red-200" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">
                          Bir Hata Oluştu
                        </h3>
                        <p className="text-red-400 mb-6 max-w-md mx-auto">
                          {creationError}
                        </p>
                        <Button 
                          className="bg-primary flex items-center"
                          onClick={() => {
                            setCreationError(null);
                            createVideo();
                          }}
                        >
                          <span className="mr-2">Tekrar Dene</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    onClick={goToPreviousStep} 
                    variant="outline"
                  >
                    Geri
                  </Button>
                  
                  {!isCreating && !creationComplete && (
                    <Button 
                      onClick={handleCreateClick} 
                      className="bg-primary flex items-center"
                      disabled={isLoggedIn && !hasEnoughPoints()}
                    >
                      <Wand2 className="w-4 h-4 mr-2" />
                      Video Oluştur
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}