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
            <p className="text-gray-400 mb-6">
              Bu sekme, kullanıcı yönetim arayüzünü içerecektir. Kullanıcı arama, filtreleme, 
              detayları görüntüleme ve düzenleme işlemleri buradan yapılabilecektir.
            </p>
            <div className="p-12 border border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center">
              <Settings className="w-12 h-12 text-gray-500 mb-4" />
              <p className="text-gray-500 text-center">
                Kullanıcı yönetimi arayüzü yapım aşamasındadır.
                <br />
                Yakında kullanıma sunulacaktır.
              </p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card className="bg-darkSurface border-darkBorder p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Video className="w-5 h-5 mr-2 text-primary" />
              İçerik Yönetimi
            </h3>
            <p className="text-gray-400 mb-6">
              Bu sekme, video ve içerik yönetim arayüzünü içerecektir. Video onaylama, filtreleme, 
              içerik düzenleme ve içerik kuralları yönetimi buradan yapılabilecektir.
            </p>
            <div className="p-12 border border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center">
              <Video className="w-12 h-12 text-gray-500 mb-4" />
              <p className="text-gray-500 text-center">
                İçerik yönetimi arayüzü yapım aşamasındadır.
                <br />
                Yakında kullanıma sunulacaktır.
              </p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <Card className="bg-darkSurface border-darkBorder p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-primary" />
              Sistem Durumu ve Yapılandırma
            </h3>
            <p className="text-gray-400 mb-6">
              Bu sekme, sistem durumu izleme ve yapılandırma arayüzünü içerecektir. 
              API kullanımı, sistem performansı ve yapılandırma ayarları buradan yönetilebilecektir.
            </p>
            <div className="p-12 border border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center">
              <Coffee className="w-12 h-12 text-gray-500 mb-4" />
              <p className="text-gray-500 text-center">
                Sistem yönetimi arayüzü yapım aşamasındadır.
                <br />
                Yakında kullanıma sunulacaktır.
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}