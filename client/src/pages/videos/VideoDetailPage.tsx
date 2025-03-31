import { useEffect, useState } from "react";
import { useLocation, useRoute, Link } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Share,
  Download,
  Edit,
  Trash2,
  MessageSquare,
  Eye,
  Copy,
  Clock,
  CheckCircle,
  XCircle,
  Play,
  Link as LinkIcon,
  Thermometer
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

// Örnek video verileri - gerçekte API'den gelecek
const mockVideos = [
  {
    id: 1,
    title: "Türkiye'nin Doğal Güzellikleri",
    description: "Bu videoda Türkiye'nin farklı bölgelerindeki doğal güzellikleri tanıtıyoruz. Karadeniz'in yemyeşil yaylaları, Akdeniz'in berrak suları, Kapadokya'nın peri bacaları ve daha fazlası...",
    thumbnail: "https://placehold.co/1280x720/252530/FFFFFF/png?text=Türkiye+Doğası",
    videoUrl: "https://example.com/videos/1.mp4",
    duration: "3:45",
    createdAt: "2023-12-10T14:30:00Z",
    status: "completed",
    views: 125,
    style: "belgesel",
    aspect: "16:9",
    tags: ["doğa", "türkiye", "seyahat", "belgesel"],
    originalText: "Türkiye, doğal güzellikleriyle dünyanın en zengin ülkelerinden biridir. Karadeniz'in yemyeşil yaylaları, Akdeniz'in berrak suları, Ege'nin zeytin ağaçları, Doğu Anadolu'nun görkemli dağları ve Kapadokya'nın peri bacaları... Her bölge birbirinden farklı doğal harikalar sunuyor. Bu video, Türkiye'nin dört bir yanındaki doğal güzellikleri keşfetmenizi sağlayacak.",
    shareCode: "TRDoğa2023"
  },
  {
    id: 2,
    title: "Sağlıklı Yaşam için Egzersiz İpuçları",
    description: "Evde kolayca yapabileceğiniz egzersizler ve sağlıklı yaşam için öneriler. Kardiyo, kuvvet antrenmanı ve esneme hareketleri dahil.",
    thumbnail: "https://placehold.co/1280x720/252530/FFFFFF/png?text=Egzersiz+İpuçları",
    videoUrl: "https://example.com/videos/2.mp4",
    duration: "5:20",
    createdAt: "2023-12-05T10:15:00Z",
    status: "completed",
    views: 87,
    style: "eğitim",
    aspect: "16:9",
    tags: ["sağlık", "egzersiz", "spor", "yaşam"],
    originalText: "Düzenli egzersiz yapmak, sağlıklı bir yaşam için en önemli alışkanlıklardan biridir. Evde kolayca yapabileceğiniz basit egzersizlerle bile formda kalabilirsiniz. Kardiyo egzersizleri kalbinizi güçlendirirken, kuvvet antrenmanları kaslarınızı geliştirir. Esneme hareketleri ise esnekliğinizi artırır ve sakatlanma riskini azaltır. Bu videoda, evde kolayca uygulayabileceğiniz egzersizleri ve sağlıklı bir yaşam için ipuçlarını bulacaksınız.",
    shareCode: "Egzersiz2023"
  },
  {
    id: 3,
    title: "İstanbul Tarihi Yerler Turu",
    description: "İstanbul'un en önemli tarihi mekanlarının sanal turu. Ayasofya, Topkapı Sarayı, Sultanahmet Camii ve dahası bu videoda.",
    thumbnail: "https://placehold.co/1280x720/252530/FFFFFF/png?text=İstanbul+Turu",
    videoUrl: "https://example.com/videos/3.mp4",
    duration: "8:10",
    createdAt: "2023-11-28T16:45:00Z",
    status: "completed",
    views: 210,
    style: "gezi",
    aspect: "16:9",
    tags: ["istanbul", "tarih", "gezi", "kültür"],
    originalText: "İstanbul, iki kıtayı birleştiren eşsiz konumu ve binlerce yıllık tarihi ile dünyanın en etkileyici şehirlerinden biridir. Bizans ve Osmanlı İmparatorluklarına başkentlik yapmış olan bu şehir, muhteşem mimari eserlere ev sahipliği yapmaktadır. Ayasofya, Topkapı Sarayı, Sultanahmet Camii, Yerebatan Sarnıcı ve Kapalıçarşı gibi önemli tarihi mekânlar, her yıl milyonlarca turisti ağırlamaktadır. Bu videoda İstanbul'un en önemli tarihi yerlerini keşfedecek ve bu muhteşem şehrin tarihi dokusunu hissedeceksiniz.",
    shareCode: "Istanbul2023"
  },
  {
    id: 5,
    title: "Yeni Video - İşleniyor",
    description: "Bu video şu anda işleniyor, lütfen bekleyin...",
    thumbnail: "https://placehold.co/1280x720/252530/FFFFFF/png?text=İşleniyor",
    videoUrl: null,
    duration: "???",
    createdAt: "2023-12-15T13:25:00Z",
    status: "processing",
    views: 0,
    style: "bilgilendirme",
    aspect: "16:9",
    tags: ["yeni", "içerik"],
    originalText: "Bu bir test metnidir. Video işleme süreci devam ediyor. Birkaç dakika içinde işlem tamamlanacak ve videonuz hazır olacaktır.",
    shareCode: null
  },
  {
    id: 6,
    title: "Anadolu Kültürü",
    description: "Video oluşturma işlemi başarısız oldu. Tekrar deneyebilirsiniz.",
    thumbnail: "https://placehold.co/1280x720/252530/FFFFFF/png?text=Oluşturma+Başarısız",
    videoUrl: null,
    duration: "N/A",
    createdAt: "2023-12-14T11:10:00Z",
    status: "failed",
    views: 0,
    style: "belgesel",
    aspect: "16:9",
    tags: ["kültür", "anadolu"],
    originalText: "Anadolu, binlerce yıllık kültürel mirasıyla dünyanın en zengin bölgelerinden biridir. Hitit, Frigya, Lidya, Urartu gibi birçok antik uygarlığa ev sahipliği yapmış olan Anadolu toprakları, çeşitli kültürlerin izlerini taşımaktadır. Bu video, Anadolu'nun zengin kültürel mirasını, gelenek ve göreneklerini, müziklerini, yemeklerini ve el sanatlarını tanıtmaktadır.",
    shareCode: null,
    errorMessage: "Video içeriği oluşturulamadı. Lütfen metni kontrol edip tekrar deneyin."
  }
];

