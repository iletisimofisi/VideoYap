import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { formatPoints } from "@/lib/utils";

// Profil verisi bileşeni
function ProfileInfo() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState("kullanici@ornek.com"); // Örnek
  const { toast } = useToast();
  
  // Profil güncelleme işlemi
  const handleUpdateProfile = () => {
    // Gerçek uygulamada API isteği gönderilir
    setIsEditing(false);
    toast({
      title: "Profil güncellendi",
      description: "Kullanıcı bilgileriniz başarıyla güncellendi."
    });
  };
  
  return (
    <div className="bg-darkSurface rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Profil Bilgileri</h2>
        {!isEditing && (
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:bg-opacity-10"
            onClick={() => setIsEditing(true)}
          >
            <span className="material-icons mr-2">edit</span>
            Düzenle
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-darkBg border border-darkBorder text-white focus:border-primary focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">E-posta Adresi</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-darkBg border border-darkBorder text-white focus:border-primary focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Şifre</label>
            <input
              type="password"
              value="********"
              readOnly
              className="w-full px-4 py-2 rounded-lg bg-darkBg border border-darkBorder text-white focus:border-primary focus:outline-none"
            />
            <p className="text-xs text-mediumText mt-1">Şifrenizi değiştirmek için 'Şifre Değiştir' butonuna tıklayın.</p>
          </div>
          
          <div className="flex space-x-2 pt-4">
            <Button
              className="bg-primary hover:bg-opacity-90 text-white"
              onClick={handleUpdateProfile}
            >
              Kaydet
            </Button>
            <Button
              variant="outline"
              className="border-darkBorder text-mediumText hover:text-white"
              onClick={() => setIsEditing(false)}
            >
              İptal
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-mediumText">Kullanıcı Adı:</p>
            <p className="font-medium">{user?.username}</p>
          </div>
          
          <div>
            <p className="text-sm text-mediumText">E-posta Adresi:</p>
            <p className="font-medium">{email}</p>
          </div>
          
          <div>
            <p className="text-sm text-mediumText">Üyelik Planı:</p>
            <p className="font-medium flex items-center">
              {user?.plan === "premium" ? (
                <>
                  <span className="material-icons text-yellow-400 mr-1">stars</span>
                  Premium
                </>
              ) : user?.plan === "basic" ? (
                <>
                  <span className="material-icons text-blue-400 mr-1">workspace_premium</span>
                  Temel
                </>
              ) : (
                <>
                  <span className="material-icons text-mediumText mr-1">person</span>
                  Ücretsiz
                </>
              )}
            </p>
          </div>
          
          <div className="pt-2">
            <Button
              variant="outline"
              className="border-darkBorder text-mediumText hover:text-white"
            >
              <span className="material-icons mr-2">lock</span>
              Şifre Değiştir
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Puan detayları bileşeni
function PointsInfo() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  return (
    <div className="bg-darkSurface rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Puan Bilgileri</h2>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-mediumText">Mevcut Puanlarınız:</p>
          <p className="text-2xl font-bold text-primary">{formatPoints(user?.points || 0)}</p>
        </div>
        
        <div className="h-3 bg-darkBg rounded-full overflow-hidden">
          <div
            className="h-full bg-primary"
            style={{ width: `${Math.min((user?.points || 0) / 100, 100)}%` }}
          ></div>
        </div>
        
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <p className="text-mediumText">Bugün Kazanılan:</p>
            <p className="font-medium">+10 puan</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-mediumText">Bu Hafta Toplam:</p>
            <p className="font-medium">+70 puan</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-mediumText">Bu Ay Toplam:</p>
            <p className="font-medium">+250 puan</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <Button
          className="w-full bg-primary hover:bg-opacity-90 text-white"
          onClick={() => {
            window.location.href = "/#pricing";
          }}
        >
          <span className="material-icons mr-2">add_circle</span>
          Puan Satın Al
        </Button>
        
        {user?.plan === "free" && (
          <Button
            variant="outline"
            className="w-full border-primary text-primary hover:bg-primary hover:bg-opacity-10"
            onClick={() => {
              toast({
                title: "İşlem Başarılı",
                description: "Ücretsiz günlük puanlarınız başarıyla alındı.",
              });
            }}
          >
            <span className="material-icons mr-2">redeem</span>
            Günlük Ücretsiz Puanları Al
          </Button>
        )}
      </div>
    </div>
  );
}

// Üyelik detayları bileşeni
function SubscriptionInfo() {
  const { user } = useAuth();
  
  // Puan kullanım detayları
  const usageData = [
    { label: "Video Oluşturma", percentage: 65 },
    { label: "Yapay Zeka Asistanı", percentage: 20 },
    { label: "İndirme", percentage: 15 },
  ];
  
  // Abonelik bilgileri
  const subscription = {
    plan: user?.plan || "free",
    startDate: new Date("2023-01-15"),
    nextBillingDate: new Date("2023-08-15"),
    price: user?.plan === "premium" ? "79 ₺" : user?.plan === "basic" ? "29 ₺" : "0 ₺",
    status: "active"
  };
  
  const formattedStartDate = new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(subscription.startDate);
  
  const formattedNextBillingDate = new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(subscription.nextBillingDate);
  
  return (
    <div className="bg-darkSurface rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Üyelik Bilgileri</h2>
      
      <div className="space-y-4 mb-8">
        <div>
          <p className="text-sm text-mediumText">Mevcut Plan:</p>
          <p className="font-medium flex items-center">
            {subscription.plan === "premium" ? (
              <>
                <span className="material-icons text-yellow-400 mr-1">stars</span>
                Premium Plan
              </>
            ) : subscription.plan === "basic" ? (
              <>
                <span className="material-icons text-blue-400 mr-1">workspace_premium</span>
                Temel Plan
              </>
            ) : (
              <>
                <span className="material-icons text-mediumText mr-1">person</span>
                Ücretsiz Plan
              </>
            )}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-mediumText">Başlangıç Tarihi:</p>
          <p className="font-medium">{formattedStartDate}</p>
        </div>
        
        {subscription.plan !== "free" && (
          <div>
            <p className="text-sm text-mediumText">Sonraki Ödeme:</p>
            <p className="font-medium">{formattedNextBillingDate}</p>
          </div>
        )}
        
        <div>
          <p className="text-sm text-mediumText">Durum:</p>
          <p className="font-medium flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Aktif
          </p>
        </div>
        
        {subscription.plan !== "free" && (
          <div>
            <p className="text-sm text-mediumText">Aylık Ücret:</p>
            <p className="font-medium">{subscription.price}</p>
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Puan Kullanımı</h3>
        
        <div className="space-y-4">
          {usageData.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm">{item.label}</p>
                <p className="text-sm font-medium">{item.percentage}%</p>
              </div>
              <div className="h-2 bg-darkBg rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-3">
        {subscription.plan === "free" ? (
          <Link href="/#pricing">
            <Button
              className="w-full bg-primary hover:bg-opacity-90 text-white"
            >
              <span className="material-icons mr-2">upgrade</span>
              Premium'a Yükselt
            </Button>
          </Link>
        ) : (
          <>
            <Link href="/#pricing">
              <Button
                className="w-full bg-primary hover:bg-opacity-90 text-white"
              >
                <span className="material-icons mr-2">upgrade</span>
                Planı Değiştir
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full border-destructive text-destructive hover:bg-destructive hover:bg-opacity-10"
            >
              <span className="material-icons mr-2">cancel</span>
              Aboneliği İptal Et
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

// Kullanım İstatistikleri bileşeni
function UsageStats() {
  // İstatistik verisi
  const stats = [
    { label: "Oluşturulan Video", value: 24, icon: "movie", color: "text-primary" },
    { label: "Toplam Süre", value: "52 dk", icon: "schedule", color: "text-blue-400" },
    { label: "Harcanan Puan", value: 340, icon: "toll", color: "text-amber-400" },
    { label: "Ortalama Puan", value: 14.2, icon: "equalizer", color: "text-green-400" }
  ];
  
  // Örnek kullanım geçmişi
  const usageHistory = [
    { date: "2023-07-01", action: "Video oluşturma (3 dk)", points: -15 },
    { date: "2023-07-01", action: "Günlük puan", points: 10 },
    { date: "2023-06-30", action: "Video oluşturma (5 dk)", points: -30 },
    { date: "2023-06-29", action: "Premium plan yükseltme", points: 500 },
    { date: "2023-06-29", action: "Video oluşturma (1 dk)", points: -5 },
    { date: "2023-06-28", action: "Günlük puan", points: 10 }
  ];
  
  return (
    <div className="bg-darkSurface rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Kullanım İstatistikleri</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-darkBg p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <span className={`material-icons ${stat.color} mr-2`}>{stat.icon}</span>
              <p className="text-sm text-mediumText">{stat.label}</p>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Kullanım Geçmişi</h3>
        
        <div className="space-y-3">
          {usageHistory.map((item, index) => {
            const date = new Date(item.date);
            const formattedDate = new Intl.DateTimeFormat("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(date);
            
            return (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-darkBg rounded-lg"
              >
                <div>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-xs text-mediumText">{formattedDate}</p>
                </div>
                <p className={`font-medium ${item.points > 0 ? 'text-green-500' : 'text-amber-500'}`}>
                  {item.points > 0 ? '+' : ''}{item.points} puan
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { isLoggedIn, user } = useAuth();
  
  // Yükleme durumu
  const isLoading = false;
  
  if (isLoading) {
    return (
      <div className="py-16 bg-darkBg min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-10 w-40 mb-6" />
            
            <div>
              <Skeleton className="h-10 w-full mb-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Skeleton className="h-64 w-full rounded-lg mb-6" />
                </div>
                <div>
                  <Skeleton className="h-64 w-full rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
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
              Profilinizi görüntülemek için lütfen giriş yapın.
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Hesap Yönetimi</h1>
          
          <Tabs defaultValue="profile" className="mb-8">
            <TabsList className="w-full justify-start border-b border-darkBorder rounded-none p-0 h-auto mb-8">
              <TabsTrigger 
                value="profile" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 pb-3"
              >
                <span className="material-icons mr-2">person</span>
                Profil
              </TabsTrigger>
              <TabsTrigger 
                value="points" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 pb-3"
              >
                <span className="material-icons mr-2">toll</span>
                Puanlar
              </TabsTrigger>
              <TabsTrigger 
                value="subscription" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 pb-3"
              >
                <span className="material-icons mr-2">workspace_premium</span>
                Üyelik
              </TabsTrigger>
              <TabsTrigger 
                value="stats" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 pb-3"
              >
                <span className="material-icons mr-2">bar_chart</span>
                İstatistikler
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <ProfileInfo />
              </div>
              <div>
                <PointsInfo />
              </div>
            </TabsContent>
            
            <TabsContent value="points" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <UsageStats />
              </div>
              <div>
                <PointsInfo />
              </div>
            </TabsContent>
            
            <TabsContent value="subscription" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <SubscriptionInfo />
              </div>
              <div>
                <PointsInfo />
              </div>
            </TabsContent>
            
            <TabsContent value="stats" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <UsageStats />
              </div>
              <div>
                <PointsInfo />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between items-center bg-darkSurface rounded-lg p-4">
            <p className="text-sm text-mediumText">
              Hesabınızı silmek mi istiyorsunuz?
            </p>
            <Button
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive hover:bg-opacity-10"
            >
              <span className="material-icons mr-2 text-sm">delete_forever</span>
              Hesabı Sil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}