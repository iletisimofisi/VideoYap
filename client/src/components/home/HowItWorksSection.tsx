import { 
  Type, Palette, Film, ArrowRight 
} from "lucide-react";

interface StepProps {
  number: number;
  icon: React.ReactNode;
  bgColor: string;
  title: string;
  description: string;
  isLast?: boolean;
}

function Step({ number, icon, bgColor, title, description, isLast = false }: StepProps) {
  return (
    <>
      <div className="flex flex-col items-center max-w-xs text-center">
        <div className={`${bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{number}. {title}</h3>
        <p className="text-mediumText">
          {description}
        </p>
      </div>
      
      {!isLast && (
        <div className="hidden md:block text-primary">
          <ArrowRight className="w-6 h-6" />
        </div>
      )}
    </>
  );
}

export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      icon: <Type className="w-6 h-6 text-primary" />,
      bgColor: "bg-primary bg-opacity-20",
      title: "Metninizi Yazın",
      description: "Videolaştırmak istediğiniz metni girin veya yapay zeka asistanından yardım alın."
    },
    {
      number: 2,
      icon: <Palette className="w-6 h-6 text-secondary" />,
      bgColor: "bg-secondary bg-opacity-20",
      title: "Ayarları Seçin",
      description: "Video süresini, formatını ve görsel stilini belirleyin."
    },
    {
      number: 3,
      icon: <Film className="w-6 h-6 text-primary" />,
      bgColor: "bg-primary bg-opacity-20",
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
