import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, MapPin, Clock, ChevronRight, Building, Users, Heart, Search, Calendar, Filter } from "lucide-react";

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  
  const jobListings = [
    {
      id: 1,
      title: "Yapay Zeka Mühendisi",
      department: "Mühendislik",
      location: "İstanbul",
      type: "Tam Zamanlı",
      remote: true,
      description: "Metni videoya dönüştüren yapay zeka modellerini geliştirmek ve optimize etmek için deneyimli bir Yapay Zeka Mühendisi arıyoruz.",
      requirements: [
        "Bilgisayar Bilimleri, Yapay Zeka veya ilgili alanda lisans derecesi",
        "Derin öğrenme ve doğal dil işleme konusunda en az 3 yıl deneyim",
        "Python, TensorFlow ve PyTorch ile çalışma deneyimi",
        "Büyük dil modelleri ve görüntü üretme modelleri konusunda bilgi",
        "Türkçe NLP deneyimi tercih sebebidir"
      ],
      postedDate: "15 Mart 2025"
    },
    {
      id: 2,
      title: "Ön Uç Geliştirici",
      department: "Mühendislik",
      location: "İstanbul",
      type: "Tam Zamanlı",
      remote: true,
      description: "Kullanıcı odaklı web arayüzleri oluşturmak için yaratıcı ve teknik yeteneklere sahip bir Ön Uç Geliştirici arıyoruz.",
      requirements: [
        "React ve TypeScript konusunda geniş deneyim",
        "Responsive tasarım ve modern CSS framework'leri (Tailwind, Styled Components) bilgisi",
        "UI/UX tasarım prensipleri konusunda anlayış",
        "En az 2 yıl profesyonel web geliştirme deneyimi",
        "Test güdümlü geliştirme ve performans optimizasyonu deneyimi"
      ],
      postedDate: "10 Mart 2025"
    },
    {
      id: 3,
      title: "Ürün Müdürü",
      department: "Ürün Yönetimi",
      location: "İstanbul",
      type: "Tam Zamanlı",
      remote: false,
      description: "Video oluşturma ürünlerimizin özelliklerini ve yol haritasını yönetecek deneyimli bir Ürün Müdürü arıyoruz.",
      requirements: [
        "SaaS ürünlerinde en az 4 yıl ürün yönetimi deneyimi",
        "Kullanıcı araştırması, prototipleme ve MVP geliştirme konusunda deneyim",
        "İş gereksinimleri ile teknik uygulama arasında köprü kurabilme",
        "Yapay zeka ve video teknolojileri konusunda bilgi",
        "Veri odaklı karar verme ve analitik deneyimi"
      ],
      postedDate: "5 Mart 2025"
    },
    {
      id: 4,
      title: "Pazarlama Uzmanı",
      department: "Pazarlama",
      location: "Uzaktan",
      type: "Tam Zamanlı",
      remote: true,
      description: "VideoYap'ın pazar erişimini genişletmek ve marka bilinirliğini artırmak için dijital pazarlama stratejileri geliştirecek bir Pazarlama Uzmanı arıyoruz.",
      requirements: [
        "Dijital pazarlama kanallarında en az 3 yıl deneyim",
        "SEO, SEM, sosyal medya ve e-posta pazarlama kampanyaları yürütme deneyimi",
        "İçerik pazarlaması ve marka stratejisi oluşturma konusunda bilgi",
        "Analitik araçları kullanarak kampanya performansını ölçme ve raporlama yeteneği",
        "Tercihen SaaS veya teknoloji şirketlerinde deneyim"
      ],
      postedDate: "1 Mart 2025"
    },
    {
      id: 5,
      title: "Müşteri Başarı Uzmanı",
      department: "Müşteri Hizmetleri",
      location: "Ankara",
      type: "Tam Zamanlı",
      remote: false,
      description: "Kullanıcılarımıza teknik destek sağlayacak ve platformumuzdan en iyi şekilde faydalanmalarına yardımcı olacak bir Müşteri Başarı Uzmanı arıyoruz.",
      requirements: [
        "Müşteri hizmetleri veya teknik destek alanında en az 2 yıl deneyim",
        "Mükemmel iletişim ve problem çözme becerileri",
        "SaaS platformları ve teknoloji ürünleri konusunda anlayış",
        "Sabırlı, empatik ve yardımsever bir yaklaşım",
        "CRM sistemleri ve destek biletleri yönetiminde deneyim"
      ],
      postedDate: "25 Şubat 2025"
    },
    {
      id: 6,
      title: "DevOps Mühendisi",
      department: "Mühendislik",
      location: "İstanbul",
      type: "Tam Zamanlı",
      remote: true,
      description: "Bulut altyapımızı yönetecek ve CI/CD süreçlerimizi optimize edecek bir DevOps Mühendisi arıyoruz.",
      requirements: [
        "AWS veya GCP gibi bulut platformlarında en az 3 yıl deneyim",
        "Docker, Kubernetes ve konteyner orkestrasyon deneyimi",
        "CI/CD pipeline'ları kurma ve yönetme deneyimi",
        "Infrastructure as Code (Terraform, CloudFormation) deneyimi",
        "Linux sistem yönetimi ve otomasyon konusunda güçlü beceriler"
      ],
      postedDate: "20 Şubat 2025"
    },
  ];
  
  // Tüm departmanları ve lokasyonları filtre için çıkartalım
  const uniqueDepartments = new Set(jobListings.map(job => job.department));
  const uniqueLocations = new Set(jobListings.map(job => job.location));
  
  const departments = ["all", ...Array.from(uniqueDepartments)];
  const locations = ["all", ...Array.from(uniqueLocations)];
  
  // Filtreleme fonksiyonu
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === "all" || job.location === selectedLocation;
    
    return matchesSearch && matchesDepartment && matchesLocation;
  });
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-white mb-4">VideoYap'ta Kariyer</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Yapay zeka ve video teknolojilerinin geleceğini şekillendirmek için bize katılın. VideoYap'ta çalışmak, yenilikçi bir ekibin parçası olmak demektir.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="relative">
          <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2070" 
              alt="VideoYap Ekip Çalışması" 
              className="w-full h-auto"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-primary/20 rounded-full z-0"></div>
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-primary/10 rounded-full z-0"></div>
        </div>
        
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-6">Neden VideoYap?</h2>
          <div className="space-y-5">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <Building className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Yenilikçi Teknoloji</h3>
                <p className="text-gray-300">
                  Yapay zeka ve video teknolojilerinin ön saflarında çalışarak, içerik oluşturma alanında devrim yaratıyoruz.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Harika Ekip Kültürü</h3>
                <p className="text-gray-300">
                  İşbirliği, şeffaflık ve sürekli öğrenme üzerine kurulu bir kültürde çalışırsınız. Fikirleriniz değerlidir ve katkılarınız fark yaratır.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Rekabetçi Avantajlar</h3>
                <p className="text-gray-300">
                  Esnek çalışma saatleri, uzaktan çalışma imkanı, sağlık sigortası, mesleki gelişim bütçesi ve benzersiz ofis ortamı sunuyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-darkSurface border border-darkBorder rounded-lg p-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-5">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Esnek Çalışma</h3>
            <p className="text-gray-300">
              Uzaktan çalışma seçenekleri ve esnek çalışma saatleri ile iş-yaşam dengenizi koruyun.
            </p>
          </div>
          
          <div className="text-center p-5">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">25 Gün İzin</h3>
            <p className="text-gray-300">
              Yılda 25 gün ücretli izin ile kendinize zaman ayırın ve enerji depolayın.
            </p>
          </div>
          
          <div className="text-center p-5">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Mesleki Gelişim</h3>
            <p className="text-gray-300">
              Konferanslar, eğitimler ve sertifikalar için yıllık gelişim bütçesi.
            </p>
          </div>
          
          <div className="text-center p-5">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sağlık Paketi</h3>
            <p className="text-gray-300">
              Kapsamlı özel sağlık sigortası ve düzenli sağlık kontrolleri.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">Açık Pozisyonlar</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Yeteneklerinizi sergileyebileceğiniz ve kariyerinizi ilerletebileceğiniz fırsatları keşfedin
          </p>
        </div>
        
        <div className="mb-8">
          <Card className="bg-darkSurface border-darkBorder">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Pozisyon veya anahtar kelime ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select 
                    className="w-full h-10 pl-10 rounded-md border border-darkBorder bg-darkBg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="all">Tüm Departmanlar</option>
                    {departments.filter(d => d !== "all").map(department => (
                      <option key={department} value={department}>{department}</option>
                    ))}
                  </select>
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select 
                    className="w-full h-10 pl-10 rounded-md border border-darkBorder bg-darkBg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="all">Tüm Lokasyonlar</option>
                    {locations.filter(l => l !== "all").map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="bg-darkBg border-darkBorder mb-6">
            <TabsTrigger value="all">Tümü ({jobListings.length})</TabsTrigger>
            <TabsTrigger value="engineering">Mühendislik ({jobListings.filter(job => job.department === "Mühendislik").length})</TabsTrigger>
            <TabsTrigger value="product">Ürün ({jobListings.filter(job => job.department === "Ürün Yönetimi").length})</TabsTrigger>
            <TabsTrigger value="marketing">Pazarlama ({jobListings.filter(job => job.department === "Pazarlama").length})</TabsTrigger>
            <TabsTrigger value="customer">Müşteri Hizmetleri ({jobListings.filter(job => job.department === "Müşteri Hizmetleri").length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {filteredJobs.length > 0 ? (
              <div className="space-y-6">
                {filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-darkBg border border-darkBorder rounded-lg">
                <h3 className="text-xl font-medium text-white mb-2">Aramanıza uygun pozisyon bulunamadı</h3>
                <p className="text-gray-400 mb-4">Lütfen farklı anahtar kelimeler veya filtreler deneyin</p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm("");
                  setSelectedDepartment("all");
                  setSelectedLocation("all");
                }}>
                  Filtreleri Temizle
                </Button>
              </div>
            )}
          </TabsContent>
          
          {["engineering", "product", "marketing", "customer"].map(tab => {
            const departmentName = {
              "engineering": "Mühendislik",
              "product": "Ürün Yönetimi",
              "marketing": "Pazarlama",
              "customer": "Müşteri Hizmetleri"
            }[tab];
            
            const departmentJobs = filteredJobs.filter(job => job.department === departmentName);
            
            return (
              <TabsContent key={tab} value={tab}>
                {departmentJobs.length > 0 ? (
                  <div className="space-y-6">
                    {departmentJobs.map(job => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-darkBg border border-darkBorder rounded-lg">
                    <h3 className="text-xl font-medium text-white mb-2">Bu departmanda açık pozisyon bulunamadı</h3>
                    <p className="text-gray-400 mb-4">Lütfen farklı bir departmanda arama yapın veya daha sonra tekrar kontrol edin</p>
                    <Button variant="outline" onClick={() => {
                      setSearchTerm("");
                      setSelectedDepartment("all");
                      setSelectedLocation("all");
                    }}>
                      Filtreleri Temizle
                    </Button>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
      
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">Başvuru Süreci</h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-10">
          VideoYap'ta işe alım sürecimiz şeffaf ve adil olacak şekilde tasarlanmıştır
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-darkSurface border border-darkBorder rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-2xl font-bold text-primary">1</div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Başvuru</h3>
            <p className="text-gray-300">
              İlgilendiğiniz pozisyon için CV ve kısa bir motivasyon mektubu ile başvurun. Başvurunuz 5 iş günü içinde değerlendirilecektir.
            </p>
          </div>
          
          <div className="bg-darkSurface border border-darkBorder rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-2xl font-bold text-primary">2</div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Görüşmeler</h3>
            <p className="text-gray-300">
              İlk olarak HR ekibiyle, ardından ilgili departman yöneticisi ve potansiyel takım arkadaşlarınızla görüşmeler yaparsınız.
            </p>
          </div>
          
          <div className="bg-darkSurface border border-darkBorder rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-2xl font-bold text-primary">3</div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Teklif ve Karşılama</h3>
            <p className="text-gray-300">
              Başarılı adaylara iş teklifi sunulur ve kabul edilmesi durumunda detaylı bir karşılama programı ile VideoYap'a entegre olursunuz.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-primary/20 to-darkSurface rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-3">Açık Pozisyon Bulamadınız mı?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Yetenekli kişilerle her zaman tanışmak isteriz. CV'nizi gönderin, uygun bir pozisyon açıldığında sizinle iletişime geçelim.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-primary">
            CV Gönder
          </Button>
          <Button variant="outline">
            İletişime Geç
          </Button>
        </div>
      </div>
    </div>
  );
}

// İş kartı bileşeni
interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  remote: boolean;
  description: string;
  requirements: string[];
  postedDate: string;
}

function JobCard({ job }: { job: Job }) {
  return (
    <Card className="bg-darkBg border-darkBorder overflow-hidden hover:border-primary transition-all duration-300">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h3 className="text-xl font-bold text-white mb-2 md:mb-0">{job.title}</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                {job.department}
              </Badge>
              <Badge variant="outline" className="bg-darkSurface text-gray-300">
                {job.type}
              </Badge>
              {job.remote && (
                <Badge variant="outline" className="bg-green-950 text-green-400 border-green-800">
                  Uzaktan
                </Badge>
              )}
            </div>
          </div>
          
          <p className="text-gray-300 mb-4">
            {job.description}
          </p>
          
          <div className="flex flex-wrap gap-6 text-gray-400 text-sm mb-6">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {job.location}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {job.type}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {`İlan Tarihi: ${job.postedDate}`}
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-white font-medium mb-2">Gereksinimler:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              {job.requirements.map((req: string, index: number) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
          
          <div className="pt-2">
            <Button>
              Başvur
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}