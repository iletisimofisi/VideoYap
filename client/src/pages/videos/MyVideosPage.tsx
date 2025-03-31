import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Video, Search, Filter, Plus, Clock, CheckCircle, XCircle, 
  ArrowUp, ArrowDown, Play
} from "lucide-react";

// Örnek video verileri
const mockVideos = [
  {
    id: 1,
    title: "Türkiye'nin Doğal Güzellikleri",
    thumbnail: "https://placehold.co/400x225/252530/FFFFFF/png?text=Türkiye+Doğası",
    duration: "3:45",
    createdAt: "2023-12-10T14:30:00Z",
    status: "completed",
    views: 125
  },
  {
    id: 2,
    title: "Sağlıklı Yaşam için Egzersiz İpuçları",
    thumbnail: "https://placehold.co/400x225/252530/FFFFFF/png?text=Egzersiz+İpuçları",
    duration: "5:20",
    createdAt: "2023-12-05T10:15:00Z",
    status: "completed",
    views: 87
  },
  {
    id: 3,
    title: "İstanbul Tarihi Yerler Turu",
    thumbnail: "https://placehold.co/400x225/252530/FFFFFF/png?text=İstanbul+Turu",
    duration: "8:10",
    createdAt: "2023-11-28T16:45:00Z",
    status: "completed",
    views: 210
  },
  {
    id: 4,
    title: "En Lezzetli Türk Yemekleri",
    thumbnail: "https://placehold.co/400x225/252530/FFFFFF/png?text=Türk+Yemekleri",
    duration: "6:30",
    createdAt: "2023-11-20T09:00:00Z",
    status: "completed",
    views: 156
  },
  {
    id: 5,
    title: "Yeni Video - İşleniyor",
    thumbnail: "https://placehold.co/400x225/252530/FFFFFF/png?text=İşleniyor",
    duration: "???",
    createdAt: "2023-12-15T13:25:00Z",
    status: "processing",
    views: 0
  },
  {
    id: 6,
    title: "Anadolu Kültürü",
    thumbnail: "https://placehold.co/400x225/252530/FFFFFF/png?text=Oluşturma+Başarısız",
    duration: "N/A",
    createdAt: "2023-12-14T11:10:00Z",
    status: "failed",
    views: 0
  }
];

type VideoStatus = "all" | "completed" | "processing" | "failed";

export default function MyVideosPage() {
  const { isLoggedIn } = useAuth();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<VideoStatus>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "mostViewed">("newest");

  // Kullanıcı giriş yapmamışsa ana sayfaya yönlendir
  if (!isLoggedIn) {
    navigate("/");
    return null;
  }

  // Filtreleme fonksiyonu
  const filterVideos = () => {
    let filtered = [...mockVideos];
    
    // Status filtreleme
    if (activeTab !== "all") {
      filtered = filtered.filter(video => video.status === activeTab);
    }
    
    // Arama filtreleme
    if (searchQuery) {
      filtered = filtered.filter(video => 
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sıralama
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortBy === "mostViewed") {
      filtered.sort((a, b) => b.views - a.views);
    }
    
    return filtered;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
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

  const filteredVideos = filterVideos();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Videolarım</h1>
          <p className="text-gray-400">Oluşturduğunuz tüm videoları burada yönetebilirsiniz.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate("/")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Yeni Video Oluştur
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Video ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-darkSurface border-darkBorder text-lightText"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className={`flex items-center ${sortBy === "newest" ? "bg-primary/20 text-primary" : ""}`}
            onClick={() => setSortBy("newest")}
          >
            <ArrowDown className="w-4 h-4 mr-1" />
            En Yeni
          </Button>
          <Button 
            variant="outline" 
            className={`flex items-center ${sortBy === "oldest" ? "bg-primary/20 text-primary" : ""}`}
            onClick={() => setSortBy("oldest")}
          >
            <ArrowUp className="w-4 h-4 mr-1" />
            En Eski
          </Button>
          <Button 
            variant="outline" 
            className={`flex items-center ${sortBy === "mostViewed" ? "bg-primary/20 text-primary" : ""}`}
            onClick={() => setSortBy("mostViewed")}
          >
            <Filter className="w-4 h-4 mr-1" />
            En Çok İzlenen
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as VideoStatus)} className="mb-8">
        <TabsList className="bg-darkSurface border-darkBorder mb-6">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            <Video className="w-4 h-4 mr-2" />
            Tümü
          </TabsTrigger>
          <TabsTrigger 
            value="completed" 
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Tamamlanan
          </TabsTrigger>
          <TabsTrigger 
            value="processing" 
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            <Clock className="w-4 h-4 mr-2" />
            İşleniyor
          </TabsTrigger>
          <TabsTrigger 
            value="failed" 
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Başarısız
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map(video => (
                <Card key={video.id} className="bg-darkSurface border-darkBorder overflow-hidden">
                  <Link href={`/videos/${video.id}`}>
                    <div className="relative aspect-video bg-darkBorder hover:opacity-90 transition-opacity cursor-pointer">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover"
                      />
                      {video.status === "completed" && (
                        <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                          {video.duration}
                        </div>
                      )}
                      {video.status === "completed" && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40">
                          <div className="bg-primary rounded-full p-3">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-start justify-between text-white">
                      <Link href={`/videos/${video.id}`} className="hover:text-primary transition-colors">
                        {video.title}
                      </Link>
                      <div className="flex items-center">
                        {getStatusIcon(video.status)}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between text-sm text-gray-400">
                      <div className="flex items-center">
                        <span>Durum: {getStatusText(video.status)}</span>
                      </div>
                      <span>{formatDate(video.createdAt)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 text-sm text-gray-400">
                    <div className="flex justify-between w-full">
                      <span>İzlenme: {video.views}</span>
                      <Link href={`/videos/${video.id}`} className="text-primary hover:underline">
                        Detaylar
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-600 rounded-lg">
              <Video className="w-16 h-16 mx-auto text-gray-500 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Hiç video bulunamadı</h3>
              <p className="text-gray-400 mb-6">Bu kritere uygun video bulunmuyor.</p>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => navigate("/")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Yeni Video Oluştur
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}