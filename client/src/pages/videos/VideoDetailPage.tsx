import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams, Link, useLocation } from "wouter";
import { calculateVideoPoints } from "@/lib/utils";

interface VideoDetails {
  id: number;
  text: string;
  duration: number;
  format: string;
  style: string;
  status: string;
  url?: string;
  thumbnailUrl?: string;
  createdAt: string;
}

export default function VideoDetailPage() {
  const { videoId } = useParams();
  const { isLoggedIn } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  // Video verilerini çekmek için sorgu
  const {
    data: video,
    isLoading,
    isError,
    error
  } = useQuery<VideoDetails>({
    queryKey: ['/api/videos', videoId],
    retry: 1,
    enabled: isLoggedIn && !!videoId // Sadece giriş yapılmışsa ve ID varsa çalıştır
  });

  // Örnek video verisi (normalde API'den gelecek)
  const sampleVideo = {
    id: Number(videoId),
    text: "Yapay zeka teknolojileri hakkında kısa bir tanıtım. Günümüzde yapay zekanın birçok alanda kullanımı yaygınlaşıyor ve bu teknolojiler hayatımızın her alanına entegre oluyor. Bu videoda yapay zekanın temel kavramlarını ve kullanım alanlarını inceliyoruz.",
    duration: 3,
    format: "16/9",
    style: "Modern",
    status: "completed",
    url: "https://example.com/videos/123.mp4", // Örnek URL
    thumbnailUrl: "https://images.unsplash.com/photo-1677442135309-c374cd55d7de?q=80&w=2832&auto=format&fit=crop",
    createdAt: "2023-05-15T10:30:00Z"
  };

  // Gerçek veri gelene kadar örnek veriyi kullan
  const displayVideo = video || sampleVideo;
  
  // Video indirme fonksiyonu
  const handleDownload = () => {
    // Gerçek uygulamada URL üzerinden indirme işlemi yapılır
    toast({
      title: "Video indiriliyor",
      description: "Video indirme işleminiz başladı."
    });
  };
  
  // Video paylaşma fonksiyonu
  const handleShare = () => {
    setIsShareModalOpen(true);
  };
  
  // Video silme fonksiyonu
  const handleDelete = () => {
    // Silme onayı iste
    const isConfirmed = window.confirm("Bu videoyu silmek istediğinize emin misiniz?");
    if (isConfirmed) {
      toast({
        title: "Video silindi",
        description: "Video başarıyla silindi."
      });
      navigate("/videos");
    }
  };
  
  if (!isLoggedIn) {
    // Kullanıcı giriş yapmamışsa
    return (
      <div className="py-16 bg-darkBg min-h-screen">
        <div className="container mx-auto px-4">
          <div className="bg-darkSurface rounded-xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <span className="material-icons text-5xl text-mediumText">lock</span>
            </div>
            <h3 className="text-xl font-medium mb-2">Giriş Yapmanız Gerekiyor</h3>
            <p className="text-mediumText mb-6">
              Bu içeriği görüntülemek için lütfen giriş yapın.
            </p>
            <Link href="/">
              <Button
                className="bg-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-full font-medium transition-all"
              >
                <span className="material-icons mr-2">home</span>
                Ana Sayfaya Dön
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-16 bg-darkBg min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link href="/videos">
              <Button
                variant="ghost"
                className="text-mediumText hover:text-white mb-4"
              >
                <span className="material-icons mr-2">arrow_back</span>
                Videolarım
              </Button>
            </Link>
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-5 w-1/2" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Skeleton className="w-full aspect-video rounded-lg" />
            </div>
            
            <div className="bg-darkSurface rounded-lg p-6">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              
              <div className="flex flex-wrap gap-2 mb-6">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
              
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-16 bg-darkBg min-h-screen">
        <div className="container mx-auto px-4">
          <div className="bg-darkSurface rounded-xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <span className="material-icons text-5xl text-destructive">error</span>
            </div>
            <h3 className="text-xl font-medium mb-2">Video yüklenirken bir hata oluştu</h3>
            <p className="text-mediumText mb-6">
              Bu video bulunamadı veya erişim izniniz yok.
            </p>
            <Link href="/videos">
              <Button
                className="bg-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-full font-medium transition-all"
              >
                <span className="material-icons mr-2">movie</span>
                Videolarıma Dön
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const date = new Date(displayVideo.createdAt);
  const formattedDate = new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  // Format dönüşümü
  const formatLabels: { [key: string]: string } = {
    "16/9": "Yatay (16:9)",
    "9/16": "Dikey (9:16)",
    "4/5": "Kare (4:5)"
  };

  return (
    <div className="py-16 bg-darkBg min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href="/videos">
            <Button
              variant="ghost"
              className="text-mediumText hover:text-white mb-4"
            >
              <span className="material-icons mr-2">arrow_back</span>
              Videolarım
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Video Detayları</h1>
          <p className="text-mediumText">
            {formattedDate} tarihinde oluşturuldu
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video oynatıcı */}
          <div className="lg:col-span-2">
            {displayVideo.status === "completed" ? (
              <div className="relative aspect-video bg-darkSurface rounded-lg overflow-hidden shadow-lg">
                {displayVideo.url ? (
                  <video
                    controls
                    poster={displayVideo.thumbnailUrl}
                    className="w-full h-full object-cover"
                  >
                    <source src={displayVideo.url} type="video/mp4" />
                    Tarayıcınız video etiketini desteklemiyor.
                  </video>
                ) : (
                  <>
                    <img
                      src={displayVideo.thumbnailUrl}
                      alt="Video önizleme"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <button className="bg-primary bg-opacity-90 text-white rounded-full w-16 h-16 flex items-center justify-center">
                        <span className="material-icons text-3xl">play_arrow</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="relative aspect-video bg-darkSurface rounded-lg overflow-hidden shadow-lg flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                <p className="text-lg font-medium text-white">Videonuz İşleniyor</p>
                <p className="text-mediumText">Bu işlem birkaç dakika sürebilir.</p>
              </div>
            )}
            
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Video Metni</h2>
              <div className="bg-darkSurface rounded-lg p-4 text-mediumText">
                {displayVideo.text}
              </div>
            </div>
          </div>
          
          {/* Video bilgileri ve aksiyonlar */}
          <div className="bg-darkSurface rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Video Bilgileri</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-mediumText">Durum:</p>
                <p className="font-medium">
                  {displayVideo.status === "completed" ? (
                    <span className="flex items-center">
                      <span className="material-icons text-green-500 mr-1">check_circle</span>
                      Tamamlandı
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <span className="material-icons text-amber-500 mr-1">pending</span>
                      İşleniyor
                    </span>
                  )}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-mediumText">Süre:</p>
                <p className="font-medium">{displayVideo.duration} dakika</p>
              </div>
              
              <div>
                <p className="text-sm text-mediumText">Format:</p>
                <p className="font-medium">{formatLabels[displayVideo.format] || displayVideo.format}</p>
              </div>
              
              <div>
                <p className="text-sm text-mediumText">Stil:</p>
                <p className="font-medium">{displayVideo.style}</p>
              </div>
              
              <div>
                <p className="text-sm text-mediumText">Kullanılan Puan:</p>
                <p className="font-medium">{calculateVideoPoints(displayVideo.duration)} puan</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {displayVideo.status === "completed" && (
                <>
                  <Button
                    className="w-full bg-primary hover:bg-opacity-90 text-white font-medium transition-all"
                    onClick={handleDownload}
                  >
                    <span className="material-icons mr-2">download</span>
                    İndir
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:bg-opacity-10 font-medium transition-all"
                    onClick={handleShare}
                  >
                    <span className="material-icons mr-2">share</span>
                    Paylaş
                  </Button>
                </>
              )}
              
              <Button
                variant="outline"
                className="w-full border-destructive text-destructive hover:bg-destructive hover:bg-opacity-10 font-medium transition-all"
                onClick={handleDelete}
              >
                <span className="material-icons mr-2">delete</span>
                Videoyu Sil
              </Button>
            </div>
          </div>
        </div>
        
        {/* Benzer videolar önerisi */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Benzer Videolar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-darkSurface rounded-lg overflow-hidden border border-darkBorder hover:border-primary transition-all duration-300">
              <div className="w-full h-40 bg-darkBg flex items-center justify-center">
                <span className="material-icons text-5xl text-mediumText">movie</span>
              </div>
              <div className="p-4">
                <p className="text-sm text-mediumText mb-2">27 Mayıs 2023</p>
                <p className="font-medium mb-3 line-clamp-2">Teknoloji trendleri ve geleceğin inovasyonları hakkında bilgilendirici video</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-block bg-darkBg text-mediumText text-xs px-2 py-1 rounded-full">
                    Yatay (16:9)
                  </span>
                  <span className="inline-block bg-darkBg text-mediumText text-xs px-2 py-1 rounded-full">
                    Kurumsal
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-darkSurface rounded-lg overflow-hidden border border-darkBorder hover:border-primary transition-all duration-300">
              <div className="w-full h-40 bg-darkBg flex items-center justify-center">
                <span className="material-icons text-5xl text-mediumText">movie</span>
              </div>
              <div className="p-4">
                <p className="text-sm text-mediumText mb-2">12 Haziran 2023</p>
                <p className="font-medium mb-3 line-clamp-2">Dijital pazarlama stratejileri ve sosyal medya kullanımı</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-block bg-darkBg text-mediumText text-xs px-2 py-1 rounded-full">
                    Kare (4:5)
                  </span>
                  <span className="inline-block bg-darkBg text-mediumText text-xs px-2 py-1 rounded-full">
                    Modern
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Paylaşım modalı (basit bir örnek) */}
        {isShareModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-darkSurface rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Videoyu Paylaş</h3>
                <button
                  className="text-mediumText hover:text-white"
                  onClick={() => setIsShareModalOpen(false)}
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-mediumText mb-2">Video bağlantısı:</p>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={`https://videoyap.com/share/${displayVideo.id}`}
                    readOnly
                    className="flex-1 px-3 py-2 rounded-l-lg bg-darkBg border border-darkBorder text-white focus:border-primary focus:outline-none"
                  />
                  <Button
                    className="rounded-l-none bg-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(`https://videoyap.com/share/${displayVideo.id}`);
                      toast({
                        title: "Kopyalandı",
                        description: "Video bağlantısı panoya kopyalandı."
                      });
                    }}
                  >
                    <span className="material-icons">content_copy</span>
                  </Button>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-mediumText mb-3">Sosyal medyada paylaş:</p>
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-blue-600 hover:bg-opacity-90">
                    <span className="material-icons mr-2">facebook</span>
                    Facebook
                  </Button>
                  <Button className="flex-1 bg-sky-500 hover:bg-opacity-90">
                    <span className="material-icons mr-2">twitter</span>
                    Twitter
                  </Button>
                  <Button className="flex-1 bg-green-600 hover:bg-opacity-90">
                    <span className="material-icons mr-2">whatsapp</span>
                    WhatsApp
                  </Button>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full border-darkBorder text-mediumText hover:text-white"
                onClick={() => setIsShareModalOpen(false)}
              >
                Kapat
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}