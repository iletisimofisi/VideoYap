import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts";
import { 
  Users, Video, Award, TrendingUp, BarChart3, PieChart as PieChartIcon,
  User, Settings, Database, Coffee, AlertCircle
} from "lucide-react";

// Örnek veriler
const userStats = [
  { month: 'Oca', kullanıcılar: 40 },
  { month: 'Şub', kullanıcılar: 45 },
  { month: 'Mar', kullanıcılar: 48 },
  { month: 'Nis', kullanıcılar: 52 },
  { month: 'May', kullanıcılar: 58 },
  { month: 'Haz', kullanıcılar: 65 },
  { month: 'Tem', kullanıcılar: 75 },
  { month: 'Ağu', kullanıcılar: 89 },
  { month: 'Eyl', kullanıcılar: 100 },
  { month: 'Eki', kullanıcılar: 112 },
  { month: 'Kas', kullanıcılar: 130 },
  { month: 'Ara', kullanıcılar: 150 }
];

const videoStats = [
  { month: 'Oca', videolar: 25 },
  { month: 'Şub', videolar: 30 },
  { month: 'Mar', videolar: 35 },
  { month: 'Nis', videolar: 42 },
  { month: 'May', videolar: 48 },
  { month: 'Haz', videolar: 55 },
  { month: 'Tem', videolar: 65 },
  { month: 'Ağu', videolar: 72 },
  { month: 'Eyl', videolar: 85 },
  { month: 'Eki', videolar: 95 },
  { month: 'Kas', videolar: 105 },
  { month: 'Ara', videolar: 120 }
];

