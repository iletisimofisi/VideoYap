import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, MessageSquare, MapPin, Clock, Building, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderimi burada gerçekleştirilecek
    console.log("Form data:", formData);
    
    // Başarılı gönderim için gösterimi değiştir
    setFormSubmitted(true);
    
    // 5 saniye sonra formu sıfırla
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 5000);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-white mb-4">Bize Ulaşın</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Sorularınız, geri bildirimleriniz veya destek talepleriniz için VideoYap ekibiyle iletişime geçin
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="flex flex-col">
          <div className="bg-darkSurface border border-darkBorder rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">İletişim Bilgileri</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">E-posta</h3>
                  <p className="text-gray-300 mb-1">Genel Sorular:</p>
                  <a href="mailto:info@videoyap.com" className="text-primary hover:underline">info@videoyap.com</a>
                  <p className="text-gray-300 mt-2 mb-1">Destek:</p>
                  <a href="mailto:destek@videoyap.com" className="text-primary hover:underline">destek@videoyap.com</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Telefon</h3>
                  <p className="text-gray-300 mb-1">Müşteri Hizmetleri:</p>
                  <a href="tel:+902121234567" className="text-primary hover:underline">+90 (212) 123 45 67</a>
                  <p className="text-gray-300 mt-2 mb-1">Teknik Destek:</p>
                  <a href="tel:+902121234568" className="text-primary hover:underline">+90 (212) 123 45 68</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Canlı Destek</h3>
                  <p className="text-gray-300 mb-3">
                    Pazartesi - Cuma, 09:00 - 18:00 saatleri arasında canlı destek hizmetimizden faydalanabilirsiniz.
                  </p>
                  <Button className="bg-primary">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Canlı Destek Başlat
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-darkSurface border border-darkBorder rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Ofis Bilgileri</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Adres</h3>
                  <p className="text-gray-300">
                    VideoYap A.Ş.<br />
                    Bağdat Caddesi No:123<br />
                    Kadıköy, İstanbul<br />
                    Türkiye
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Çalışma Saatleri</h3>
                  <p className="text-gray-300">
                    Pazartesi - Cuma: 09:00 - 18:00<br />
                    Cumartesi - Pazar: Kapalı
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Building className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Şirket Bilgileri</h3>
                  <p className="text-gray-300">
                    VideoYap Teknoloji A.Ş.<br />
                    Vergi No: 123456789<br />
                    Ticaret Sicil No: 123456<br />
                    Mersis No: 0123456789012345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-darkBg border-darkBorder mb-8">
              <TabsTrigger value="contact">İletişim Formu</TabsTrigger>
              <TabsTrigger value="support">Destek Talebi</TabsTrigger>
            </TabsList>
            
            <TabsContent value="contact">
              <Card className="bg-darkSurface border-darkBorder">
                <CardContent className="p-6">
                  {!formSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Adınız</label>
                          <Input 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Adınız" 
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">E-posta</label>
                          <Input 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email" 
                            placeholder="E-posta adresiniz" 
                            required 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Konu</label>
                        <Input 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Mesajınızın konusu" 
                          required 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Mesajınız</label>
                        <textarea 
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Mesajınızı buraya yazın..." 
                          className="w-full px-3 py-2 bg-darkBg border border-darkBorder rounded-md text-white h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        ></textarea>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="privacy" 
                          className="w-4 h-4 text-primary bg-darkBg border-darkBorder rounded focus:ring-primary" 
                          required
                        />
                        <label htmlFor="privacy" className="text-sm text-gray-300">
                          <span>Kişisel verilerimin işlenmesine izin veriyorum. </span>
                          <a href="/privacy-policy" className="text-primary hover:underline">Gizlilik Politikası</a>
                        </label>
                      </div>
                      
                      <Button type="submit" className="bg-primary">
                        <Send className="w-4 h-4 mr-2" />
                        Mesaj Gönder
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-950 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-medium text-white mb-2">Mesajınız İletildi!</h3>
                      <p className="text-gray-300 mb-8">
                        Mesajınız başarıyla iletildi. En kısa sürede size geri dönüş yapacağız.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            subject: "",
                            message: ""
                          });
                        }}
                      >
                        Yeni Mesaj Gönder
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="support">
              <Card className="bg-darkSurface border-darkBorder">
                <CardContent className="p-6">
                  {!formSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Adınız</label>
                          <Input 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Adınız" 
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">E-posta</label>
                          <Input 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email" 
                            placeholder="E-posta adresiniz" 
                            required 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Destek Kategorisi</label>
                        <select className="w-full px-3 py-2 bg-darkBg border border-darkBorder rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary">
                          <option value="">Kategori seçin</option>
                          <option value="account">Hesap İşlemleri</option>
                          <option value="billing">Ödeme & Faturalama</option>
                          <option value="technical">Teknik Sorunlar</option>
                          <option value="feature">Özellik İstekleri</option>
                          <option value="other">Diğer</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Konu</label>
                        <Input 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Destek talebinizin konusu" 
                          required 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Sorununuzu Detaylandırın</label>
                        <textarea 
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Sorununuzu veya talebinizi detaylı bir şekilde açıklayın..." 
                          className="w-full px-3 py-2 bg-darkBg border border-darkBorder rounded-md text-white h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Ekran Görüntüsü (isteğe bağlı)</label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 bg-darkBg border-2 border-darkBorder border-dashed rounded-lg cursor-pointer hover:bg-darkBg/60">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg className="w-8 h-8 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                              </svg>
                              <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Dosya yüklemek için tıklayın</span> veya sürükleyip bırakın</p>
                              <p className="text-xs text-gray-400">PNG, JPG veya PDF (maks. 5MB)</p>
                            </div>
                            <input type="file" className="hidden" />
                          </label>
                        </div> 
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="privacy-support" 
                          className="w-4 h-4 text-primary bg-darkBg border-darkBorder rounded focus:ring-primary" 
                          required
                        />
                        <label htmlFor="privacy-support" className="text-sm text-gray-300">
                          <span>Kişisel verilerimin işlenmesine izin veriyorum. </span>
                          <a href="/privacy-policy" className="text-primary hover:underline">Gizlilik Politikası</a>
                        </label>
                      </div>
                      
                      <Button type="submit" className="bg-primary">
                        <Send className="w-4 h-4 mr-2" />
                        Destek Talebi Gönder
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-950 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-medium text-white mb-2">Destek Talebiniz Oluşturuldu!</h3>
                      <p className="text-gray-300 mb-2">
                        Destek talebiniz başarıyla oluşturuldu. Talep numaranız: <strong className="text-white">ST-12345</strong>
                      </p>
                      <p className="text-gray-300 mb-8">
                        Destek ekibimiz en kısa sürede talebinizi inceleyecek ve size geri dönüş yapacaktır. Destek talebinizin durumunu e-posta adresinize gönderilen bağlantıdan takip edebilirsiniz.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            subject: "",
                            message: ""
                          });
                        }}
                      >
                        Yeni Destek Talebi Oluştur
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 bg-darkSurface border border-darkBorder rounded-lg p-6">
            <h3 className="text-xl font-medium text-white mb-4">Sık Sorulan Sorular</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-1">Yanıtınızı ne kadar sürede alabilirim?</h4>
                <p className="text-gray-300">İletişim formlarına genellikle 24 saat içinde, destek taleplerine ise 48 saat içinde yanıt veriyoruz.</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Telefon desteği hangi saatlerde aktif?</h4>
                <p className="text-gray-300">Telefon desteğimiz Pazartesi-Cuma 09:00-18:00 saatleri arasında aktiftir.</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Şirket ziyaretleri için randevu almalı mıyım?</h4>
                <p className="text-gray-300">Ofisimizi ziyaret etmek için önceden randevu almanızı öneririz. İletişim bilgilerimizden bize ulaşarak randevu alabilirsiniz.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-darkSurface border border-darkBorder rounded-lg overflow-hidden mb-16">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12041.924036002229!2d29.056413586499998!3d40.98096252246445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7f2b2c3e2e7%3A0xc1c31adc6e7a8d05!2zQmHEn2RhdCBDZC4sIEthZMSxa8O2eS9JbmRpc3RyaWJ1bA!5e0!3m2!1sen!2str!4v1649770122932!5m2!1sen!2str" 
          width="100%" 
          height="400" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Sosyal Medyada Bizi Takip Edin</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-6">
          En güncel haberler, videolar ve promosyonlar için sosyal medya hesaplarımızı takip edebilirsiniz
        </p>
        <div className="flex justify-center space-x-4">
          <a href="https://twitter.com/videoyap" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-darkBg border border-darkBorder rounded-full flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          <a href="https://facebook.com/videoyap" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-darkBg border border-darkBorder rounded-full flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
            </svg>
          </a>
          <a href="https://instagram.com/videoyap" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-darkBg border border-darkBorder rounded-full flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
            </svg>
          </a>
          <a href="https://youtube.com/videoyap" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-darkBg border border-darkBorder rounded-full flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a href="https://linkedin.com/company/videoyap" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-darkBg border border-darkBorder rounded-full flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.452h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zm-15.1-13.019c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019h-3.564v-11.452h3.564v11.452z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}