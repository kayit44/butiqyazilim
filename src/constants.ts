import { 
  ShoppingBag, 
  User, 
  Building2, 
  Code2,
  Cpu,
  MonitorSmartphone,
  Zap,
  Brain,
  Smartphone
} from 'lucide-react';

export const NAV_LINKS = [
  { label: 'Hizmetler', href: '#hizmetler' },
  { label: 'Ürünlerimiz', href: '/urunler' },
  { label: 'Projeler', href: '/projeler' },
  { label: 'İletişim', href: '/iletisim' },
];

export const SERVICES = [
  {
    id: 'e-commerce',
    title: 'E-Ticaret Sitesi Kurulumu',
    description: 'İşletmenizi internete taşıyan, kolay yönetilebilir online satış siteleri.',
    icon: ShoppingBag,
    details: 'Ürünlerinizi sergileyebileceğiniz, güvenli ödeme altyapısına sahip kullanıcı dostu mağazalar.',
    image: '/e-tic.jpg'
  },
  {
    id: 'corporate',
    title: 'Kurumsal Web Tasarımı',
    description: 'Şirketinizin vizyonunu yansıtan, modern ve mobil uyumlu web siteleri.',
    icon: Building2,
    details: 'İşletmenizi profesyonel bir şekilde tanıtan, hızlı ve güvenilir web sayfaları.',
    image: '/kurumsal1.jpg'
  },
  {
    id: 'personal',
    title: 'Kişisel Web Siteleri',
    description: 'Projelerinizi ve özgeçmişinizi paylaşabileceğiniz şık kişisel sayfalar.',
    icon: User,
    details: 'Profesyonel imajınızı destekleyen, özgün ve sade tasarımlı portfolyo siteleri.',
    image: '/kisisel.jpg'
  },

  {
    id: 'mobile-dev',
    title: 'Mobil Çözümler',
    description: 'Telefon öncelikli düşünülerek geliştirilen, hızlı ve kullanışlı dijital çözümler.',
    icon: Smartphone,
    details: 'Her cihazda sorunsuz çalışan, kullanıcı dostu mobil deneyimler tasarlıyoruz.',
    image: '/mobile.jpg'
  },


];

export const PROCESS = [
  {
    title: 'Planlama',
    description: 'İhtiyaçlarınızı beraber belirliyor ve nasıl bir yol izleyeceğimizi konuşuyoruz.',
    icon: MonitorSmartphone
  },
  {
    title: 'Arayüz Çalışması',
    description: 'Sitenizin nasıl görüneceğine dair şablon tasarımlar hazırlıyoruz.',
    icon: Cpu
  },
  {
    title: 'Kodlama Süreci',
    description: 'Tasarımı güncel teknolojilerle çalışan bir yapıya dönüştürüyoruz.',
    icon: Code2
  },
  {
    title: 'Destek ve Yayın',
    description: 'Sitenizi yayına alıyor, sonrasında gerekli teknik desteği sağlıyoruz.',
    icon: Zap
  }
];

export const PROJECTS = [
  // E-Commerce
  

];


export const FAQS = [
  {
    question: 'Bir projenin tamamlanma süresi nedir?',
    answer: 'Projenin kapsamına bağlı olarak değişkenlik gösterse de, kurumsal web sitelerini genellikle 1 hafta, e-ticaret çözümlerini ise 2 hafta içinde tamamlıyoruz.'
  },
  {
    question: 'Süreç bittikten sonra destek veriyor musunuz?',
    answer: 'Evet, yayın sonrası teknik destek ve bakım hizmetlerimizle her zaman yanınızdayız. Sitenizin güncel ve güvenli kalmasını sağlıyoruz.'
  },
  {
    question: 'Tasarımlar mobil uyumlu mu?',
    answer: 'Kesinlikle. Geliştirdiğimiz tüm projeler mobil, tablet ve masaüstü cihazlarda kusursuz çalışacak şekilde tasarlanmaktadır.'
  },
  {
    question: 'Fiyatlandırma nasıl belirleniyor?',
    answer: 'Her proje benzersizdir. İhtiyaçlarınızı dinledikten sonra projenin karmaşıklığına ve gereken özelliklere göre size özel bir teklif hazırlıyoruz.'
  }
];







export const TECHNOLOGIES = [
  'React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js', 
  'Firebase', 'MongoDB', 'PostgreSQL', 'Three.js', 'Framer Motion', 
  'Stripe', 'Python', 'Go', 'Express', 'Laravel', 'WordPress', 
  'Web3', 'Gemini API', 'OpenAI', 'Google Maps'
];

export const RESTAURANT_APP_FEATURES = [
  {
    title: 'Canlı Sipariş Takibi',
    description: 'Mutfak ve paket servis süreçlerini anlık olarak takip edin, gecikmeleri önleyin.',
    icon: Zap
  },
  {
    title: 'QR Menü Entegrasyonu',
    description: 'Müşterileriniz masadan QR kod ile sipariş versin, doğrudan sisteme düşsün.',
    icon: Smartphone
  },
  {
    title: 'Detaylı Raporlama',
    description: 'Günlük, haftalık ve aylık satış verilerinizi tek tıkla analiz edin.',
    icon: Brain
  },
  {
    title: 'Abonelik Sistemi',
    description: 'Düşük başlangıç maliyeti ve aylık uygun ödeme seçenekleriyle hemen kullanın.',
    icon: Code2
  }
];

export const PRODUCTS: {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  url: string;
  tag?: string;
}[] = [];
