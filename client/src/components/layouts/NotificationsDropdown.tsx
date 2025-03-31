import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { Link } from "wouter";

interface Notification {
  id: number;
  type: "video" | "points" | "account" | "system";
  message: string;
  read: boolean;
  date: Date;
  actionUrl?: string;
}

export function NotificationsDropdown() {
  const { isLoggedIn } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  // Bildirimler için gerçek uygulamada API'den çekilir
  useEffect(() => {
    if (isLoggedIn) {
      // Örnek bildirimler
      const sampleNotifications: Notification[] = [
        {
          id: 1,
          type: "video",
          message: "Videonuz başarıyla oluşturuldu. İndirmek için tıklayın.",
          read: false,
          date: new Date(Date.now() - 1000 * 60 * 15), // 15 dakika önce
          actionUrl: "/videos/1"
        },
        {
          id: 2,
          type: "points",
          message: "Günlük 10 puan hesabınıza eklendi.",
          read: false,
          date: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 saat önce
          actionUrl: "/profile"
        },
        {
          id: 3,
          type: "account",
          message: "E-posta adresiniz başarıyla doğrulandı.",
          read: true,
          date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 gün önce
        },
        {
          id: 4,
          type: "system",
          message: "Sistemimiz bakım nedeniyle 22:00-23:00 saatleri arasında geçici olarak kapalı olacaktır.",
          read: true,
          date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 gün önce
        }
      ];
      
      setNotifications(sampleNotifications);
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
      return `${Math.floor(diffInSeconds / 86400)} gün önce`;
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
  
  if (!isLoggedIn) {
    return null;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <span className="material-icons text-xl">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <div className="flex justify-between items-center p-4">
          <h3 className="font-medium">Bildirimler</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              className="text-xs text-mediumText hover:text-white px-2 h-auto"
              onClick={markAllAsRead}
            >
              Tümünü Okundu İşaretle
            </Button>
          )}
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-mediumText">
              <span className="material-icons mb-2">notifications_off</span>
              <p>Henüz bildiriminiz yok</p>
            </div>
          ) : (
            notifications.map(notification => (
              <DropdownMenuItem
                key={notification.id}
                className={`p-0 focus:bg-transparent ${!notification.read ? 'bg-primary bg-opacity-5' : ''}`}
              >
                <Link 
                  href={notification.actionUrl || "#"}
                  className="w-full block"
                  onClick={() => {
                    markAsRead(notification.id);
                    setIsOpen(false);
                  }}
                >
                  <div className={`p-3 flex cursor-pointer hover:bg-darkBg ${notification.read ? '' : 'border-l-2 border-primary'}`}>
                    <div className="mr-3">
                      <span className={`material-icons ${notification.read ? 'text-mediumText' : 'text-primary'}`}>
                        {getNotificationIcon(notification.type)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${notification.read ? '' : 'font-medium'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-mediumText mt-1">
                        {formatTime(notification.date)}
                      </p>
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <div className="p-2">
          <Link href="/notifications" onClick={() => setIsOpen(false)}>
            <Button
              variant="ghost"
              className="w-full justify-center text-primary hover:bg-primary hover:bg-opacity-10"
            >
              Tüm Bildirimleri Gör
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}