export default function VideoDetailPage() {
  const { isLoggedIn } = useAuth();
  const [, navigate] = useLocation();
  const [match, params] = useRoute<{ videoId: string }>("/videos/:videoId");
  const [video, setVideo] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [commentText, setCommentText] = useState("");
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    
    if (match && params?.videoId) {
      // Gerçek uygulamada API'den video bilgilerini çekmek gerekir
      const foundVideo = mockVideos.find(v => v.id === parseInt(params.videoId));
      if (foundVideo) {
        setVideo(foundVideo);
      } else {
        navigate("/videos");
      }
    }
  }, [match, params, isLoggedIn, navigate]);

  if (!video) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center text-center">
          <Clock className="w-16 h-16 text-primary animate-pulse mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Video Yükleniyor...</h2>
          <p className="text-gray-400">Video bilgileri yükleniyor, lütfen bekleyin.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "processing":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Tamamlandı";
      case "processing":
        return "İşleniyor";
      case "failed":
        return "Başarısız";
      default:
        return status;
    }
  };

  const handleShare = () => {
    // Paylaşma fonksiyonu
    console.log("Paylaşma işlemi:", video.title);
  };

  const handleDownload = () => {
    // İndirme fonksiyonu
    console.log("İndirme işlemi:", video.videoUrl);
  };

  const handleEdit = () => {
    // Düzenleme fonksiyonu
    console.log("Düzenleme işlemi:", video.id);
  };

  const handleDelete = () => {
    // Silme fonksiyonu
    console.log("Silme işlemi:", video.id);
    setIsDeleteDialogOpen(false);
    // Silme işleminden sonra videoları listesine geri dön
    navigate("/videos");
  };

  const handleCopyLink = () => {
    // Bağlantıyı kopyalama işlemi
    const videoUrl = `${window.location.origin}/videos/${video.id}`;
    navigator.clipboard.writeText(videoUrl)
      .then(() => {
        console.log("Bağlantı kopyalandı:", videoUrl);
      })
      .catch(err => {
        console.error("Kopyalama hatası:", err);
      });
  };

  const handleCopyCode = () => {
    // Paylaşım kodunu kopyalama işlemi
    if (video.shareCode) {
      navigator.clipboard.writeText(video.shareCode)
        .then(() => {
          console.log("Kod kopyalandı:", video.shareCode);
        })
        .catch(err => {
          console.error("Kopyalama hatası:", err);
        });
    }
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      console.log("Yorum eklendi:", commentText);
      setCommentText("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Button 
            variant="ghost" 
            className="mr-2 p-2"
            onClick={() => navigate("/videos")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex-grow truncate">
            {video.title}
          </h1>
          <div className="flex items-center">
            {getStatusIcon(video.status)}
            <span className={`ml-2 text-sm font-medium ${
              video.status === "completed" ? "text-green-500" : 
              video.status === "processing" ? "text-amber-500" : 
              "text-red-500"
            }`}>
              {getStatusText(video.status)}
            </span>
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Oluşturulma: {formatDate(video.createdAt)} | 
          İzlenme: {video.views} | 
          Süre: {video.duration}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="relative aspect-video bg-darkBorder overflow-hidden rounded-md">
            {video.status === "completed" ? (
              <>
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Button className="bg-primary hover:bg-primary/90 rounded-full p-3 h-auto w-auto">
                    <Play className="w-8 h-8 text-white" />
                  </Button>
                </div>
              </>
            ) : video.status === "processing" ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Clock className="w-16 h-16 text-amber-500 animate-pulse mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Video İşleniyor</h3>
                <p className="text-gray-400 text-center max-w-md px-4">
                  Videonuz hazırlanıyor. Bu işlem birkaç dakika sürebilir.
                </p>
                <div className="w-64 h-2 bg-darkBorder rounded-full mt-6 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <XCircle className="w-16 h-16 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">İşlem Başarısız</h3>
                <p className="text-gray-400 text-center max-w-md px-4">
                  {video.errorMessage || "Video oluşturma işlemi başarısız oldu. Lütfen tekrar deneyin."}
                </p>
                <Button 
                  className="bg-primary hover:bg-primary/90 mt-6"
                  onClick={handleEdit}
                >
                  Tekrar Dene
                </Button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {video.tags?.map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="bg-darkSurface text-primary">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-6">
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={handleShare}
              disabled={video.status !== "completed"}
            >
              <Share className="w-4 h-4 mr-2" />
              Paylaş
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={handleDownload}
              disabled={video.status !== "completed"}
            >
              <Download className="w-4 h-4 mr-2" />
              İndir
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={handleEdit}
            >
              <Edit className="w-4 h-4 mr-2" />
              Düzenle
            </Button>
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex items-center border-red-500 text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Sil
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-darkSurface border-darkBorder">
                <DialogHeader>
                  <DialogTitle className="text-white">Videoyu Sil</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-gray-300">
                    "{video.title}" adlı videoyu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                  </p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" className="mr-2">
                      İptal
                    </Button>
                  </DialogClose>
                  <Button 
                    variant="destructive" 
                    className="bg-red-500 hover:bg-red-600"
                    onClick={handleDelete}
                  >
                    Sil
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full bg-darkSurface border-darkBorder">
              <TabsTrigger 
                value="info" 
                className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
              >
                Bilgiler
              </TabsTrigger>
              <TabsTrigger 
                value="comments" 
                className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
              >
                Yorumlar
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
              >
                Analitik
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="pt-4">
              <Card className="bg-darkSurface border-darkBorder">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Video Açıklaması</h3>
                  <p className="text-gray-300 text-sm mb-4">{video.description}</p>
                  
                  <Separator className="my-4 bg-darkBorder" />
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Stil</h4>
                      <p className="text-white capitalize">{video.style}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">En Boy Oranı</h4>
                      <p className="text-white">{video.aspect}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Orijinal Metin</h4>
                      <div className="bg-darkBg p-3 rounded-md text-sm text-gray-300 max-h-40 overflow-y-auto">
                        {video.originalText}
                      </div>
                    </div>
                    
                    {video.shareCode && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-1">Paylaşım Kodu</h4>
                        <div className="flex items-center">
                          <Input 
                            readOnly 
                            value={video.shareCode}
                            className="bg-darkBg border-darkBorder text-white"
                          />
                          <Button 
                            variant="ghost" 
                            className="ml-2 h-9 w-9 p-0" 
                            onClick={handleCopyCode}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Video Bağlantısı</h4>
                      <div className="flex items-center">
                        <Input 
                          readOnly 
                          value={`${window.location.origin}/videos/${video.id}`}
                          className="bg-darkBg border-darkBorder text-white"
                        />
                        <Button 
                          variant="ghost" 
                          className="ml-2 h-9 w-9 p-0" 
                          onClick={handleCopyLink}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="comments" className="pt-4">
              <Card className="bg-darkSurface border-darkBorder">
                <CardContent className="p-4">
                  <div className="mb-4">
                    <Textarea 
                      placeholder="Yorumunuzu yazın..."
                      className="bg-darkBg border-darkBorder text-white resize-none mb-2"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <Button 
                      className="bg-primary hover:bg-primary/90 w-full"
                      onClick={handleAddComment}
                      disabled={!commentText.trim()}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Yorum Ekle
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-gray-400 text-center py-4">
                      Henüz yorum yapılmadı. İlk yorumu siz ekleyin!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="pt-4">
              <Card className="bg-darkSurface border-darkBorder">
                <CardContent className="p-4">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center mb-3">
                        <Eye className="w-5 h-5 text-blue-400 mr-2" />
                        <h3 className="text-lg font-semibold text-white">İzlenme İstatistikleri</h3>
                      </div>
                      <div className="flex items-center p-4 rounded-md bg-darkBg">
                        <div className="flex flex-col items-center flex-1">
                          <span className="text-2xl font-bold text-white">{video.views}</span>
                          <span className="text-xs text-gray-400">Toplam İzlenme</span>
                        </div>
                        <div className="flex flex-col items-center flex-1">
                          <span className="text-2xl font-bold text-white">3</span>
                          <span className="text-xs text-gray-400">Son 24 Saat</span>
                        </div>
                        <div className="flex flex-col items-center flex-1">
                          <span className="text-2xl font-bold text-white">12</span>
                          <span className="text-xs text-gray-400">Son 7 Gün</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-3">
                        <LinkIcon className="w-5 h-5 text-green-400 mr-2" />
                        <h3 className="text-lg font-semibold text-white">Bağlantı Tıklamaları</h3>
                      </div>
                      <div className="flex items-center p-4 rounded-md bg-darkBg">
                        <div className="flex flex-col items-center flex-1">
                          <span className="text-2xl font-bold text-white">8</span>
                          <span className="text-xs text-gray-400">Toplam Tıklama</span>
                        </div>
                        <div className="flex flex-col items-center flex-1">
                          <span className="text-2xl font-bold text-white">1</span>
                          <span className="text-xs text-gray-400">Son 24 Saat</span>
                        </div>
                        <div className="flex flex-col items-center flex-1">
                          <span className="text-2xl font-bold text-white">3</span>
                          <span className="text-xs text-gray-400">Son 7 Gün</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-3">
                        <Thermometer className="w-5 h-5 text-orange-400 mr-2" />
                        <h3 className="text-lg font-semibold text-white">Etkileşim Oranı</h3>
                      </div>
                      <div className="p-4 rounded-md bg-darkBg">
                        <div className="mb-2 flex justify-between">
                          <span className="text-xs text-gray-400">Etkileşim Skoru</span>
                          <span className="text-xs text-green-400">Yüksek</span>
                        </div>
                        <div className="w-full h-2 bg-darkBorder rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      Tam İstatistikleri Görüntüle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}