import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export default function PrivacyPolicy() {
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
            <BreadcrumbLink href="#">Gizlilik Politikası</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-darkSurface border border-darkBorder rounded-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Gizlilik Politikası</h1>
          <p className="text-gray-400 mb-8">Son Güncelleme: {lastUpdated}</p>
          
          <p className="text-gray-300 mb-6">
            VideoYap olarak gizliliğinize değer veriyoruz. Bu gizlilik politikası, hizmetlerimizi kullanırken topladığımız bilgileri ve bu bilgilerin nasıl kullanıldığını açıklamaktadır. Bu politika, VideoYap web sitesi, mobil uygulamaları ve ilgili tüm hizmetleri kapsamaktadır.
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-white mb-4">1. Topladığımız Bilgiler</h2>
              <div className="space-y-4 text-gray-300">
                <h3 className="text-lg font-medium text-white">1.1 Kullanıcı Tarafından Sağlanan Bilgiler</h3>
                <p>
                  Hesap oluştururken ve hizmetlerimizi kullanırken aşağıdaki bilgileri toplayabiliriz:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ad, e-posta adresi, şifre gibi hesap bilgileri</li>
                  <li>Profil fotoğrafı ve kullanıcı adı</li>
                  <li>Ödeme bilgileri (premium abonelikler için)</li>
                  <li>Platformumuza yüklediğiniz içerikler ve metin verileri</li>
                  <li>Platformda oluşturduğunuz videolar ve bunlarla ilgili ayarlar</li>
                  <li>Destek veya geri bildirim amacıyla gönderdiğiniz iletişimler</li>
                </ul>
                
                <h3 className="text-lg font-medium text-white mt-6">1.2 Otomatik Olarak Toplanan Bilgiler</h3>
                <p>
                  Hizmetlerimizi kullanırken, aşağıdaki bilgileri otomatik olarak toplayabiliriz:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP adresi, tarayıcı türü, işletim sistemi gibi cihaz bilgileri</li>
                  <li>Siteyi kullanım tarihleri ve süreleri</li>
                  <li>Hangi özellikleri kullandığınız ve nasıl etkileşimde bulunduğunuz</li>
                  <li>Çerezler ve benzer teknolojiler aracılığıyla toplanan bilgiler</li>
                  <li>Coğrafi konum bilgileri (kesin konum değil, ülke/şehir düzeyinde)</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-4">2. Bilgilerin Kullanımı</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Topladığımız bilgileri aşağıdaki amaçlar için kullanıyoruz:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Hizmetlerimizi sunmak, sürdürmek ve geliştirmek</li>
                  <li>Kullanıcı hesaplarını oluşturmak ve yönetmek</li>
                  <li>Video oluşturma hizmetlerimizi sağlamak</li>
                  <li>Kullanıcı kimliğini doğrulamak ve güvenliği sağlamak</li>
                  <li>Müşteri desteği sağlamak ve sorularınıza yanıt vermek</li>
                  <li>Hizmetlerimiz hakkında güncellemeler ve bildirimler göndermek</li>
                  <li>Kullanıcı deneyimini iyileştirmek için site kullanımını analiz etmek</li>
                  <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-4">3. Bilgilerin Paylaşımı</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Topladığımız bilgileri genel olarak aşağıdaki koşullarda üçüncü taraflarla paylaşabiliriz:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Onayınız olduğunda</li>
                  <li>Hizmetlerimizi sağlamak için gerekli olduğunda (örneğin, bulut depolama sağlayıcıları, ödeme işlemcileri)</li>
                  <li>Yasal bir yükümlülüğe uymak için gerekli olduğunda</li>
                  <li>Şirketimizin haklarını, mülkiyetini veya güvenliğini korumak için gerekli olduğunda</li>
                </ul>
                
                <p className="mt-4">
                  VideoYap, kullanıcı verilerini doğrudan pazarlama amacıyla üçüncü taraflarla satmaz veya kiralamaz.
                </p>
                
                <h3 className="text-lg font-medium text-white mt-6">3.1 Hizmet Sağlayıcılar</h3>
                <p>
                  Aşağıdaki kategorilerde hizmet sağlayıcılarla çalışıyoruz ve hizmetlerini sağlamak için gerekli olduğu ölçüde kullanıcı verilerini paylaşıyoruz:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Bulut depolama ve sunucu hizmetleri</li>
                  <li>Ödeme işleme</li>
                  <li>Müşteri destek hizmetleri</li>
                  <li>Analitik ve site kullanım analizi</li>
                  <li>Yapay zeka ve video oluşturma teknolojileri</li>
                </ul>
                <p className="mt-4">
                  Tüm hizmet sağlayıcılarımızla veri koruma anlaşmaları imzalıyoruz ve verilerinizin güvenliğini sağlamak için gerekli önlemleri alıyoruz.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-4">4. Veri Güvenliği</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  VideoYap, kullanıcı bilgilerinin güvenliğini korumak için endüstri standardı güvenlik önlemleri uygulamaktadır. Bu önlemler şunları içerir:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Veri şifreleme (aktarım sırasında ve depolamada)</li>
                  <li>Güvenli sunucu altyapısı</li>
                  <li>Düzenli güvenlik denetimleri ve değerlendirmeleri</li>
                  <li>Çalışanlar için veri güvenliği eğitimleri</li>
                  <li>Veri erişim kontrolü ve yetkilendirme sistemleri</li>
                </ul>
                <p className="mt-4">
                  Ancak, internet üzerinde hiçbir veri aktarımı veya depolama sistemi %100 güvenli değildir. Bu nedenle, bilgilerinizin güvenliğini mutlak olarak garanti edemesek de, verilerinizi korumak için tüm makul önlemleri alıyoruz.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-4">5. Kullanıcı Hakları</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Kullanıcı olarak, kişisel verilerinizle ilgili aşağıdaki haklara sahipsiniz:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Erişim hakkı:</strong> Hakkınızda hangi bilgilere sahip olduğumuzu öğrenme</li>
                  <li><strong>Düzeltme hakkı:</strong> Yanlış veya eksik bilgileri düzeltme</li>
                  <li><strong>Silme hakkı:</strong> Belirli koşullar altında verilerinizin silinmesini talep etme</li>
                  <li><strong>İşleme sınırlaması hakkı:</strong> Belirli koşullar altında verilerinizin işlenmesini kısıtlama</li>
                  <li><strong>Veri taşınabilirliği hakkı:</strong> Verilerinizi yapılandırılmış bir formatta alma ve başka bir hizmet sağlayıcıya aktarma</li>
                  <li><strong>İtiraz hakkı:</strong> Meşru menfaatlerimize dayalı işlemelere itiraz etme</li>
                </ul>
                <p className="mt-4">
                  Bu haklarınızdan herhangi birini kullanmak istiyorsanız, lütfen <Link href="/contact" className="text-primary hover:underline">iletişim formumuzu</Link> kullanarak veya privacy@videoyap.com adresine e-posta göndererek bizimle iletişime geçin.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-4">6. Çerezler ve Benzer Teknolojiler</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  VideoYap, hizmetlerini sağlamak ve kullanıcı deneyimini geliştirmek için çerezler ve benzer teknolojiler kullanmaktadır. Bu teknolojiler şunlar için kullanılabilir:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Oturum yönetimi ve kimlik doğrulama</li>
                  <li>Tercihlerinizin hatırlanması</li>
                  <li>Site kullanımının analiz edilmesi</li>
                  <li>Hizmetlerimizin performansını ve işlevselliğini geliştirme</li>
                </ul>
                <p className="mt-4">
                  Çoğu web tarayıcısı, çerezleri kabul etmemeyi veya çerezler alındığında sizi uyarmayı seçmenize olanak tanır. Ancak, çerezleri devre dışı bırakırsanız, sitemizin bazı özellikleri düzgün çalışmayabilir.
                </p>
                <p className="mt-4">
                  Çerezler hakkında daha fazla bilgi için lütfen <Link href="/cookies" className="text-primary hover:underline">Çerez Politikamızı</Link> inceleyin.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-4">7. Çocukların Gizliliği</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  VideoYap hizmetleri 13 yaşın altındaki çocuklar için tasarlanmamıştır. Bilerek 13 yaşın altındaki çocuklardan kişisel bilgi toplamıyoruz. 13 yaşın altındaki bir çocuğun kişisel bilgilerini sağladığını fark ederseniz, lütfen privacy@videoyap.com adresinden bizimle iletişime geçin. Bu bilgileri sistemlerimizden derhal sileceğiz.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-4">8. Uluslararası Veri Transferleri</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  VideoYap, Türkiye'de kurulmuş bir şirkettir ancak hizmetlerimizi sağlamak için Türkiye dışındaki ülkelerde bulunan sunucular ve hizmet sağlayıcıları kullanabiliriz. Bu durumlarda, bilgilerinizin güvenliğini ve gizliliğini korumak için uygun yasal ve teknik önlemlerin alınmasını sağlıyoruz.
                </p>
                <p className="mt-4">
                  Kişisel verileriniz, Avrupa Birliği, Amerika Birleşik Devletleri ve diğer ülkelere aktarılabilir ve bu ülkelerde işlenebilir. Bu ülkelerdeki veri koruma yasaları, kendi ülkenizdeki yasalardan farklı olabilir. Ancak, verilerinizin güvenliğini sağlamak için gerekli tüm önlemleri alıyoruz.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-4">9. Gizlilik Politikasındaki Değişiklikler</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Politikada önemli değişiklikler yapılması durumunda, web sitemizde güncellenmiş politikayı yayınlayacak ve gerekirse size e-posta ile bildirimde bulunacağız.
                </p>
                <p className="mt-4">
                  Bu politikanın en son ne zaman güncellendiğini görmek için yukarıdaki "Son Güncelleme" tarihine bakabilirsiniz. Değişikliklerden sonra hizmetlerimizi kullanmaya devam etmeniz, güncellenmiş gizlilik politikasını kabul ettiğiniz anlamına gelir.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-4">10. Bize Ulaşın</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Bu gizlilik politikası veya gizlilik uygulamalarımız hakkında sorularınız veya endişeleriniz varsa, lütfen şu adresten bizimle iletişime geçin:
                </p>
                <div className="bg-darkBg border border-darkBorder rounded-lg p-4 mt-2">
                  <p className="mb-1"><strong className="text-white">E-posta:</strong> privacy@videoyap.com</p>
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