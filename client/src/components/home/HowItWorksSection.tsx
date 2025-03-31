interface StepProps {
  number: number;
  icon: string;
  bgColor: string;
  iconColor: string;
  title: string;
  description: string;
  isLast?: boolean;
}

function Step({ number, icon, bgColor, iconColor, title, description, isLast = false }: StepProps) {
  return (
    <>
      <div className="flex flex-col items-center max-w-xs text-center">
        <div className={`${bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
          <span className={`material-icons ${iconColor} text-3xl`}>{icon}</span>
        </div>
        <h3 className="text-xl font-semibold mb-3">{number}. {title}</h3>
        <p className="text-mediumText">
          {description}
        </p>
      </div>
      
      {!isLast && (
        <div className="hidden md:block text-primary">
          <span className="material-icons text-3xl">arrow_forward</span>
        </div>
      )}
    </>
  );
}

export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      icon: "edit",
      bgColor: "bg-primary bg-opacity-20",
      iconColor: "text-primary",
      title: "Metninizi Yazın",
      description: "Videolaştırmak istediğiniz metni girin veya yapay zeka asistanından yardım alın."
    },
    {
      number: 2,
      icon: "settings",
      bgColor: "bg-secondary bg-opacity-20",
      iconColor: "text-secondary",
      title: "Ayarları Seçin",
      description: "Video süresini, formatını ve görsel stilini belirleyin."
    },
    {
      number: 3,
      icon: "download",
      bgColor: "bg-primary bg-opacity-20",
      iconColor: "text-primary",
      title: "Videonuzu İndirin",
      description: "Oluşturulan videoyu indirin veya doğrudan sosyal medyada paylaşın."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-darkSurface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nasıl <span className="text-primary">Çalışır</span>?</h2>
          <p className="text-lg text-mediumText max-w-2xl mx-auto">
            Sadece üç kolay adımda metninizi profesyonel videolara dönüştürün.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-8 md:space-y-0 md:space-x-6 lg:space-x-12">
          {steps.map((step, index) => (
            <Step 
              key={index}
              number={step.number}
              icon={step.icon}
              bgColor={step.bgColor}
              iconColor={step.iconColor}
              title={step.title}
              description={step.description}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
