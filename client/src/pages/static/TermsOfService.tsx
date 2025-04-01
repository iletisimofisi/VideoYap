import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export default function TermsOfService() {
  // Son güncelleme tarihi
  const lastUpdated = "25 Mart 2025";
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Ana Sayfa</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Kullanım Şartları</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-darkSurface border border-darkBorder rounded-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Kullanım Şartları</h1>
          <p className="text-gray-400 mb-8">Son Güncelleme: {lastUpdated}</p>
          
          <p className="text-gray-300 mb-6">
            Bu Kullanım Şartları, VideoYap platformuna ve ilgili hizmetlere erişiminizi ve bunların kullanımını düzenlemektedir. Lütfen bu şartları dikkatlice okuyun. VideoYap'ı kullanarak, bu şartları kabul etmiş olursunuz.
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-white mb-4">1. Tanımlar</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Bu Kullanım Şartları'nda:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-white">"VideoYap", "Biz", "Bize" veya "Bizim"</strong> ifadeleri, VideoYap A.Ş. şirketini ifade eder.</li>
                  <li><strong className="text-white">"Hizmet" veya "Platform"</strong> ifadeleri, VideoYap tarafından sağlanan web sitesi, mobil uygulamalar ve tüm ilgili hizmetleri ifade eder.</li>
                  <li><strong className="text-white">"Kullanıcı", "Siz" veya "Sizin"</strong> ifadeleri, VideoYap hizmetlerini kullanan kişiyi ifade eder.</li>
                  <li><strong className="text-white">"İçerik"</strong> ifadesi, metin, görsel, ses, video ve diğer materyaller dahil olmak üzere, Hizmet aracılığıyla oluşturulan, yüklenen, paylaşılan veya erişilen tüm bilgileri ifade eder.</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-4">2. Hesap Oluşturma ve Güvenlik</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  VideoYap hizmetlerinin tamamına erişmek için bir hesap oluşturmanız gerekir. Hesap oluştururken aşağıdaki şartları kabul etmiş olursunuz:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Doğru, güncel ve eksiksiz bilgi sağlamak</li>
                  <li>Hesap bilgilerinizin gizliliğini korumak ve hesabınızdaki tüm aktivitelerden sorumlu olmak</li>
                  <li>Hesabınızın izinsiz kullanımını fark ettiğinizde derhal VideoYap'a bildirmek</li>
                  <li>Başka bir kullanıcının hesabını kullanmamak</li>
                  <li>13 yaşından büyük olduğunuzu onaylamak</li>
                </ul>
                <p className="mt-4">
                  VideoYap, herhangi bir zamanda ve herhangi bir nedenle, önceden bildirimde bulunmaksızın hesabınızı askıya alma veya sonlandırma hakkını saklı tutar.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-4">3. Hizmet Kullanımı</h2>
              <div className="space-y-4 text-gray-300">
                <h3 className="text-lg font-medium text-white">3.1 Kullanım Lisansı</h3>
                <p>
                  VideoYap, size kişisel ve ticari olmayan amaçlarla platformu kullanmanız için sınırlı, münhasır olmayan, devredilemez bir lisans verir. Bu lisans, açıkça izin verilmedikçe, platformun herhangi bir bileşenini değiştirme, kopyalama, dağıtma, iletme, gösterme, satma veya lisanslama hakkını içermez.
                </p>
                
                <h3 className="text-lg font-medium text-white mt-6">3.2 Kullanım Kısıtlamaları</h3>
                <p>
                  VideoYap hizmetlerini kullanırken aşağıdakileri yapmayacağınızı kabul edersiniz:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Yasalara, üçüncü taraf haklarına veya bu Kullanım Şartları'na aykırı herhangi bir eylemi gerçekleştirmek</li>
                  <li>Platformu yasadışı, zararlı, taciz edici, istismar edici, tehdit edici, karalayıcı, aşağılayıcı, müstehcen, iftira niteliğinde veya başka şekilde uygunsuz içerik oluşturmak için kullanmak</li>
                  <li>Virüs, kötü amaçlı yazılım veya diğer zararlı kodları yaymak</li>
                  <li>Platformun normal işleyişine müdahale etmek veya aşırı yük bindirmek</li>
                  <li>VideoYap'ın veya üçüncü tarafların fikri mülkiyet haklarını ihlal etmek</li>
                  <li>Platform üzerindeki güvenlik önlemlerini veya erişim kısıtlamalarını atlatmaya çalışmak</li>
                  <li>Platformu ters mühendislik yapmak, kaynak kodunu çıkarmak veya türev çalışmalar oluşturmak</li>
                  <li>Otomatik araçlar veya robotlar kullanarak platforma erişmek (VideoYap tarafından açıkça izin verilenler hariç)</li>
                  <li>Diğer kullanıcıların kişisel bilgilerini toplamak veya saklamak</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-4">4. İçerik ve Fikri Mülkiyet</h2>
              <div className="space-y-4 text-gray-300">
                <h3 className="text-lg font-medium text-white">4.1 Kullanıcı İçeriği</h3>
                <p>
                  VideoYap platformuna yüklediğiniz veya oluşturduğunuz içerikle ilgili olarak:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>İçeriğin sahibi olmaya devam edersiniz</li>
                  <li>İçeriği platformda göstermek, dağıtmak, çoğaltmak ve değiştirmek için VideoYap'a dünya çapında, telifsiz, alt lisanslanabilir ve devredilebilir bir lisans vermiş olursunuz</li>
                  <li>Bu içeriğin tüm haklarına sahip olduğunuzu veya gerekli izinlere sahip olduğunuzu beyan ve garanti etmiş olursunuz</li>
                  <li>Yüklediğiniz içeriğin üçüncü taraf haklarını ihlal etmesinden kaynaklanan tüm talep ve zararlardan VideoYap'ı muaf tutarsınız</li>
                </ul>
                
                <h3 className="text-lg font-medium text-white mt-6">4.2 VideoYap İçeriği</h3>
                <p>
                  VideoYap ve lisans verenleri, platformdaki tüm içerik, kod, tasarım, logo, ticari marka ve diğer materyallerin tüm haklarını saklı tutar. Bu materyalleri önceden yazılı izin olmadan kopyalayamaz, değiştiremez, dağıtamaz veya başka amaçlarla kullanamazsınız.
                </p>
                
                <h3 className="text-lg font-medium text-white mt-6">4.3 Telif Hakkı İhlal Bildirimleri</h3>
                <p>
                  Telif hakkınızın ihlal edildiğini düşünüyorsanız, lütfen aşağıdaki bilgileri içeren bir bildirim gönderin:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Telif hakkı sahibini tanımlayan bilgiler</li>
                  <li>İhlal edildiğini düşündüğünüz çalışmanın tanımı</li>
                  <li>İhlalin gerçekleştiği platformdaki konumun tanımı</li>
                  <li>İletişim bilgileriniz</li>
                  <li>İyi niyetle hareket ettiğinize ve bildirimde sunulan bilgilerin doğru olduğuna dair bir beyan</li>
                </ul>
                <p className="mt-4">
                  Telif hakkı ihlal bildirimlerini copyright@videoyap.com adresine gönderebilirsiniz.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-4">5. Abonelikler ve Ödemeler</h2>
              <div className="space-y-4 text-gray-300">
                <h3 className="text-lg font-medium text-white">5.1 Abonelik Planları</h3>
                <p>
                  VideoYap, ücretsiz ve premium abonelik planları sunar. Premium planlar, ek özellikler ve arttırılmış kullanım limitleri içerir. Ücretler ve plan detayları web sitemizde belirtilmiştir.
                </p>
                
                <h3 className="text-lg font-medium text-white mt-6">5.2 Ödeme ve Yenileme</h3>
                <p>
                  Premium abonelikler için:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ödeme, abonelik başlangıcında ve sonraki her yenileme döneminde tahsil edilir</li>
                  <li>Abonelikler, iptal edilmediği sürece otomatik olarak yenilenir</li>
                  <li>İptal, bir sonraki yenileme tarihinden önce yapılmalıdır; aksi takdirde bir sonraki döneme ait ödeme tahsil edilir</li>
                  <li>Kısmen kullanılmış abonelik dönemleri için geri ödeme yapılmaz</li>
                </ul>
                
                <h3 className="text-lg font-medium text-white mt-6">5.3 Fiyat Değişiklikleri</h3>
                <p>
                  VideoYap, abonelik ücretlerini istediği zaman değiştirebilir. Fiyat değişiklikleri, mevcut abonelik döneminizden sonraki dönemde geçerli olacaktır. Fiyat değişiklikleri hakkında önceden bildirimde bulunacağız.
                </p>
                
                <h3 className="text-lg font-medium text-white mt-6">5.4 Puan Sistemi</h3>
                <p>
                  VideoYap, video oluşturma için bir puan sistemi kullanır:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Her abonelik planı, günlük veya aylık belirli sayıda puan sağlar</li>
                  <li>Puanlar, video oluşturma ve diğer premium özellikleri kullanmak için harcanır</li>
                  <li>Kullanılmayan puanlar, planda belirtilen süre sonunda sıfırlanabilir</li>
                  <li>Puan satın alma, aboneliğinize ek olarak puanlar eklemek için kullanılabilir</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-4">6. Sorumluluk Reddi</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  VideoYap hizmetleri "olduğu gibi" ve "mevcut olduğu sürece" sunulmaktadır. VideoYap:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Hizmetlerin kesintisiz, hatasız veya güvenli olacağını garanti etmez</li>
                  <li>Yapay zeka ile oluşturulan içeriğin doğruluğunu, güvenilirliğini veya kalitesini garanti etmez</li>
                  <li>Platformun belirli ihtiyaçlarınızı karşılayacağını garanti etmez</li>
                  <li>Üçüncü taraf web sitelerine veya kaynaklara olan bağlantıların doğruluğu veya güvenliği konusunda sorumluluk kabul etmez</li>
                </ul>
                <p className="mt-4">
                  Bazı yargı bölgelerinde belirli garantilerin hariç tutulmasına izin verilmez, bu nedenle yukarıdaki istisnaların bazıları sizin için geçerli olmayabilir.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-4">7. Sorumluluk Sınırlaması</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Yürürlükteki yasaların izin verdiği azami ölçüde, VideoYap ve bağlı kuruluşları, lisans verenleri, tedarikçileri veya çalışanları, aşağıdakilerden kaynaklanan hiçbir doğrudan, dolaylı, arızi, özel, sonuç olarak ortaya çıkan veya cezai zarardan sorumlu olmayacaktır:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Hizmetlerin kullanımı veya kullanılamaması</li>
                  <li>Hizmetler üzerinden erişilen veya indirilen herhangi bir içerik</li>
                  <li>Platformun kullanımıyla ilgili yetkisiz erişim veya veri değişikliği</li>
                  <li>Platformdaki herhangi bir üçüncü tarafın beyanları veya davranışları</li>
                </ul>
                <p className="mt-4">
                  Bu sorumluluk sınırlaması, zarar olasılığı konusunda bilgilendirilmiş olsak bile ve burada belirtilen sınırlı çözümler temel amacını yerine getirmese bile geçerlidir.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-4">8. Tazminat</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Aşağıdakilerden kaynaklanan her türlü iddia, zarar, yükümlülük, maliyet ve giderden (avukatlık ücretleri dahil) VideoYap'ı, iştiraklerini, ortaklarını, lisans verenlerini ve çalışanlarını savunmayı, tazmin etmeyi ve zarar görmemelerini sağlamayı kabul edersiniz:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Kullanım Şartları'nı ihlal etmeniz</li>
                  <li>Platform üzerinden sağladığınız içerik</li>
                  <li>Hizmetleri kötüye kullanmanız</li>
                  <li>Herhangi bir üçüncü tarafın haklarını ihlal etmeniz</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-4">9. Genel Hükümler</h2>
              <div className="space-y-4 text-gray-300">
                <h3 className="text-lg font-medium text-white">9.1 Değişiklikler</h3>
                <p>
                  VideoYap, bu Kullanım Şartları'nı istediği zaman değiştirme hakkını saklı tutar. Değişiklikler, web sitemizde yayınlandıktan sonra geçerli olacaktır. Önemli değişiklikler hakkında bildirimde bulunacağız. Değişikliklerden sonra platformu kullanmaya devam etmeniz, güncellenmiş şartları kabul ettiğiniz anlamına gelir.
                </p>
                
                <h3 className="text-lg font-medium text-white mt-6">9.2 Feragat</h3>
                <p>
                  VideoYap'ın bu şartlardaki herhangi bir hükmü uygulamaması, o hükümden veya diğer hükümlerden feragat ettiği anlamına gelmez.
                </p>
                
                <h3 className="text-lg font-medium text-white mt-6">9.3 Bölünebilirlik</h3>
                <p>
                  Bu Kullanım Şartları'nın herhangi bir hükmünün geçersiz veya uygulanamaz olduğu tespit edilirse, diğer hükümler tam olarak yürürlükte kalmaya devam edecektir.
                </p>
                
                <h3 className="text-lg font-medium text-white mt-6">9.4 Devir</h3>
                <p>
                  Bu anlaşmadaki haklarınızı veya yükümlülüklerinizi VideoYap'ın yazılı izni olmadan devredemezsiniz. VideoYap, bu anlaşmayı size bildirimde bulunarak devredebilir.
                </p>
                
                <h3 className="text-lg font-medium text-white mt-6">9.5 Tam Anlaşma</h3>
                <p>
                  Bu Kullanım Şartları, siz ve VideoYap arasındaki tam anlaşmayı oluşturur ve aynı konuyla ilgili önceki tüm anlaşmaların yerini alır.
                </p>
                
                <h3 className="text-lg font-medium text-white mt-6">9.6 Geçerli Hukuk</h3>
                <p>
                  Bu Kullanım Şartları, Türkiye Cumhuriyeti yasalarına göre yönetilir ve yorumlanır. Bu şartlardan kaynaklanan veya bunlarla ilgili anlaşmazlıklar, İstanbul Mahkemeleri'nde çözülecektir.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-4">10. İletişim</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Bu Kullanım Şartları hakkında herhangi bir sorunuz veya endişeniz varsa, lütfen aşağıdaki iletişim bilgilerinden bize ulaşın:
                </p>
                <div className="bg-darkBg border border-darkBorder rounded-lg p-4 mt-2">
                  <p className="mb-1"><strong className="text-white">E-posta:</strong> terms@videoyap.com</p>
                  <p className="mb-1"><strong className="text-white">Adres:</strong> VideoYap A.Ş., Bağdat Caddesi No:123, Kadıköy, İstanbul, Türkiye</p>
                  <p><strong className="text-white">Telefon:</strong> +90 (212) 123 45 67</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}