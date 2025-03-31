import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "wouter";

interface VideoCardProps {
  id: number;
  text: string;
  thumbnailUrl?: string;
  duration: number;
  format: string;
  style: string;
  status: string;
  createdAt: string;
}

function VideoCard({ id, text, thumbnailUrl, duration, format, style, status, createdAt }: VideoCardProps) {
  // Format dönüşümü
  const formatLabels: { [key: string]: string } = {
    "16/9": "Yatay (16:9)",
    "9/16": "Dikey (9:16)",
    "4/5": "Kare (4:5)"
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };
  
  return (
    <div className="bg-darkSurface rounded-lg overflow-hidden border border-darkBorder hover:border-primary transition-all duration-300">
      <Link href={`/videos/${id}`}>
        <div className="relative aspect-video bg-darkBg flex items-center justify-center cursor-pointer">
          {thumbnailUrl ? (
            <img 
              src={thumbnailUrl} 
              alt={text.substring(0, 50)} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="material-icons text-5xl text-mediumText">movie</span>
          )}
          
          {status === "processing" && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
              <p className="text-sm font-medium text-white">İşleniyor</p>
            </div>
          )}
          
          {status === "completed" && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <div className="bg-primary bg-opacity-90 text-white rounded-full w-12 h-12 flex items-center justify-center">
                <span className="material-icons">play_arrow</span>
              </div>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/videos/${id}`}>
          <p className="text-sm text-mediumText mb-2">{formatDate(createdAt)}</p>
          <p className="font-medium mb-3 line-clamp-2 hover:text-primary cursor-pointer">{text}</p>
        </Link>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-block bg-darkBg text-mediumText text-xs px-2 py-1 rounded-full">
            {formatLabels[format] || format}
          </span>
          <span className="inline-block bg-darkBg text-mediumText text-xs px-2 py-1 rounded-full">
            {style}
          </span>
          <span className="inline-block bg-darkBg text-mediumText text-xs px-2 py-1 rounded-full">
            {duration} dakika
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className={`flex items-center text-xs ${status === "completed" ? "text-green-500" : "text-amber-500"}`}>
            <span className="material-icons text-sm mr-1">{status === "completed" ? "check_circle" : "pending"}</span>
            {status === "completed" ? "Tamamlandı" : "İşleniyor"}
          </span>
          
          <Link href={`/videos/${id}`}>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-mediumText hover:text-primary"
            >
              <span className="material-icons">more_horiz</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-darkSurface rounded-lg p-8 text-center">
      <div className="flex justify-center mb-4">
        <span className="material-icons text-5xl text-mediumText">movie</span>
      </div>
      <h3 className="text-xl font-medium mb-2">Hiç Videonuz Yok</h3>
      <p className="text-mediumText mb-6">
        İlk videonuzu oluşturmak için yeni video oluştur butonuna tıklayın.
      </p>
      <Link href="/#demo">
        <Button
          className="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-full font-medium transition-all"
        >
          <span className="material-icons mr-2">add</span>
          Yeni Video Oluştur
        </Button>
      </Link>
    </div>
  );
}

function Pagination() {
  return (
    <div className="flex justify-center my-8">
      <nav className="flex items-center space-x-1">
        <Button
          variant="outline"
          size="icon"
          className="w-9 h-9 border-darkBorder text-mediumText"
          disabled
        >
          <span className="material-icons text-sm">chevron_left</span>
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="w-9 h-9 border-primary bg-primary bg-opacity-10 text-primary"
        >
          1
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="w-9 h-9 border-darkBorder text-mediumText hover:text-white"
        >
          2
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="w-9 h-9 border-darkBorder text-mediumText hover:text-white"
        >
          3
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="w-9 h-9 border-darkBorder text-mediumText hover:text-white"
        >
          <span className="material-icons text-sm">chevron_right</span>
        </Button>
      </nav>
    </div>
  );
}

export default function MyVideosPage() {
  const { isLoggedIn } = useAuth();
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  
  // Video verilerini çekmek için sorgu
  const {
    data: videos = [] as VideoCardProps[],
    isLoading,
    isError
  } = useQuery<VideoCardProps[]>({
    queryKey: ['/api/videos'],
    retry: 1,
    enabled: isLoggedIn // Sadece giriş yapılmışsa çalıştır
  });
  
  // Örnek video verileri (normalde API'den gelecek)
  const sampleVideos: VideoCardProps[] = [
    {
      id: 1,
      text: "Yapay zeka teknolojileri hakkında kısa bir tanıtım. Günümüzde yapay zekanın birçok alanda kullanımı yaygınlaşıyor ve bu teknolojiler hayatımızın her alanına entegre oluyor.",
      thumbnailUrl: "https://images.unsplash.com/photo-1677442135309-c374cd55d7de?q=80&w=2832&auto=format&fit=crop",
      duration: 3,
      format: "16/9",
      style: "Modern",
      status: "completed",
      createdAt: "2023-05-15T10:30:00Z"
    },
    {
      id: 2,
      text: "Dijital pazarlama stratejileri ve sosyal medya kullanımı. İşletmelerin online varlıklarını nasıl güçlendirebilecekleri konusunda ipuçları ve önemli stratejiler.",
      duration: 5,
      format: "9/16",
      style: "Kurumsal",
      status: "processing",
      createdAt: "2023-05-17T14:20:00Z"
    },
    {
      id: 3,
      text: "Sağlıklı yaşam ve beslenme. Günlük hayatta uygulanabilecek basit sağlık önerileri ve beslenme düzeni oluşturma yöntemleri.",
      thumbnailUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2853&auto=format&fit=crop",
      duration: 2,
      format: "4/5",
      style: "Doğal",
      status: "completed",
      createdAt: "2023-05-20T09:15:00Z"
    },
    {
      id: 4,
      text: "Teknoloji trendleri ve geleceğin inovasyonları. Yakın gelecekte hayatımızı değiştirecek teknolojik gelişmeler ve yeni nesil ürünler.",
      duration: 4,
      format: "16/9",
      style: "Modern",
      status: "completed",
      createdAt: "2023-05-25T16:45:00Z"
    },
    {
      id: 5,
      text: "Evden çalışma ve üretkenlik ipuçları. Uzaktan çalışırken verimliliği artıracak yöntemler ve dikkat dağınıklığıyla başa çıkma teknikleri.",
      thumbnailUrl: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=2940&auto=format&fit=crop",
      duration: 3,
      format: "16/9",
      style: "Minimal",
      status: "completed",
      createdAt: "2023-05-30T11:10:00Z"
    },
    {
      id: 6,
      text: "Sürdürülebilir yaşam ve çevre bilinci. Günlük hayatta uygulayabileceğimiz çevre dostu alışkanlıklar ve sürdürülebilir yaşam için öneriler.",
      duration: 6,
      format: "9/16",
      style: "Doğal",
      status: "processing",
      createdAt: "2023-06-02T13:25:00Z"
    }
  ];
  
  // Gerçek veri gelene kadar örnek veriyi kullan
  const displayVideos = videos.length > 0 ? videos : sampleVideos;
  
  // Duruma göre filtreleme yap
  const filteredVideos = filter === "all" 
    ? displayVideos 
    : displayVideos.filter(video => video.status === filter);
  
  // Sıralama işlemini yap
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    if (sort === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sort === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sort === "duration-asc") {
      return a.duration - b.duration;
    } else if (sort === "duration-desc") {
      return b.duration - a.duration;
    }
    return 0;
  });
  
  if (!isLoggedIn) {
    return (
      <div className="py-16 bg-darkBg min-h-screen">
        <div className="container mx-auto px-4">
          <div className="bg-darkSurface rounded-xl p-8 text-center max-w-lg mx-auto">
            <div className="flex justify-center mb-4">
              <span className="material-icons text-5xl text-mediumText">lock</span>
            </div>
            <h3 className="text-xl font-medium mb-2">Giriş Yapmanız Gerekiyor</h3>
            <p className="text-mediumText mb-6">
              Videolarınızı görüntülemek için lütfen giriş yapın.
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

  return (
    <div className="py-16 bg-darkBg min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Videolarım</h1>
          <p className="text-mediumText">
            Oluşturduğunuz tüm videoları burada görüntüleyebilir ve yönetebilirsiniz.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex-grow flex flex-wrap gap-3">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              className={filter === "all" 
                ? "bg-primary text-white" 
                : "border-darkBorder text-mediumText hover:text-white"
              }
              onClick={() => setFilter("all")}
            >
              Tümü
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              className={filter === "completed" 
                ? "bg-primary text-white" 
                : "border-darkBorder text-mediumText hover:text-white"
              }
              onClick={() => setFilter("completed")}
            >
              <span className="material-icons text-sm mr-1">check_circle</span>
              Tamamlanan
            </Button>
            <Button
              variant={filter === "processing" ? "default" : "outline"}
              className={filter === "processing" 
                ? "bg-primary text-white" 
                : "border-darkBorder text-mediumText hover:text-white"
              }
              onClick={() => setFilter("processing")}
            >
              <span className="material-icons text-sm mr-1">pending</span>
              İşlenenler
            </Button>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="w-full md:w-auto">
              <Select 
                value={sort} 
                onValueChange={setSort}
              >
                <SelectTrigger className="border-darkBorder w-full md:w-44">
                  <SelectValue placeholder="Sıralama" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">En Yeni</SelectItem>
                  <SelectItem value="oldest">En Eski</SelectItem>
                  <SelectItem value="duration-asc">Süre (Artan)</SelectItem>
                  <SelectItem value="duration-desc">Süre (Azalan)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Link href="/#demo">
              <Button 
                className="bg-primary text-white"
              >
                <span className="material-icons mr-2">add</span>
                Yeni Video
              </Button>
            </Link>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-darkSurface rounded-lg overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <div className="p-4">
                  <Skeleton className="h-4 w-1/3 mb-2" />
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-5 w-5/6 mb-4" />
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="bg-darkSurface rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <span className="material-icons text-5xl text-destructive">error</span>
            </div>
            <h3 className="text-xl font-medium mb-2">Videolar Yüklenemedi</h3>
            <p className="text-mediumText mb-6">
              Videolarınız yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.
            </p>
            <Button
              className="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-full font-medium transition-all"
              onClick={() => window.location.reload()}
            >
              <span className="material-icons mr-2">refresh</span>
              Yeniden Dene
            </Button>
          </div>
        ) : sortedVideos.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  id={video.id}
                  text={video.text}
                  thumbnailUrl={video.thumbnailUrl}
                  duration={video.duration}
                  format={video.format}
                  style={video.style}
                  status={video.status}
                  createdAt={video.createdAt}
                />
              ))}
            </div>
            
            {sortedVideos.length > 6 && <Pagination />}
          </>
        )}
      </div>
    </div>
  );
}