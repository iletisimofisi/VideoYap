import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";

interface Notification {
  id: number;
  type: "video" | "points" | "account" | "system";
  message: string;
  read: boolean;
  date: Date;
  actionUrl?: string;
  details?: string;
}

export default function NotificationsPage() {
  const { isLoggedIn } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  
  // Bildirimleri yükleme (gerçek uygulamada API'den çekilir)
  useEffect(() => {
    if (isLoggedIn) {
      // Yükleme efekti
      setIsLoading(true);
      
      setTimeout(() => {
        // Örnek bildirimler
        const sampleNotifications: Notification[] = [
          {
            id: 1,
            type: "video",
            message: "Yapay zeka videosu başarıyla oluşturuldu",
            read: false,
            date: new Date(Date.now() - 1000 * 60 * 15), // 15 dakika önce
            actionUrl: "/videos/1",
            details: "Yapay zeka teknolojileri hakkında oluşturduğunuz 3 dakikalık video hazır. Hemen izleyebilir veya indirebilirsiniz."
          },
          {
            id: 2,
            type: "points",
            message: "Günlük 10 puan hesabınıza eklendi",
            read: false,
            date: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 saat önce
            actionUrl: "/profile",
            details: "VideoYap'ı her gün kullanarak ücretsiz puanlar kazanabilirsiniz. Bu puanlarla daha fazla video oluşturabilirsiniz."
          },
          {
            id: 3,
            type: "video",
            message: "Teknoloji trenler videosu işleniyor",
            read: true,
            date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 saat önce
            actionUrl: "/videos/3",
            details: "Videonuz oluşturuluyor. Bu işlem birkaç dakika sürebilir. İşlem tamamlandığında size bildirim göndereceğiz."
          },
          {
            id: 4,
            type: "account",
            message: "E-posta adresiniz başarıyla doğrulandı",
            read: true,
            date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 gün önce
            details: "Artık VideoYap'ın tüm özelliklerini kullanabilirsiniz. Profilinizi düzenleyerek daha fazla bilgi ekleyebilirsiniz."
          },
          {
            id: 5,
            type: "system",
            message: "Sistem bakımı hakkında bilgilendirme",
            read: true,
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 gün önce
            details: "Sistemimiz 22:00-23:00 saatleri arasında bakımda olacaktır. Bu süre içinde video oluşturma işlemi yapılamayacaktır. Anlayışınız için teşekkür ederiz."
          },
          {
            id: 6,
            type: "points",
            message: "Temel plana yükseltme - 50 puan/gün",
            read: true,
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 gün önce
            actionUrl: "/profile",
            details: "Temel plana yükselttiğiniz için teşekkür ederiz. Artık günlük 50 puan kazanacaksınız ve daha uzun videolar oluşturabileceksiniz."
          },
          {
            id: 7,
            type: "account",
            message: "VideoYap'a hoş geldiniz!",
            read: true,
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 14 gün önce
            details: "VideoYap ailesine katıldığınız için teşekkür ederiz. Metinden videoya dönüşüm yapabilen yapay zeka teknolojimiz ile harika içerikler oluşturabilirsiniz."
          }
        ];
        
        setNotifications(sampleNotifications);
        setIsLoading(false);
      }, 1000);
    }
  }, [isLoggedIn]);
  
  // Bildirimi okundu olarak işaretle
  const markAsRead = (notificationId: number) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };
  
  // Tüm bildirimleri okundu olarak işaretle
  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };
  
  // Seçilen tipe göre bildirimleri filtrele
  const filteredNotifications = activeTab === "all"
    ? notifications
    : notifications.filter(notification => notification.type === activeTab);
  
  // Okunmamış bildirim sayısı
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  // Zaman formatı
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} saniye önce`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} dakika önce`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} saat önce`;
    } else {
      return new Intl.DateTimeFormat("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    }
  };
  
  // Bildirim ikonunu türüne göre getir
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "video":
        return "movie";
      case "points":
        return "toll";
      case "account":
        return "person";
      case "system":
        return "info";
      default:
        return "notifications";
    }
  };
  
  // Her bildirim tipi için sayı
  const typeCounts = {
    video: notifications.filter(n => n.type === "video").length,
    points: notifications.filter(n => n.type === "points").length,
    account: notifications.filter(n => n.type === "account").length,
    system: notifications.filter(n => n.type === "system").length
  };
  
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
              Bildirimlerinizi görüntülemek için lütfen giriş yapın.
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
  
  const renderNotificationItem = (notification: Notification) => (
    <div 
      key={notification.id}
      className={`bg-darkSurface rounded-lg mb-3 overflow-hidden ${!notification.read ? 'border-l-4 border-primary' : ''}`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className={`w-10 h-10 rounded-full ${notification.type === 'video' ? 'bg-purple-900' : notification.type === 'points' ? 'bg-amber-900' : notification.type === 'account' ? 'bg-blue-900' : 'bg-gray-700'} flex items-center justify-center mr-3`}>
            <span className="material-icons text-white">{getNotificationIcon(notification.type)}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className={`font-medium ${notification.read ? '' : 'font-bold'}`}>{notification.message}</h3>
              <p className="text-xs text-mediumText ml-3 whitespace-nowrap">{formatTime(notification.date)}</p>
            </div>
            
            {notification.details && (
              <p className="text-sm text-mediumText mt-1">{notification.details}</p>
            )}
          </div>
        </div>
        
        {notification.actionUrl && (
          <div className="mt-3 flex justify-end">
            <Link href={notification.actionUrl} onClick={() => markAsRead(notification.id)}>
              <Button
                variant="ghost"
                className="text-primary hover:bg-primary hover:bg-opacity-10 h-8 px-3"
              >
                <span className="text-sm">Görüntüle</span>
                <span className="material-icons ml-1 text-sm">arrow_forward</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="py-16 bg-darkBg min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Bildirimler</h1>
            
            {unreadCount > 0 && (
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:bg-opacity-10"
                onClick={markAllAsRead}
              >
                <span className="material-icons mr-2">mark_email_read</span>
                Tümünü Okundu İşaretle
              </Button>
            )}
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-darkSurface w-full grid grid-cols-5">
              <TabsTrigger value="all" className="relative">
                Tümü
                <span className="ml-1 text-xs">{notifications.length}</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="relative">
                Video
                <span className="ml-1 text-xs">{typeCounts.video}</span>
              </TabsTrigger>
              <TabsTrigger value="points" className="relative">
                Puanlar
                <span className="ml-1 text-xs">{typeCounts.points}</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="relative">
                Hesap
                <span className="ml-1 text-xs">{typeCounts.account}</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="relative">
                Sistem
                <span className="ml-1 text-xs">{typeCounts.system}</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="bg-darkSurface rounded-lg p-4">
                  <div className="flex items-start">
                    <Skeleton className="w-10 h-10 rounded-full mr-3" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="bg-darkSurface rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <span className="material-icons text-5xl text-mediumText">notifications_off</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Hiç Bildirim Bulunamadı</h3>
              <p className="text-mediumText mb-6">
                Bu kategoride henüz bildiriminiz bulunmuyor.
              </p>
            </div>
          ) : (
            <div>
              {/* Okunmamış bildirimler */}
              {filteredNotifications.some(n => !n.read) && (
                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-3">Yeni Bildirimler</h2>
                  {filteredNotifications
                    .filter(notification => !notification.read)
                    .map(renderNotificationItem)}
                </div>
              )}
              
              {/* Okunmuş bildirimler */}
              {filteredNotifications.some(n => n.read) && (
                <div>
                  <h2 className="text-lg font-medium mb-3">Önceki Bildirimler</h2>
                  {filteredNotifications
                    .filter(notification => notification.read)
                    .map(renderNotificationItem)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}