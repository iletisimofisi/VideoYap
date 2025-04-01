import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, Star, Award, Briefcase, Code, HeartHandshake, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-white mb-4">VideoYap Hakkında</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Türkçe içerikleri videoya dönüştürmek için yapay zeka destekli çözümler sunuyoruz
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-6">Hikayemiz</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              VideoYap, 2023 yılında içerik üreticilerinin ve işletmelerin profesyonel videolar oluşturmasını kolaylaştırmak amacıyla kuruldu. Yapay zeka teknolojisinin gelişmesiyle birlikte, metin içeriklerini otomatik olarak videolara dönüştüren bir platform yaratma vizyonuyla yola çıktık.
            </p>
            <p>
              Özellikle Türkçe içeriklere odaklanarak, kullanıcı dostu bir arayüz ile herkesin kolayca profesyonel videolar oluşturabilmesini hedefledik. VideoYap, yaşlılar, çocuklar ve dijital dünyaya yeni adım atanlar için bile kullanılabilecek kadar sade ve anlaşılır bir platform olarak tasarlandı.
            </p>
            <p>
              Bugün binlerce kullanıcımız, eğitimden pazarlamaya, sosyal medya içeriklerinden kurumsal tanıtımlara kadar çeşitli alanlarda VideoYap'ı kullanarak zamandan ve maliyetten tasarruf ediyor, aynı zamanda etkileyici içerikler üretiyor.
            </p>
          </div>
        </div>
        
        <div className="relative">
          <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070" 
              alt="VideoYap Ekibi Çalışırken" 
              className="w-full h-auto"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-primary/20 rounded-full z-0"></div>
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-primary/10 rounded-full z-0"></div>
        </div>
      </div>
      
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-3">Misyonumuz ve Vizyonumuz</h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          İçerik üretimini demokratikleştirmek ve herkesin profesyonel videolar oluşturabilmesini sağlamak
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <Card className="bg-darkSurface border-darkBorder">
          <CardContent className="p-8">
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-6">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Misyonumuz</h3>
            <p className="text-gray-300">
              Yapay zeka teknolojisi ile metin içeriklerinin videolara dönüştürülmesini herkes için erişilebilir hale getirmek. Özellikle Türkçe konuşan kullanıcılar için özelleştirilmiş çözümler sunarak, dijital içerik üretimindeki teknik bariyerleri ortadan kaldırmak.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-darkSurface border-darkBorder">
          <CardContent className="p-8">
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Vizyonumuz</h3>
            <p className="text-gray-300">
              VideoYap'ı Türkiye'de ve dünyada video içerik üretiminde öncü bir platform haline getirmek. Yapay zeka teknolojisindeki yenilikleri takip ederek, sürekli gelişen ve kullanıcılarına en ileri video oluşturma deneyimini sunan bir ekosistem oluşturmak.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Değerlerimiz</h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          VideoYap olarak her kararımızda ve geliştirdiğimiz her özellikte temel değerlerimizi ön planda tutuyoruz
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <Card className="bg-darkSurface border-darkBorder">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Erişilebilirlik</h3>
            <p className="text-gray-300">
              Her yaştan ve teknik seviyeden kullanıcının kolayca kullanabileceği bir platform sunuyoruz. Teknolojinin herkes için olduğuna inanıyoruz.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-darkSurface border-darkBorder">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Yenilikçilik</h3>
            <p className="text-gray-300">
              Sürekli gelişen yapay zeka teknolojilerini takip ediyor ve platformumuzu her zaman en güncel özelliklerle donatıyoruz.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-darkSurface border-darkBorder">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <HeartHandshake className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Kullanıcı Odaklılık</h3>
            <p className="text-gray-300">
              Her kararımızda ve geliştirdiğimiz her özellikte kullanıcı deneyimini ön planda tutuyoruz. Geri bildirimler bizim için çok değerli.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Ekibimiz</h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Tutkulu ve deneyimli profesyonellerden oluşan ekibimiz, VideoYap'ı sürekli geliştirmek için çalışıyor
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {[
          {
            name: "Ahmet Yılmaz",
            role: "Kurucu & CEO",
            avatar: "AY",
            bio: "10+ yıllık teknoloji ve yapay zeka deneyimi"
          },
          {
            name: "Zeynep Kaya",
            role: "Ürün Müdürü",
            avatar: "ZK",
            bio: "Kullanıcı deneyimi ve ürün yönetimi uzmanı"
          },
          {
            name: "Emre Demir",
            role: "CTO",
            avatar: "ED",
            bio: "Yapay zeka ve video teknolojileri uzmanı"
          },
          {
            name: "Ayşe Güneş",
            role: "Tasarım Direktörü",
            avatar: "AG",
            bio: "Kullanıcı arayüzü ve görsel tasarım uzmanı"
          }
        ].map((member, index) => (
          <Card key={index} className="bg-darkSurface border-darkBorder overflow-hidden">
            <div className="p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarFallback className="bg-primary/20 text-primary text-xl font-bold">{member.avatar}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-primary mb-3">{member.role}</p>
              <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Briefcase className="w-4 h-4 mr-2" />
                Profil
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-primary/20 to-darkSurface rounded-lg p-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Vizyonumuzu Paylaşıyor musunuz?</h2>
            <p className="text-gray-300 mb-6">
              VideoYap ekibine katılarak geleceğin video teknolojilerini birlikte geliştirelim. İnovasyon, kullanıcı deneyimi ve yapay zeka konularında tutkulu profesyonelleri arıyoruz.
            </p>
            <Link href="/careers">
              <Button className="bg-primary">
                Kariyer Fırsatları
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-darkBg rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">15+</div>
              <div className="text-sm text-gray-400">Takım Üyesi</div>
            </div>
            <div className="bg-darkBg rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">5000+</div>
              <div className="text-sm text-gray-400">Kullanıcı</div>
            </div>
            <div className="bg-darkBg rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">25K+</div>
              <div className="text-sm text-gray-400">Oluşturulan Video</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Bize Ulaşın</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Sorularınız, geri bildirimleriniz veya iş birliği teklifleriniz için bize ulaşın
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-primary">
            İletişim Formu
          </Button>
          <Button variant="outline">
            destek@videoyap.com
          </Button>
        </div>
      </div>
    </div>
  );
}