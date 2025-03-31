interface FeatureProps {
  icon: string;
  iconColor: string;
  bgColor: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, iconColor, bgColor, title, description }: FeatureProps) {
  return (
    <div className="bg-darkSurface p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-start items-center mb-4">
        <div className={`${bgColor} p-3 rounded-lg`}>
          <span className={`material-icons ${iconColor} text-2xl`}>{icon}</span>
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
      icon: "smart_toy",
      iconColor: "text-primary",
      bgColor: "bg-primary bg-opacity-20",
      title: "Yapay Zeka Gücü",
      description: "Gelişmiş yapay zeka modelleri ile metinlerinizi etkileyici videolara dönüştürün."
    },
    {
      icon: "elderly",
      iconColor: "text-secondary",
      bgColor: "bg-secondary bg-opacity-20",
      title: "Kolay Kullanım",
      description: "Basit ve anlaşılır arayüz ile yaşlılar ve çocuklar dahil herkes kolayca kullanabilir."
    },
    {
      icon: "bolt",
      iconColor: "text-primary",
      bgColor: "bg-primary bg-opacity-20",
      title: "Hızlı Oluşturma",
      description: "Saniyeler içinde metninizi profesyonel görünümlü videolara dönüştürün."
    },
    {
      icon: "video_library",
      iconColor: "text-secondary",
      bgColor: "bg-secondary bg-opacity-20",
      title: "Çeşitli Formatlar",
      description: "Youtube shorts, TikTok, Instagram ve diğer platformlar için uygun boyutlarda videolar."
    },
    {
      icon: "card_giftcard",
      iconColor: "text-primary",
      bgColor: "bg-primary bg-opacity-20",
      title: "Ücretsiz Kullanım",
      description: "Ücretsiz üyelik sistemi ile puan kazanın ve daha fazla video oluşturun."
    },
    {
      icon: "collections",
      iconColor: "text-secondary",
      bgColor: "bg-secondary bg-opacity-20",
      title: "Hazır Medya",
      description: "Ücretsiz stok video ve görseller ile içeriklerinizi zenginleştirin."
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
              iconColor={feature.iconColor}
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
