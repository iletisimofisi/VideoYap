import { 
  Brain, Users, Zap, Video, Gift, Images
} from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  bgColor: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, bgColor, title, description }: FeatureProps) {
  return (
    <div className="bg-darkSurface p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-start items-center mb-4">
        <div className={`${bgColor} p-3 rounded-lg`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold ml-4">{title}</h3>
      </div>
      <p className="text-mediumText">
        {description}
      </p>
    </div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-primary" />,
      bgColor: "bg-primary bg-opacity-20",
      title: "Etkileşimli Eğitim",
      description: "İlk kez kullananlar için adım adım anlatımlı oyunlaştırılmış eğitim sistemi."
    },
    {
      icon: <Users className="w-6 h-6 text-secondary" />,
      bgColor: "bg-secondary bg-opacity-20",
      title: "Kişiselleştirilmiş Karşılama",
      description: "Kullanıcının adı ve son projelerinin yer aldığı kişiselleştirilmiş karşılama ekranı."
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      bgColor: "bg-primary bg-opacity-20",
      title: "Animasyonlu Geçişler",
      description: "Kullanıcı deneyimini iyileştirmek için animasyonlu yükleme geçişleri."
    },
    {
      icon: <Video className="w-6 h-6 text-secondary" />,
      bgColor: "bg-secondary bg-opacity-20",
      title: "Gelişmiş Video Düzenleme",
      description: "Gelişmiş video düzenleme araçları ve şablonlarıyla profesyonel sonuçlar."
    },
    {
      icon: <Gift className="w-6 h-6 text-primary" />,
      bgColor: "bg-primary bg-opacity-20",
      title: "AI Metin İşleme",
      description: "Gelişmiş yapay zeka metin işleme yetenekleriyle içerik kalitesini artırın."
    },
    {
      icon: <Images className="w-6 h-6 text-secondary" />,
      bgColor: "bg-secondary bg-opacity-20",
      title: "PostgreSQL Entegrasyonu",
      description: "Kullanıcı verileri ve içerik depolama için güçlü PostgreSQL veritabanı altyapısı."
    }
  ];

  return (
    <section id="features" className="py-16 bg-darkBg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Neden <span className="text-primary">VideoYap</span>?</h2>
          <p className="text-lg text-mediumText max-w-2xl mx-auto">
            Her yaştan kullanıcı için özel olarak tasarlanmış, kolay kullanımlı bir video oluşturma platformu.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              bgColor={feature.bgColor}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