const pieData = [
  { name: 'Ücretsiz', value: 65 },
  { name: 'Temel', value: 25 },
  { name: 'Premium', value: 10 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

export default function AdminDashboard() {
  const { isLoggedIn, user } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Premium kullanıcı ve admin kontrolü
  const isAdmin = isLoggedIn && user?.plan === "premium";

  useEffect(() => {
    // Eğer kullanıcı giriş yapmamışsa veya admin değilse ana sayfaya yönlendir
    if (!isLoggedIn || !isAdmin) {
      navigate("/");
    }
  }, [isLoggedIn, isAdmin, navigate]);

  // Kullanıcı admin değilse bir şey gösterme
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Yönetim Paneli</h1>
          <p className="text-gray-400">VideoYap platformunu yönetin ve istatistikleri görüntüleyin.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="mr-2">
            <Settings className="w-4 h-4 mr-2" />
            Ayarlar
          </Button>
          <Button className="bg-primary">
            <AlertCircle className="w-4 h-4 mr-2" />
            Sistem Durumu
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-darkSurface border-darkBorder">
          <CardContent className="p-6 flex items-center">
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium text-white">150</p>
              <p className="text-sm text-gray-400">Toplam Kullanıcı</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-darkSurface border-darkBorder">
          <CardContent className="p-6 flex items-center">
            <div className="bg-green-500/10 p-3 rounded-full mr-4">
              <Video className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-lg font-medium text-white">120</p>
              <p className="text-sm text-gray-400">Oluşturulan Video</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-darkSurface border-darkBorder">
          <CardContent className="p-6 flex items-center">
            <div className="bg-amber-500/10 p-3 rounded-full mr-4">
              <Award className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-lg font-medium text-white">35%</p>
              <p className="text-sm text-gray-400">Premium Kullanım</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-darkSurface border-darkBorder">
          <CardContent className="p-6 flex items-center">
            <div className="bg-blue-500/10 p-3 rounded-full mr-4">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-lg font-medium text-white">8.5k</p>
              <p className="text-sm text-gray-400">Toplam Puanlar</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="bg-darkSurface border-darkBorder w-full justify-start mb-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <BarChart3 className="w-4 h-4 mr-2" />
            Genel Bakış
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <User className="w-4 h-4 mr-2" />
            Kullanıcılar
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Video className="w-4 h-4 mr-2" />
            İçerik
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Database className="w-4 h-4 mr-2" />
            Sistem
          </TabsTrigger>
          <TabsTrigger value="site" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Site Yönetimi
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-darkSurface border-darkBorder">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                  Aylık Kullanıcı Artışı
                </CardTitle>
                <CardDescription>Son 12 ay içinde platform kullanıcı sayısı</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userStats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#333', 
                        border: 'none',
                        borderRadius: '6px',
                        color: '#fff'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="kullanıcılar" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="bg-darkSurface border-darkBorder">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <PieChartIcon className="w-5 h-5 mr-2 text-primary" />
                  Kullanıcı Üyelik Dağılımı
                </CardTitle>
                <CardDescription>Üyelik tiplerine göre kullanıcı dağılımı</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#333', 
                        border: 'none',
                        borderRadius: '6px',
                        color: '#fff'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="bg-darkSurface border-darkBorder lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Video className="w-5 h-5 mr-2 text-primary" />
                  Aylık Video Oluşturma İstatistikleri
                </CardTitle>
                <CardDescription>Son 12 ay içinde oluşturulan video sayısı</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={videoStats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#333', 
                        border: 'none',
                        borderRadius: '6px',
                        color: '#fff'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="videolar" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <Card className="bg-darkSurface border-darkBorder p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-primary" />
              Kullanıcı Yönetimi
            </h3>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full max-w-sm">
                <input 
                  type="text" 
                  placeholder="Kullanıcı ara..." 
                  className="w-full pl-10 pr-4 py-2 bg-darkBg text-white border border-darkBorder rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                  </svg>
                  Filtrele
                </Button>
                <Button className="bg-primary">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Kullanıcı Ekle
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto rounded-lg border border-darkBorder">
              <table className="min-w-full divide-y divide-darkBorder">
                <thead className="bg-darkBg">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Kullanıcı</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Üyelik</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Puanlar</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Video Sayısı</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Son Aktivite</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="bg-darkSurface divide-y divide-darkBorder">
                  {[
                    { 
                      id: 1, 
                      username: "Ahmet Yılmaz", 
                      email: "ahmet.yilmaz@example.com", 
                      plan: "premium", 
                      points: 1250, 
                      videos: 8, 
                      lastActive: "1 saat önce" 
                    },
                    { 
                      id: 2, 
                      username: "Fatma Demir", 
                      email: "fatma.demir@example.com", 
                      plan: "basic", 
                      points: 450, 
                      videos: 3, 
                      lastActive: "2 gün önce" 
                    },
                    { 
                      id: 3, 
                      username: "Mehmet Kaya", 
                      email: "mehmet.kaya@example.com", 
                      plan: "premium", 
                      points: 980, 
                      videos: 6, 
                      lastActive: "5 dakika önce" 
                    },
                    { 
                      id: 4, 
                      username: "Ayşe Şahin", 
                      email: "ayse.sahin@example.com", 
                      plan: "free", 
                      points: 120, 
                      videos: 1, 
                      lastActive: "1 hafta önce" 
                    },
                    { 
                      id: 5, 
                      username: "Mustafa Öztürk", 
                      email: "mustafa.ozturk@example.com", 
                      plan: "basic", 
                      points: 580, 
                      videos: 4, 
                      lastActive: "3 saat önce" 
                    }
                  ].map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-primary/30 rounded-full flex items-center justify-center text-primary font-medium">
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{user.username}</div>
                            <div className="text-sm text-gray-400">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.plan === 'premium' 
                            ? 'bg-purple-100 text-purple-800' 
                            : user.plan === 'basic' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.plan === 'premium' ? 'Premium' : user.plan === 'basic' ? 'Temel' : 'Ücretsiz'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.points}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.videos}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{user.lastActive}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-primary hover:text-primary-dark" title="Düzenle">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                          </button>
                          <button className="text-red-500 hover:text-red-700" title="Sil">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-400">
                Toplam 5 kullanıcıdan 1-5 arası gösteriliyor
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Önceki
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Sonraki
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card className="bg-darkSurface border-darkBorder p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Video className="w-5 h-5 mr-2 text-primary" />
              İçerik Yönetimi
            </h3>
            
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full max-w-sm">
                <input 
                  type="text" 
                  placeholder="Video ara..." 
                  className="w-full pl-10 pr-4 py-2 bg-darkBg text-white border border-darkBorder rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <select className="appearance-none bg-darkBg text-white border border-darkBorder rounded-md py-2 pl-3 pr-10 focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="">Tüm Durumlar</option>
                    <option value="pending">Beklemede</option>
                    <option value="approved">Onaylandı</option>
                    <option value="rejected">Reddedildi</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
                <Button variant="outline">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                  </svg>
                  Filtrele
                </Button>
              </div>
            </div>
            
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  title: "Türk Kahvesi Yapımı",
                  thumbnail: "https://picsum.photos/seed/video1/300/200",
                  creator: "Ahmet Yılmaz",
                  duration: "2:45",
                  status: "approved",
                  views: 1240,
                  likes: 87,
                  createdAt: "12.03.2025"
                },
                {
                  id: 2,
                  title: "İstanbul Boğazı Turu",
                  thumbnail: "https://picsum.photos/seed/video2/300/200",
                  creator: "Mehmet Kaya",
                  duration: "5:18",
                  status: "pending",
                  views: 890,
                  likes: 56,
                  createdAt: "18.03.2025"
                },
                {
                  id: 3,
                  title: "Geleneksel Türk Mutfağı",
                  thumbnail: "https://picsum.photos/seed/video3/300/200",
                  creator: "Fatma Demir",
                  duration: "8:32",
                  status: "approved",
                  views: 2150,
                  likes: 143,
                  createdAt: "25.03.2025"
                },
                {
                  id: 4,
                  title: "Efes Antik Kenti Turu",
                  thumbnail: "https://picsum.photos/seed/video4/300/200",
                  creator: "Ayşe Şahin",
                  duration: "6:51",
                  status: "rejected",
                  views: 0,
                  likes: 0,
                  createdAt: "28.03.2025"
                },
                {
                  id: 5,
                  title: "Kapadokya Balonları",
                  thumbnail: "https://picsum.photos/seed/video5/300/200",
                  creator: "Mustafa Öztürk",
                  duration: "4:12",
                  status: "pending",
                  views: 0,
                  likes: 0,
                  createdAt: "30.03.2025"
                },
                {
                  id: 6,
                  title: "Türk Çayı Demleme Sanatı",
                  thumbnail: "https://picsum.photos/seed/video6/300/200",
                  creator: "Zeynep Aydın",
                  duration: "3:25",
                  status: "approved",
                  views: 980,
                  likes: 72,
                  createdAt: "01.04.2025"
                }
              ].map((video) => (
                <Card key={video.id} className="bg-darkBg border-darkBorder overflow-hidden">
                  <div className="relative aspect-video">
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Video className="w-12 h-12 text-white opacity-30" />
                      </div>
                      <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </span>
                      <span className={`absolute top-2 left-2 text-xs px-2 py-1 rounded ${
                        video.status === 'approved' ? 'bg-green-800 text-green-100' : 
                        video.status === 'rejected' ? 'bg-red-800 text-red-100' : 
                        'bg-yellow-800 text-yellow-100'
                      }`}>
                        {video.status === 'approved' ? 'Onaylandı' : 
                         video.status === 'rejected' ? 'Reddedildi' : 'Beklemede'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-medium line-clamp-1 mb-1">{video.title}</h4>
                    <p className="text-gray-400 text-sm mb-3">{video.creator}</p>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Görüntüleme: {video.views}</span>
                      <span>Beğeni: {video.likes}</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-gray-400">{video.createdAt}</span>
                      <div className="flex space-x-1">
                        <button className="text-primary hover:text-primary-dark p-1" title="Düzenle">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                        <button className="text-blue-500 hover:text-blue-700 p-1" title="Önizle">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                        </button>
                        <button className="text-red-500 hover:text-red-700 p-1" title="Sil">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-400">
                Toplam 24 videodan 1-6 arası gösteriliyor
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Önceki
                </Button>
                <Button variant="outline" size="sm">
                  Sonraki
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <Card className="bg-darkSurface border-darkBorder p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-primary" />
              Sistem Durumu ve Yapılandırma
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="bg-darkBg border-darkBorder">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    Sistem Performansı
                  </CardTitle>
                  <CardDescription>Aktif kaynaklar ve performans metrikleri</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-400">CPU Kullanımı</span>
                        <span className="text-sm text-white">28%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-400">Bellek Kullanımı</span>
                        <span className="text-sm text-white">42%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-400">Disk Kullanımı</span>
                        <span className="text-sm text-white">67%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-400">Ağ Trafiği</span>
                        <span className="text-sm text-white">18%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-darkBg border-darkBorder">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Çalışma Süresi ve Durum
                  </CardTitle>
                  <CardDescription>Sistem kullanılabilirliği ve çalışma süresi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-darkSurface rounded-lg">
                      <div className="font-bold text-2xl text-green-500 mb-1">99.98%</div>
                      <div className="text-sm text-gray-400">Kullanılabilirlik</div>
                    </div>
                    <div className="p-4 bg-darkSurface rounded-lg">
                      <div className="font-bold text-2xl text-white mb-1">45 gün</div>
                      <div className="text-sm text-gray-400">Çalışma Süresi</div>
                    </div>
                    <div className="p-4 bg-darkSurface rounded-lg">
                      <div className="font-bold text-2xl text-white mb-1">1.2s</div>
                      <div className="text-sm text-gray-400">Ort. Yanıt Süresi</div>
                    </div>
                    <div className="p-4 bg-darkSurface rounded-lg">
                      <div className="font-bold text-2xl text-white mb-1">12,345</div>
                      <div className="text-sm text-gray-400">API İstekleri/Gün</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-6">
              <Card className="bg-darkBg border-darkBorder">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    API Kullanımı
                  </CardTitle>
                  <CardDescription>API kullanım limitleri ve gerçek zamanlı performans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-darkBorder">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">API Hizmeti</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Kullanım</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Limit</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Durum</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-darkBorder">
                        {[
                          { service: "Video Oluşturma API", usage: "682/1000", percent: 68, status: "normal" },
                          { service: "Görüntü İşleme API", usage: "845/1000", percent: 85, status: "warning" },
                          { service: "Ses Sentezleme API", usage: "412/1000", percent: 41, status: "normal" },
                          { service: "Metin Analizi API", usage: "128/1000", percent: 13, status: "normal" },
                          { service: "Çeviri API", usage: "950/1000", percent: 95, status: "critical" }
                        ].map((api, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{api.service}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">{api.usage}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    api.status === 'normal' ? 'bg-green-500' : 
                                    api.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                                  }`} 
                                  style={{ width: `${api.percent}%` }}
                                ></div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                api.status === 'normal' ? 'bg-green-100 text-green-800' : 
                                api.status === 'warning' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {api.status === 'normal' ? 'Normal' : 
                                 api.status === 'warning' ? 'Uyarı' : 'Kritik'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-darkBg border-darkBorder">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Yapılandırma
                  </CardTitle>
                  <CardDescription>Sistem yapılandırma seçenekleri</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium text-white">Otomatik Yedekleme</p>
                        <p className="text-sm text-gray-400">Veritabanı günlük otomatik yedekleme</p>
                      </div>
                      <div className="bg-primary/10 border border-primary/20 rounded-full w-11 h-6 flex items-center justify-end px-1">
                        <div className="bg-primary w-4 h-4 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium text-white">Sistem Bildirimleri</p>
                        <p className="text-sm text-gray-400">Kritik hata durumlarında e-posta bildirim</p>
                      </div>
                      <div className="bg-primary/10 border border-primary/20 rounded-full w-11 h-6 flex items-center justify-end px-1">
                        <div className="bg-primary w-4 h-4 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium text-white">Güvenlik Protokolü</p>
                        <p className="text-sm text-gray-400">Gelişmiş güvenlik önlemleri</p>
                      </div>
                      <div className="bg-gray-700 border border-gray-600 rounded-full w-11 h-6 flex items-center px-1">
                        <div className="bg-gray-400 w-4 h-4 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium text-white">Geliştirici Modu</p>
                        <p className="text-sm text-gray-400">Detaylı hata ayıklama ve loglar</p>
                      </div>
                      <div className="bg-gray-700 border border-gray-600 rounded-full w-11 h-6 flex items-center px-1">
                        <div className="bg-gray-400 w-4 h-4 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-darkBg border-darkBorder">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    Sistem Olayları
                  </CardTitle>
                  <CardDescription>Son hatalar ve sistem uyarıları</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { 
                        level: "error", 
                        message: "Veritabanı bağlantı hatası: Timeout (10s)", 
                        time: "30 dk önce",
                        service: "PostgreSQL"
                      },
                      { 
                        level: "warning", 
                        message: "Yüksek bellek kullanımı tespit edildi", 
                        time: "1 saat önce",
                        service: "Sistem"
                      },
                      { 
                        level: "info", 
                        message: "Otomatik yedekleme başarıyla tamamlandı", 
                        time: "3 saat önce",
                        service: "Yedekleme"
                      },
                      { 
                        level: "warning", 
                        message: "API istekleri yüksek: Çeviri hizmeti", 
                        time: "5 saat önce",
                        service: "API"
                      },
                      { 
                        level: "info", 
                        message: "Sistem güncellemesi v2.5.1 yüklendi", 
                        time: "1 gün önce",
                        service: "Güncelleme"
                      }
                    ].map((event, index) => (
                      <div key={index} className="flex items-start p-3 bg-darkSurface rounded-lg">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          event.level === 'error' ? 'bg-red-900/30 text-red-500' : 
                          event.level === 'warning' ? 'bg-amber-900/30 text-amber-500' : 
                          'bg-blue-900/30 text-blue-500'
                        }`}>
                          {event.level === 'error' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          ) : event.level === 'warning' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <p className="text-sm font-medium text-white">{event.message}</p>
                            <span className="text-xs text-gray-400 ml-2">{event.time}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{event.service}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="site">
          <Card className="bg-darkSurface border-darkBorder p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Site İçerik Yönetimi
            </h3>
            
            <div className="mb-6">
              <Tabs defaultValue="header">
                <TabsList className="bg-darkBg border-darkBorder mb-4">
                  <TabsTrigger value="header">Header</TabsTrigger>
                  <TabsTrigger value="footer">Footer</TabsTrigger>
                  <TabsTrigger value="hero">Ana Sayfa Hero</TabsTrigger>
                  <TabsTrigger value="features">Özellikler</TabsTrigger>
                  <TabsTrigger value="howItWorks">Nasıl Çalışır</TabsTrigger>
                  <TabsTrigger value="testimonials">Referanslar</TabsTrigger>
                  <TabsTrigger value="theme">Tema</TabsTrigger>
                </TabsList>
                
                <TabsContent value="header" className="space-y-4">
                  <Card className="bg-darkBg border-darkBorder p-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Logo ve Navigasyon Ayarları</CardTitle>
                      <CardDescription>Site üst bölümü görünüm ayarlarını yapılandırın</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Site Logosu</label>
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-darkSurface border border-dashed border-darkBorder rounded flex items-center justify-center text-gray-400">
                              Logo
                            </div>
                            <div>
                              <Button variant="outline" size="sm" className="mb-2">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                </svg>
                                Yükle
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                                Kaldır
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Site Adı</label>
                          <input type="text" value="VideoYap" className="w-full px-3 py-2 bg-darkSurface border border-darkBorder rounded-md text-white" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Navigasyon Menü Öğeleri</label>
                        <div className="space-y-2">
                          {["Ana Sayfa", "Nasıl Çalışır?", "Örnekler", "Yardım"].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-darkSurface border border-darkBorder rounded-md">
                              <div className="flex items-center">
                                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
                                </svg>
                                <input type="text" value={item} className="bg-transparent border-none text-white focus:outline-none focus:ring-0" />
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                  </svg>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                  </svg>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button className="mt-2" variant="outline" size="sm">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                          Menü Öğesi Ekle
                        </Button>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="bg-primary">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Değişiklikleri Kaydet
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="footer" className="space-y-4">
                  <Card className="bg-darkBg border-darkBorder p-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Footer Ayarları</CardTitle>
                      <CardDescription>Site alt bölümü görünüm ayarlarını yapılandırın</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Footer Açıklaması</label>
                        <textarea 
                          className="w-full px-3 py-2 bg-darkSurface border border-darkBorder rounded-md text-white h-20"
                          defaultValue="VideoYap, Türkçe içeriklerinizi kolayca profesyonel videolara dönüştürmenizi sağlayan yapay zeka destekli bir platformdur."
                        ></textarea>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['Şirket', 'Destek', 'Yasal'].map((section, sectionIndex) => (
                          <div key={sectionIndex}>
                            <label className="block text-sm font-medium text-gray-400 mb-1">{section} Menüsü</label>
                            <input 
                              type="text" 
                              value={section} 
                              className="w-full px-3 py-2 bg-darkSurface border border-darkBorder rounded-md text-white mb-2" 
                            />
                            
                            <div className="space-y-2">
                              {[1, 2, 3].map((item) => (
                                <div key={item} className="flex items-center justify-between p-2 bg-darkSurface border border-darkBorder rounded-md">
                                  <div className="flex-1 grid grid-cols-2 gap-2">
                                    <input 
                                      type="text" 
                                      placeholder="Ad" 
                                      defaultValue={`${section} Öğe ${item}`}
                                      className="bg-transparent border-none text-white focus:outline-none focus:ring-0" 
                                    />
                                    <input 
                                      type="text" 
                                      placeholder="URL" 
                                      defaultValue="#"
                                      className="bg-transparent border-none text-white focus:outline-none focus:ring-0" 
                                    />
                                  </div>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                  </Button>
                                </div>
                              ))}
                            </div>
                            
                            <Button className="mt-2" variant="outline" size="sm">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                              </svg>
                              Öğe Ekle
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Sosyal Medya Bağlantıları</label>
                        <div className="space-y-2">
                          {[
                            { name: 'Twitter', url: 'https://twitter.com' },
                            { name: 'Facebook', url: 'https://facebook.com' },
                            { name: 'Instagram', url: 'https://instagram.com' },
                            { name: 'YouTube', url: 'https://youtube.com' }
                          ].map((social, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-darkSurface border border-darkBorder rounded-md">
                              <div className="flex-1 grid grid-cols-2 gap-2">
                                <input 
                                  type="text" 
                                  defaultValue={social.name}
                                  className="bg-transparent border-none text-white focus:outline-none focus:ring-0" 
                                />
                                <input 
                                  type="text" 
                                  defaultValue={social.url}
                                  className="bg-transparent border-none text-white focus:outline-none focus:ring-0" 
                                />
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Button className="mt-2" variant="outline" size="sm">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                          Sosyal Medya Ekle
                        </Button>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Telif Hakkı Metni</label>
                        <input 
                          type="text" 
                          defaultValue="© 2025 VideoYap. Tüm hakları saklıdır." 
                          className="w-full px-3 py-2 bg-darkSurface border border-darkBorder rounded-md text-white" 
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="bg-primary">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Değişiklikleri Kaydet
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="hero" className="space-y-4">
                  <Card className="bg-darkBg border-darkBorder p-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Ana Sayfa Hero Bölümü</CardTitle>
                      <CardDescription>Ana sayfanın üst kısmındaki tanıtım bölümünü düzenleyin</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Ana Başlık</label>
                          <input 
                            type="text" 
                            defaultValue="Metinlerinizi Profesyonel Videolara Dönüştürün" 
                            className="w-full px-3 py-2 bg-darkSurface border border-darkBorder rounded-md text-white" 
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Alt Başlık</label>
                          <input 
                            type="text" 
                            defaultValue="Yapay zeka ile metin içeriklerinizi hemen videolara dönüştürün." 
                            className="w-full px-3 py-2 bg-darkSurface border border-darkBorder rounded-md text-white" 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Açıklama Metni</label>
                        <textarea 
                          className="w-full px-3 py-2 bg-darkSurface border border-darkBorder rounded-md text-white h-20"
                          defaultValue="VideoYap ile içeriklerinizi saniyeler içinde etkileyici videolara dönüştürün. Metin girin, tarzı ve formatı seçin, yapay zeka sizin için profesyonel bir video oluştursun."
                        ></textarea>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Birincil Buton Metni</label>
                          <input 
                            type="text" 
                            defaultValue="Hemen Başla" 
                            className="w-full px-3 py-2 bg-darkSurface border border-darkBorder rounded-md text-white" 
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">İkincil Buton Metni</label>
                          <input 
                            type="text" 
                            defaultValue="Nasıl Çalışır?" 
                            className="w-full px-3 py-2 bg-darkSurface border border-darkBorder rounded-md text-white" 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Hero Görseli</label>
                        <div className="flex items-center space-x-4">
                          <div className="w-32 h-24 bg-darkSurface border border-dashed border-darkBorder rounded flex items-center justify-center text-gray-400">
                            Görsel
                          </div>
                          <div>
                            <Button variant="outline" size="sm" className="mb-2">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                              </svg>
                              Görsel Yükle
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                              Kaldır
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="bg-primary">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Değişiklikleri Kaydet
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="features" className="space-y-4">
                  <Card className="bg-darkBg border-darkBorder p-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Özellikler Bölümü</CardTitle>
                      <CardDescription>Site özellikler bölümünü düzenleyin</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Bölüm Başlığı</label>
                        <input 
                          type="text" 
                          defaultValue="Öne Çıkan Özellikler" 
                          className="w-full px-3 py-2 bg-darkSurface border border-darkBorder rounded-md text-white" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Bölüm Açıklaması</label>
                        <textarea 
                          className="w-full px-3 py-2 bg-darkSurface border border-darkBorder rounded-md text-white h-20"
                          defaultValue="VideoYap platformu, içeriklerinizi kolayca profesyonel videolara dönüştürmenizi sağlayan birçok özelliğe sahiptir."
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Özellik Kartları</label>
                        <div className="space-y-4">
                          {[
                            { title: "Kolay Kullanım", description: "Kullanıcı dostu arayüz ile herkes kolayca video oluşturabilir" },
                            { title: "Geniş Format Seçenekleri", description: "İçeriğinize uygun çeşitli video formatları arasından seçim yapın" },
                            { title: "Yapay Zeka Desteği", description: "İleri seviye yapay zeka ile kaliteli içerik üretimi" },
                            { title: "Çoklu Dil Desteği", description: "Birden fazla dilde içerik oluşturma imkanı" },
                            { title: "Otomatik Seslendirme", description: "Metinleriniz için otomatik seslendirme seçenekleri" },
                            { title: "Hızlı Oluşturma", description: "Dakikalar içinde profesyonel videolar oluşturun" }
                          ].map((feature, index) => (
                            <div key={index} className="bg-darkSurface border border-darkBorder rounded-md p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                                    </svg>
                                  </div>
                                  <input 
                                    type="text" 
                                    defaultValue={feature.title} 
                                    className="text-white font-medium bg-transparent border-none focus:outline-none focus:ring-0" 
                                  />
                                </div>
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                                    </svg>
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                  </Button>
                                </div>
                              </div>
                              <textarea 
                                defaultValue={feature.description} 
                                className="w-full px-0 py-1 bg-transparent border-none text-gray-400 focus:outline-none focus:ring-0"
                              ></textarea>
                            </div>
                          ))}
                        </div>
                        <Button className="mt-3" variant="outline" size="sm">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                          Özellik Ekle
                        </Button>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="bg-primary">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Değişiklikleri Kaydet
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="howItWorks" className="space-y-4">
                  <Card className="bg-darkBg border-darkBorder p-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Nasıl Çalışır Bölümü</CardTitle>
                      <CardDescription>Nasıl çalışır bölümünü düzenleyin</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Bölüm Başlığı</label>
                        <input 
                          type="text" 
                          defaultValue="VideoYap Nasıl Çalışır?" 
                          className="w-full px-3 py-2 bg-darkSurface border border-darkBorder rounded-md text-white" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Bölüm Açıklaması</label>
                        <textarea 
                          className="w-full px-3 py-2 bg-darkSurface border border-darkBorder rounded-md text-white h-20"
                          defaultValue="VideoYap ile video oluşturmak çok kolay. Sadece birkaç adımda profesyonel videolar oluşturabilirsiniz."
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Adım Kartları</label>
                        <div className="space-y-4">
                          {[
                            { title: "Metin Girin", description: "Video için oluşturmak istediğiniz içeriği metin olarak girin" },
                            { title: "Tarzı Seçin", description: "Videonuzun tarzını ve formatını seçin" },
                            { title: "Oluşturun", description: "Yapay zeka teknolojisiyle metninizi videoya dönüştürün" },
                            { title: "Paylaşın", description: "Oluşturulan videoyu indirin veya doğrudan paylaşın" }
                          ].map((step, index) => (
                            <div key={index} className="bg-darkSurface border border-darkBorder rounded-md p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3">
                                    {index + 1}
                                  </div>
                                  <input 
                                    type="text" 
                                    defaultValue={step.title} 
                                    className="text-white font-medium bg-transparent border-none focus:outline-none focus:ring-0" 
                                  />
                                </div>
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                                    </svg>
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                  </Button>
                                </div>
                              </div>
                              <textarea 
                                defaultValue={step.description} 
                                className="w-full px-0 py-1 bg-transparent border-none text-gray-400 focus:outline-none focus:ring-0"
                              ></textarea>
                            </div>
                          ))}
                        </div>
                        <Button className="mt-3" variant="outline" size="sm">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                          Adım Ekle
                        </Button>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="bg-primary">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Değişiklikleri Kaydet
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="testimonials" className="space-y-4">
                  <Card className="bg-darkBg border-darkBorder p-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Referanslar Bölümü</CardTitle>
                      <CardDescription>Müşteri referansları bölümünü düzenleyin</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Bölüm Başlığı</label>
                        <input 
                          type="text" 
                          defaultValue="Kullanıcılarımız Ne Diyor?" 
                          className="w-full px-3 py-2 bg-darkSurface border border-darkBorder rounded-md text-white" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Referanslar</label>
                        <div className="space-y-4">
                          {[
                            { 
                              name: "Ayşe Y.",
                              position: "İçerik Üreticisi",
                              content: "VideoYap sayesinde içeriklerimi çok daha hızlı ve profesyonel videolara dönüştürebiliyorum. Kesinlikle tavsiye ederim!"
                            },
                            { 
                              name: "Mehmet K.",
                              position: "E-ticaret Sahibi",
                              content: "Ürün tanıtım videolarımızı artık çok daha kolay oluşturuyoruz. Müşteri dönüşümlerimiz arttı!"
                            },
                            { 
                              name: "Zeynep A.",
                              position: "Eğitimci",
                              content: "Öğrencilerim için ders videoları hazırlamak artık çok daha kolay. Hem zamandan tasarruf sağlıyorum hem de daha kaliteli içerik üretiyorum."
                            }
                          ].map((testimonial, index) => (
                            <div key={index} className="bg-darkSurface border border-darkBorder rounded-md p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3">
                                    {testimonial.name.charAt(0)}
                                  </div>
                                  <div>
                                    <input 
                                      type="text" 
                                      defaultValue={testimonial.name} 
                                      className="text-white font-medium bg-transparent border-none focus:outline-none focus:ring-0 block" 
                                    />
                                    <input 
                                      type="text" 
                                      defaultValue={testimonial.position} 
                                      className="text-gray-400 text-sm bg-transparent border-none focus:outline-none focus:ring-0 block" 
                                    />
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                  </Button>
                                </div>
                              </div>
                              <textarea 
                                defaultValue={testimonial.content} 
                                className="w-full px-0 py-1 bg-transparent border-none text-gray-300 focus:outline-none focus:ring-0 h-20"
                              ></textarea>
                              <div className="flex mt-2">
                                <Button variant="outline" size="sm">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                  </svg>
                                  Resim Ekle
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button className="mt-3" variant="outline" size="sm">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                          Referans Ekle
                        </Button>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="bg-primary">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Değişiklikleri Kaydet
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="theme" className="space-y-4">
                  <Card className="bg-darkBg border-darkBorder p-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Site Teması</CardTitle>
                      <CardDescription>Site renklerini ve görünümünü özelleştirin</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Ana Renk</label>
                          <div className="flex">
                            <div className="w-10 h-10 rounded-l-md bg-primary border border-darkBorder"></div>
                            <input 
                              type="text" 
                              defaultValue="#9c27b0" 
                              className="flex-1 px-3 py-2 bg-darkSurface border border-l-0 border-darkBorder rounded-r-md text-white" 
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Arkaplan Rengi</label>
                          <div className="flex">
                            <div className="w-10 h-10 rounded-l-md bg-darkBg border border-darkBorder"></div>
                            <input 
                              type="text" 
                              defaultValue="#121212" 
                              className="flex-1 px-3 py-2 bg-darkSurface border border-l-0 border-darkBorder rounded-r-md text-white" 
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Metin Rengi</label>
                          <div className="flex">
                            <div className="w-10 h-10 rounded-l-md bg-white border border-darkBorder"></div>
                            <input 
                              type="text" 
                              defaultValue="#ffffff" 
                              className="flex-1 px-3 py-2 bg-darkSurface border border-l-0 border-darkBorder rounded-r-md text-white" 
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Vurgu Rengi</label>
                          <div className="flex">
                            <div className="w-10 h-10 rounded-l-md bg-primary/20 border border-darkBorder"></div>
                            <input 
                              type="text" 
                              defaultValue="#e1bee7" 
                              className="flex-1 px-3 py-2 bg-darkSurface border border-l-0 border-darkBorder rounded-r-md text-white" 
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Tema Modu</label>
                        <div className="flex space-x-4">
                          <div className="flex items-center">
                            <input type="radio" id="light" name="theme" className="mr-2" />
                            <label htmlFor="light" className="text-white">Açık Tema</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="dark" name="theme" className="mr-2" checked />
                            <label htmlFor="dark" className="text-white">Koyu Tema</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="auto" name="theme" className="mr-2" />
                            <label htmlFor="auto" className="text-white">Otomatik (Sistem)</label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Köşe Yuvarlaklığı</label>
                        <div className="flex items-center space-x-4">
                          <input 
                            type="range" 
                            className="w-full h-2 bg-darkBg rounded-lg appearance-none cursor-pointer" 
                            min="0" 
                            max="20" 
                            defaultValue="6"
                          />
                          <span className="text-white">6px</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Yazı Tipi</label>
                        <select className="w-full px-3 py-2 bg-darkSurface border border-darkBorder rounded-md text-white">
                          <option>Inter</option>
                          <option>Roboto</option>
                          <option>Open Sans</option>
                          <option>Montserrat</option>
                          <option>Poppins</option>
                        </select>
                      </div>
                      
                      <div>
                        <div className="p-6 bg-darkSurface border border-darkBorder rounded-md">
                          <h3 className="text-white text-lg font-medium mb-2">Tema Önizleme</h3>
                          <div className="flex space-x-2 mb-4">
                            <Button className="bg-primary text-white">Birincil Buton</Button>
                            <Button variant="outline">İkincil Buton</Button>
                            <Button variant="ghost">Hayalet Buton</Button>
                          </div>
                          <div className="flex space-x-4 mb-4">
                            <div className="w-16 h-8 rounded bg-darkBg border border-darkBorder flex items-center justify-center text-xs text-gray-400">Arkaplan</div>
                            <div className="w-16 h-8 rounded bg-primary flex items-center justify-center text-xs text-white">Ana Renk</div>
                            <div className="w-16 h-8 rounded bg-primary/20 flex items-center justify-center text-xs text-primary">Vurgu</div>
                          </div>
                          <p className="text-white mb-1">Normal Metin</p>
                          <p className="text-gray-400 text-sm">İkincil Metin</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="bg-primary">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Tema Ayarlarını Kaydet
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}