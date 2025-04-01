import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Search, Video, Users, Zap, PlayCircle, FileText, MessageCircle, Mail, Phone } from "lucide-react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">VideoYap Yardım Merkezi</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Sorularınız için cevaplar ve VideoYap'ı en iyi şekilde kullanmak için ipuçları
        </p>
      </div>
      
      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <Input 
            placeholder="Yardım konusu ara..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>
      
      <Tabs defaultValue="faq" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="faq" className="flex flex-col items-center gap-2 p-3">
            <FileText className="w-5 h-5" />
            <span>Sık Sorulanlar</span>
          </TabsTrigger>
          <TabsTrigger value="getting-started" className="flex flex-col items-center gap-2 p-3">
            <PlayCircle className="w-5 h-5" />
            <span>Başlangıç</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex flex-col items-center gap-2 p-3">
            <Video className="w-5 h-5" />
            <span>Video Oluşturma</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex flex-col items-center gap-2 p-3">
            <Users className="w-5 h-5" />
            <span>Hesap</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex flex-col items-center gap-2 p-3">
            <MessageCircle className="w-5 h-5" />
            <span>İletişim</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq">
          <Card className="bg-darkSurface border-darkBorder">
            <CardHeader>
              <CardTitle className="text-white text-xl">Sık Sorulan Sorular</CardTitle>
              <CardDescription>VideoYap hakkında en çok sorulan sorular ve cevapları</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="item-1" className="border-darkBorder">
                  <AccordionTrigger className="text-white">VideoYap nasıl çalışır?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    VideoYap, yapay zeka teknolojisini kullanarak metin içeriklerinizi otomatik olarak videolara dönüştürür. Sadece metni girin, video stilini ve formatını seçin, yapay zeka sizin için profesyonel bir video oluşturacaktır. Oluşturulan videoları düzenleyebilir, indirebilir veya doğrudan paylaşabilirsiniz.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2" className="border-darkBorder">
                  <AccordionTrigger className="text-white">VideoYap kullanmak için ne kadar ödeme yapmam gerekiyor?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    VideoYap'ı ücretsiz olarak kullanabilirsiniz. Ücretsiz planda günlük sınırlı sayıda video oluşturma hakkınız vardır. Daha fazla video oluşturmak, daha uzun videolar hazırlamak ve gelişmiş özelliklere erişmek için Temel veya Premium planlarımıza abone olabilirsiniz.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3" className="border-darkBorder">
                  <AccordionTrigger className="text-white">Ne kadar sürede video oluşturabilirim?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Videonuzun uzunluğuna ve karmaşıklığına bağlı olarak, video oluşturma işlemi genellikle 2-10 dakika arasında tamamlanır. Yoğun zamanlarda bu süre biraz daha uzayabilir.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4" className="border-darkBorder">
                  <AccordionTrigger className="text-white">Oluşturduğum videoların telif hakkı kime aittir?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    VideoYap ile oluşturduğunuz videoların kullanım hakları size aittir. Ancak, kullanım koşullarımız gereği platformda oluşturulan içeriklerin yasalara uygun olması gerekmektedir. Videolarda kullandığınız içeriklerin telif haklarına saygı göstermeniz önemlidir.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5" className="border-darkBorder">
                  <AccordionTrigger className="text-white">Puan sistemi nasıl çalışır?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    VideoYap'ta her video oluşturma puanlarınızı kullanır. Ücretsiz üyelikte günlük 10 puan kazanırsınız. Temel üyelikte günlük 50 puan, Premium üyelikte ise günlük 150 puan kazanırsınız. Video uzunluğuna ve özelliklerine bağlı olarak farklı miktarlarda puan harcanır.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6" className="border-darkBorder">
                  <AccordionTrigger className="text-white">Videolarım nereye kaydediliyor?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Oluşturduğunuz tüm videolar VideoYap hesabınızda saklanır ve "Videolarım" sayfasından erişebilirsiniz. Ayrıca videolarınızı bilgisayarınıza indirebilir veya doğrudan sosyal medyada paylaşabilirsiniz.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7" className="border-darkBorder">
                  <AccordionTrigger className="text-white">Hangi diller destekleniyor?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    VideoYap şu anda Türkçe ve İngilizce dillerini desteklemektedir. Yakında daha fazla dil desteği eklenecektir.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-8" className="border-darkBorder">
                  <AccordionTrigger className="text-white">Oluşturduğum videoları düzenleyebilir miyim?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Evet, oluşturulan videoları düzenleyebilirsiniz. Video ayrıntıları sayfasında düzenleme seçeneklerine erişebilir, videoyu yeniden oluşturabilir veya belirli bölümleri değiştirebilirsiniz. Premium üyelikte daha gelişmiş düzenleme özellikleri sunulmaktadır.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="getting-started">
          <Card className="bg-darkSurface border-darkBorder">
            <CardHeader>
              <CardTitle className="text-white text-xl">Başlangıç Rehberi</CardTitle>
              <CardDescription>VideoYap'ı kullanmaya başlamak için adım adım rehber</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-darkBg border border-darkBorder rounded-lg p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3">1</div>
                    <h3 className="text-white text-lg font-medium">Hesap Oluşturma</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    VideoYap'ı kullanmaya başlamak için hızlıca bir hesap oluşturun. E-posta adresinizle kayıt olabilir veya Google/Facebook hesabınızla giriş yapabilirsiniz.
                  </p>
                  <Link href="/" className="text-primary hover:underline inline-block">
                    Hesap oluştur
                  </Link>
                </div>
                
                <div className="bg-darkBg border border-darkBorder rounded-lg p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3">2</div>
                    <h3 className="text-white text-lg font-medium">Video İçeriği Oluşturma</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Ana sayfadan "Video Oluştur" butonuna tıklayın ve video içeriğinizi metin olarak girin. Ne kadar detaylı bilgi verirseniz, video o kadar iyi olacaktır.
                  </p>
                  <Link href="/" className="text-primary hover:underline inline-block">
                    Video oluştur
                  </Link>
                </div>
                
                <div className="bg-darkBg border border-darkBorder rounded-lg p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3">3</div>
                    <h3 className="text-white text-lg font-medium">Video Stili Seçme</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Videonuzun stilini ve formatını seçin. Eğitim, sunum, sosyal medya içeriği gibi farklı seçenekler arasından tercihinizi yapın.
                  </p>
                  <Button variant="link" className="text-primary p-0 h-auto">
                    Stil örneklerini gör
                  </Button>
                </div>
                
                <div className="bg-darkBg border border-darkBorder rounded-lg p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3">4</div>
                    <h3 className="text-white text-lg font-medium">Videonuzu Özelleştirme</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Renkler, yazı tipleri, arka plan müziği gibi seçeneklerle videonuzu özelleştirin. Özelleştirme seçenekleri üyelik planınıza göre değişir.
                  </p>
                  <Button variant="link" className="text-primary p-0 h-auto">
                    Özelleştirme seçeneklerini gör
                  </Button>
                </div>
                
                <div className="bg-darkBg border border-darkBorder rounded-lg p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3">5</div>
                    <h3 className="text-white text-lg font-medium">Video Oluşturmayı Başlatma</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Tüm seçimleri yaptıktan sonra "Oluştur" butonuna tıklayın ve yapay zekanın videonuzu hazırlamasını bekleyin. Bu işlem birkaç dakika sürebilir.
                  </p>
                </div>
                
                <div className="bg-darkBg border border-darkBorder rounded-lg p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3">6</div>
                    <h3 className="text-white text-lg font-medium">Videoyu İndirme ve Paylaşma</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Video hazır olduğunda indirebilir veya doğrudan sosyal medya platformlarında paylaşabilirsiniz. Tüm videolarınız hesabınızda saklanır.
                  </p>
                  <Link href="/videos" className="text-primary hover:underline inline-block">
                    Videolarım
                  </Link>
                </div>
              </div>
              
              <div className="mt-8 bg-darkBg border border-darkBorder rounded-lg p-6">
                <h3 className="text-white text-lg font-medium mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Video Oluşturma İpuçları
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                    <p>Açık ve net bir dil kullanın. Kısa cümleler videonun anlaşılmasını kolaylaştırır.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                    <p>Anahtar kelimeleri ve önemli terimleri vurgulayın. Yapay zeka bunları görseller seçerken kullanacaktır.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                    <p>Video içeriğinizi bölümlere ayırın. Bu, videonun daha organize olmasını sağlar.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                    <p>Hedef kitlenize uygun bir dil kullanın. Teknik terimleri gerekmedikçe kullanmayın.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                    <p>Premium üyelikte özel görsel ve müzik ekleyebileceğinizi unutmayın.</p>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="videos">
          <Card className="bg-darkSurface border-darkBorder">
            <CardHeader>
              <CardTitle className="text-white text-xl">Video Oluşturma</CardTitle>
              <CardDescription>VideoYap ile video oluşturma hakkında detaylı bilgiler</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="video-1" className="border-darkBorder">
                  <AccordionTrigger className="text-white">Hangi video formatları destekleniyor?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    VideoYap şu video formatlarını desteklemektedir:
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Yatay format (16:9) - TV, bilgisayar veya YouTube için ideal</li>
                      <li>Dikey format (9:16) - Instagram, TikTok veya mobil için ideal</li>
                      <li>Kare format (1:1) - Instagram veya Facebook için ideal</li>
                      <li>Ultra geniş format (21:9) - Sinematik görünüm için</li>
                    </ul>
                    Premium üyelik ile özel formatlarda video oluşturabilirsiniz.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="video-2" className="border-darkBorder">
                  <AccordionTrigger className="text-white">Video süreleri ne kadar olabilir?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>Video süreleri üyelik planınıza göre değişir:</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Ücretsiz plan: Maksimum 1 dakika</li>
                      <li>Temel plan: Maksimum 3 dakika</li>
                      <li>Premium plan: Maksimum 10 dakika</li>
                    </ul>
                    <p className="mt-2">Daha uzun metinler girildiğinde, yapay zeka içeriği otomatik olarak kısaltabilir veya ek puan kullanarak uzun video oluşturabilirsiniz.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="video-3" className="border-darkBorder">
                  <AccordionTrigger className="text-white">Video kalitesi ve çözünürlüğü nasıl?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>VideoYap şu çözünürlükleri destekler:</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Ücretsiz plan: 720p (HD)</li>
                      <li>Temel plan: 1080p (Full HD)</li>
                      <li>Premium plan: 1080p (Full HD) ve 4K (Ultra HD)</li>
                    </ul>
                    <p className="mt-2">Tüm videolar yüksek kaliteli görsel ve sese sahiptir. Premium üyelikte daha yüksek bit hızı ve görsel kalitesi sunulmaktadır.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="video-4" className="border-darkBorder">
                  <AccordionTrigger className="text-white">Ses ve müzik seçenekleri nelerdir?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>VideoYap'ta şu ses ve müzik seçenekleri mevcuttur:</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Yapay zeka seslendirme (kadın veya erkek sesi)</li>
                      <li>Telifsiz müzik kütüphanesi (100+ parça)</li>
                      <li>Ses seviyesi ayarlamaları</li>
                      <li>Premium üyelikte kendi ses kaydınızı yükleme</li>
                      <li>Premium üyelikte özel müzik yükleme</li>
                    </ul>
                    <p className="mt-2">Seslendirmelerde Türkçe ve İngilizce dil desteği mevcuttur.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="video-5" className="border-darkBorder">
                  <AccordionTrigger className="text-white">Görsel ve animasyon seçenekleri nelerdir?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>VideoYap şu görsel ve animasyon seçeneklerini sunar:</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Yapay zeka ile metin içeriğine uygun görseller</li>
                      <li>Telifsiz stok fotoğraf ve video kütüphanesi</li>
                      <li>Geçiş efektleri ve animasyonlar</li>
                      <li>Alt yazı ve metin animasyonları</li>
                      <li>Premium üyelikte özel görseller yükleme</li>
                      <li>Premium üyelikte marka renkleri ve logosu ekleme</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="video-6" className="border-darkBorder">
                  <AccordionTrigger className="text-white">Video stilleri ve şablonları nelerdir?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>VideoYap'ta farklı amaçlar için çeşitli stiller ve şablonlar bulunur:</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Eğitim videoları</li>
                      <li>Pazarlama ve tanıtım videoları</li>
                      <li>Sosyal medya içerikleri</li>
                      <li>Sunum ve iş videoları</li>
                      <li>Hikaye anlatımı ve belgesel tarzı</li>
                      <li>Haber ve bilgilendirme videoları</li>
                    </ul>
                    <p className="mt-2">Her bir stil farklı geçişler, efektler ve düzenler içerir.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card className="bg-darkSurface border-darkBorder">
            <CardHeader>
              <CardTitle className="text-white text-xl">Hesap Yönetimi</CardTitle>
              <CardDescription>Hesap ayarları ve üyelik planları hakkında bilgiler</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-darkBg border border-darkBorder rounded-lg p-5">
                  <h3 className="text-white text-lg font-medium mb-4">Hesap Ayarları</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                      <div>
                        <strong className="text-white">Profil Bilgileri:</strong> Profil sayfanızdan ad, e-posta ve diğer kişisel bilgilerinizi güncelleyebilirsiniz.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                      <div>
                        <strong className="text-white">Şifre Değiştirme:</strong> Güvenlik için periyodik olarak şifrenizi değiştirmenizi öneririz.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                      <div>
                        <strong className="text-white">Bildirim Ayarları:</strong> Hangi bildirimlerini almak istediğinizi özelleştirebilirsiniz.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                      <div>
                        <strong className="text-white">Gizlilik Tercihleri:</strong> Verilerinizin nasıl kullanılacağıyla ilgili tercihlerinizi yönetin.
                      </div>
                    </li>
                  </ul>
                  <Button className="mt-4" variant="outline">
                    Hesap Ayarlarına Git
                  </Button>
                </div>
                
                <div className="bg-darkBg border border-darkBorder rounded-lg p-5">
                  <h3 className="text-white text-lg font-medium mb-4">Üyelik Planları</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                      <div>
                        <strong className="text-white">Ücretsiz Plan:</strong> Günlük 10 puan, maksimum 1 dakikalık videolar, temel özellikler.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                      <div>
                        <strong className="text-white">Temel Plan:</strong> Günlük 50 puan, maksimum 3 dakikalık videolar, gelişmiş özellikler.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                      <div>
                        <strong className="text-white">Premium Plan:</strong> Günlük 150 puan, maksimum 10 dakikalık videolar, tüm özellikler ve 4K video.
                      </div>
                    </li>
                  </ul>
                  <Button className="mt-4 bg-primary">
                    Planları Karşılaştır
                  </Button>
                </div>
                
                <div className="bg-darkBg border border-darkBorder rounded-lg p-5">
                  <h3 className="text-white text-lg font-medium mb-4">Puan Sistemi</h3>
                  <p className="text-gray-300 mb-4">
                    VideoYap'ta her video oluşturma işlemi için puan kullanırsınız. Puanlar şu şekilde hesaplanır:
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                      <p>30 saniyelik video: 5 puan</p>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                      <p>1 dakikalık video: 10 puan</p>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                      <p>3 dakikalık video: 25 puan</p>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                      <p>5 dakikalık video: 40 puan</p>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                      <p>10 dakikalık video: 75 puan</p>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-darkBg border border-darkBorder rounded-lg p-5">
                  <h3 className="text-white text-lg font-medium mb-4">Hesap Güvenliği</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                      <div>
                        <strong className="text-white">Güçlü Şifre:</strong> En az 8 karakter uzunluğunda, büyük/küçük harf, rakam ve özel karakterler içeren bir şifre kullanın.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                      <div>
                        <strong className="text-white">İki Faktörlü Doğrulama:</strong> Hesabınızı daha güvenli hale getirmek için iki faktörlü doğrulamayı etkinleştirin.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">•</div>
                      <div>
                        <strong className="text-white">Oturum Yönetimi:</strong> Aktif oturumlarınızı kontrol edin ve şüpheli aktiviteler görürseniz oturumları kapatın.
                      </div>
                    </li>
                  </ul>
                  <Button className="mt-4" variant="outline">
                    Güvenlik Ayarlarına Git
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact">
          <Card className="bg-darkSurface border-darkBorder">
            <CardHeader>
              <CardTitle className="text-white text-xl">İletişim</CardTitle>
              <CardDescription>VideoYap ekibiyle iletişime geçin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-darkBg border border-darkBorder rounded-lg p-5 text-center">
                  <Mail className="w-10 h-10 mx-auto mb-3 text-primary" />
                  <h3 className="text-white text-lg font-medium mb-2">E-posta</h3>
                  <p className="text-gray-300 mb-4">Sorularınız ve geri bildirimleriniz için e-posta gönderin</p>
                  <a href="mailto:destek@videoyap.com" className="text-primary hover:underline">destek@videoyap.com</a>
                </div>
                
                <div className="bg-darkBg border border-darkBorder rounded-lg p-5 text-center">
                  <MessageCircle className="w-10 h-10 mx-auto mb-3 text-primary" />
                  <h3 className="text-white text-lg font-medium mb-2">Canlı Destek</h3>
                  <p className="text-gray-300 mb-4">Hafta içi 09:00-18:00 arası canlı destek hizmetimiz mevcuttur</p>
                  <Button variant="outline">Canlı Destek Başlat</Button>
                </div>
                
                <div className="bg-darkBg border border-darkBorder rounded-lg p-5 text-center">
                  <Phone className="w-10 h-10 mx-auto mb-3 text-primary" />
                  <h3 className="text-white text-lg font-medium mb-2">Telefon</h3>
                  <p className="text-gray-300 mb-4">Telefon ile destek için bizi arayabilirsiniz</p>
                  <a href="tel:+902121234567" className="text-primary hover:underline">+90 (212) 123 45 67</a>
                </div>
              </div>
              
              <div className="bg-darkBg border border-darkBorder rounded-lg p-6">
                <h3 className="text-white text-lg font-medium mb-4">İletişim Formu</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Adınız</label>
                      <Input placeholder="Adınız" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">E-posta</label>
                      <Input type="email" placeholder="E-posta adresiniz" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Konu</label>
                    <Input placeholder="Mesajınızın konusu" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Mesajınız</label>
                    <textarea 
                      placeholder="Mesajınızı buraya yazın..." 
                      className="w-full px-3 py-2 bg-darkSurface border border-darkBorder rounded-md text-white h-32 resize-none"
                    ></textarea>
                  </div>
                  
                  <Button className="bg-primary">
                    Mesaj Gönder
                  </Button>
                </form>
              </div>
              
              <div className="mt-8 text-center">
                <h3 className="text-white text-lg font-medium mb-2">Sosyal Medya</h3>
                <p className="text-gray-300 mb-4">Sosyal medya hesaplarımızdan da bize ulaşabilirsiniz</p>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" size="icon">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                    </svg>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}