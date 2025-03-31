import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle } from "lucide-react";

interface PlanFeature {
  included: boolean;
  text: string;
}

interface PricingPlanProps {
  title: string;
  description: string;
  price: string;
  priceUnit?: string;
  features: PlanFeature[];
  highlight?: boolean;
  buttonText: string;
  onButtonClick: () => void;
  badgeText?: string;
}

function PricingPlan({ 
  title, 
  description, 
  price, 
  priceUnit = "₺", 
  features, 
  highlight = false, 
  buttonText, 
  onButtonClick,
  badgeText
}: PricingPlanProps) {
  return (
    <div className={`bg-darkBg rounded-xl shadow-lg ${highlight ? 'transform md:scale-105 relative border border-primary' : 'border border-darkBorder hover:border-primary transition-all duration-300'} overflow-hidden`}>
      {badgeText && (
        <div className="bg-primary text-white text-sm font-medium py-1 text-center">
          {badgeText}
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-mediumText mb-6">{description}</p>
        <p className="text-3xl font-bold mb-6">{price} <span className="text-mediumText text-sm">{priceUnit}</span></p>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              {feature.included ? (
                <CheckCircle className="w-5 h-5 text-secondary mr-2" />
              ) : (
                <XCircle className="w-5 h-5 text-mediumText mr-2" />
              )}
              <span className={feature.included ? '' : 'text-mediumText'}>{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 pb-6">
        <Button
          onClick={onButtonClick}
          className={`w-full ${highlight 
            ? 'bg-primary hover:bg-opacity-90 text-white' 
            : 'bg-darkSurface hover:bg-primary hover:text-white border border-primary text-primary'} 
            py-2 rounded-lg font-medium transition-all`}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export function PointsSection() {
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();

  const handlePurchase = (plan: string) => {
    if (!isLoggedIn) {
      toast({
        title: "Giriş Yapın",
        description: "Satın alma işlemi için lütfen giriş yapın.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Satın Alma",
      description: `${plan} planı satın alınıyor...`,
    });
  };

  const plans = [
    {
      title: "Ücretsiz",
      description: "Yeni başlayanlar için ideal",
      price: "0",
      features: [
        { included: true, text: "10 Puan/Gün" },
        { included: true, text: "1 dakikalık videolar" },
        { included: true, text: "Basit stil seçenekleri" },
        { included: false, text: "Filigransız indirme" },
      ],
      buttonText: "Mevcut Plan",
      highlight: false
    },
    {
      title: "Temel",
      description: "Düzenli kullanıcılar için",
      price: "29",
      priceUnit: "₺/ay",
      features: [
        { included: true, text: "50 Puan/Gün" },
        { included: true, text: "3 dakikalık videolar" },
        { included: true, text: "Tüm stil seçenekleri" },
        { included: true, text: "Filigransız indirme" },
      ],
      buttonText: "Şimdi Satın Al",
      highlight: true,
      badgeText: "En Popüler"
    },
    {
      title: "Premium",
      description: "Profesyonel kullanım için",
      price: "79",
      priceUnit: "₺/ay",
      features: [
        { included: true, text: "Sınırsız Puan" },
        { included: true, text: "5 dakikalık videolar" },
        { included: true, text: "Özel stil seçenekleri" },
        { included: true, text: "Öncelikli destek" },
      ],
      buttonText: "Şimdi Satın Al",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-darkSurface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4"><span className="text-primary">Puan</span> Sistemi</h2>
          <p className="text-lg text-mediumText max-w-2xl mx-auto">
            VideoYap puanları ile daha fazla ve daha uzun videolar oluşturun.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <PricingPlan
              key={index}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              priceUnit={plan.priceUnit}
              features={plan.features}
              highlight={plan.highlight}
              buttonText={plan.buttonText}
              onButtonClick={() => handlePurchase(plan.title)}
              badgeText={plan.badgeText}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
