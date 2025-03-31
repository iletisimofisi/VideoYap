import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  id: number;
}

function FAQItem({ question, answer, isOpen, onToggle, id }: FAQItemProps) {
  return (
    <div className="py-5">
      <button 
        className="flex w-full justify-between items-center focus:outline-none"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faqContent${id}`}
      >
        <h3 className="text-xl font-medium text-left">{question}</h3>
        <span 
          className={`material-icons text-primary transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          expand_more
        </span>
      </button>
      <div 
        id={`faqContent${id}`}
        className={`mt-3 ${isOpen ? 'block' : 'hidden'}`}
      >
        <p className="text-mediumText">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState(1);

  const faqs = [
    {
      id: 1,
      question: "VideoYap tamamen ücretsiz mi?",
      answer: "Evet, VideoYap'ın temel özellikleri tamamen ücretsiz kullanılabilir. Her gün 10 puan kazanırsınız ve bu puanlarla 1 dakikalık videolar oluşturabilirsiniz. Daha uzun videolar ve gelişmiş özellikler için ücretli planlarımız mevcuttur."
    },
    {
      id: 2,
      question: "Videolarımı nasıl indirebilirim?",
      answer: "Videonuz oluşturulduktan sonra, video oynatıcının altında \"İndir\" butonu görünecektir. Bu butona tıklayarak videonuzu bilgisayarınıza veya mobil cihazınıza kaydedebilirsiniz. Ücretsiz planda videolarınızda küçük bir filigran bulunacaktır."
    },
    {
      id: 3,
      question: "Hangi video formatlarını destekliyorsunuz?",
      answer: "VideoYap çeşitli sosyal medya platformları için optimize edilmiş formatlar sunar: YouTube (16:9), Instagram (4:5 ve 1:1), TikTok ve YouTube Shorts (9:16), Facebook (16:9 ve 1:1) ve diğer popüler platformlar için uygun boyutlar."
    },
    {
      id: 4,
      question: "Puan sistemi nasıl çalışır?",
      answer: "Her ücretsiz kullanıcı günlük 10 puan kazanır. 1 dakikalık bir video oluşturmak 5 puan, 3 dakikalık video 15 puan, 5 dakikalık video ise 30 puan gerektirir. Ücretli planlarda günlük daha fazla puan veya sınırsız puan kullanımı sunulmaktadır."
    },
    {
      id: 5,
      question: "VideoYap'ı kimler kullanabilir?",
      answer: "VideoYap, her yaştan ve her teknoloji seviyesinden kullanıcı için tasarlanmıştır. Özellikle yaşlılar, çocuklar ve interneti yeni öğrenenler için basit ve kullanımı kolay bir arayüze sahiptir. İleri düzey teknoloji bilgisi gerektirmez."
    }
  ];

  const handleToggle = (id: number) => {
    setOpenFAQ(openFAQ === id ? 0 : id);
  };

  return (
    <section id="faq" className="py-16 bg-darkSurface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Sıkça Sorulan <span className="text-primary">Sorular</span></h2>
          <p className="text-lg text-mediumText max-w-2xl mx-auto">
            VideoYap hakkında merak edilenler.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto divide-y divide-darkBorder">
          {faqs.map((faq) => (
            <FAQItem 
              key={faq.id}
              id={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFAQ === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
