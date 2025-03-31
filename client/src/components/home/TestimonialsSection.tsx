import { Button } from "@/components/ui/button";

interface TestimonialProps {
  imageSrc: string;
  rating: number;
  text: string;
  name: string;
  age: number;
  profession: string;
  avatarSrc: string;
}

function Testimonial({ imageSrc, rating, text, name, age, profession, avatarSrc }: TestimonialProps) {
  return (
    <div className="bg-darkSurface rounded-xl shadow-lg overflow-hidden">
      <div className="aspect-video bg-darkBg relative">
        <img 
          src={imageSrc} 
          alt="Örnek Video" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <button className="bg-primary bg-opacity-90 text-white rounded-full w-12 h-12 flex items-center justify-center">
            <span className="material-icons">play_arrow</span>
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {[...Array(Math.floor(rating))].map((_, i) => (
              <span key={i} className="material-icons">star</span>
            ))}
            {rating % 1 !== 0 && (
              <span className="material-icons">star_half</span>
            )}
          </div>
          <span className="ml-2 text-mediumText">{rating.toFixed(1)}</span>
        </div>
        <p className="text-mediumText mb-4">
          "{text}"
        </p>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-darkBg">
            <img 
              src={avatarSrc} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-3">
            <h4 className="font-medium">{name}, {age}</h4>
            <p className="text-sm text-mediumText">{profession}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      imageSrc: "https://images.unsplash.com/photo-1551817958-c5b51e7b4a33?q=80&w=1974&auto=format&fit=crop",
      rating: 5.0,
      text: "Hiç teknoloji bilgim olmamasına rağmen, torunlarım için güzel videolar oluşturabiliyorum. Çok kolay ve pratik bir uygulama.",
      name: "Ayşe Hanım",
      age: 67,
      profession: "Emekli Öğretmen",
      avatarSrc: "https://images.unsplash.com/photo-1581579439002-e29ac578f8d4?q=80&w=1974&auto=format&fit=crop"
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=2069&auto=format&fit=crop",
      rating: 4.5,
      text: "Okul ödevlerim için harika videolar oluşturuyorum. Öğretmenlerim çok beğeniyor ve arkadaşlarım nasıl yaptığımı soruyor!",
      name: "Can Demir",
      age: 12,
      profession: "Öğrenci",
      avatarSrc: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?q=80&w=2070&auto=format&fit=crop"
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop",
      rating: 5.0,
      text: "Sosyal medya hesaplarım için düzenli içerik üretmemi çok kolaylaştırdı. Artık videolarım için saatlerce vakit harcamıyorum.",
      name: "Zeynep Kaya",
      age: 28,
      profession: "İçerik Üreticisi",
      avatarSrc: "https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=2080&auto=format&fit=crop"
    }
  ];

  return (
    <section id="examples" className="py-16 bg-darkBg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Kullanıcı <span className="text-primary">Deneyimleri</span></h2>
          <p className="text-lg text-mediumText max-w-2xl mx-auto">
            VideoYap ile oluşturulan videolar ve kullanıcı yorumları.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              imageSrc={testimonial.imageSrc}
              rating={testimonial.rating}
              text={testimonial.text}
              name={testimonial.name}
              age={testimonial.age}
              profession={testimonial.profession}
              avatarSrc={testimonial.avatarSrc}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            className="border border-primary text-primary hover:bg-primary hover:bg-opacity-10 px-8 py-3 rounded-full font-medium transition-all flex items-center justify-center mx-auto"
          >
            <span className="material-icons mr-2">slideshow</span>
            Daha Fazla Örnek
          </Button>
        </div>
      </div>
    </section>
  );
}
