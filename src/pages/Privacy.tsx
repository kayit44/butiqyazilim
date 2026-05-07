import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const sections = [
  { title: '1. Veri Toplama', text: 'Butiq Yazılım olarak, hizmetlerimizi sağlamak ve iyileştirmek amacıyla yalnızca gerekli olan verileri topluyoruz. Bu veriler, iletişim formları aracılığıyla sağladığınız isim ve e-posta adresini içerebilir.' },
  { title: '2. Veri Kullanımı', text: 'Toplanan bilgiler, taleplerinize yanıt vermek, projeleriniz hakkında bilgi sağlamak ve bültenimize kayıt olmanız durumunda güncellemeleri paylaşmak için kullanılır. Verileriniz asla üçüncü şahıslara satılmaz.' },
  { title: '3. Çerezler', text: 'Web sitemiz deneyiminizi iyileştirmek için temel çerezler kullanabilir. Tarayıcı ayarlarınızdan çerez tercihlerinizi yönetebilirsiniz.' },
  { title: '4. İletişim', text: 'Gizlilik politikamız hakkında sorularınız için iletisim@butiqyazilim.com adresi üzerinden bizimle iletişime geçebilirsiniz.' },
];

export default function Privacy() {
  useSEO({
    title: 'Gizlilik Politikası',
    description: 'Butiq Yazılım gizlilik politikası. Kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi edinin.',
    path: '/gizlilik',
  });
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border pt-28 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[12px] font-mono text-secondary hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            Ana Sayfa
          </Link>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold text-primary"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.04em' }}
            >
              Gizlilik Politikası
            </motion.h1>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--color-light)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="space-y-0 border-t" style={{ borderColor: 'var(--color-light-border)' }}>
            {sections.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="py-8 border-b"
                style={{ borderColor: 'var(--color-light-border)' }}
              >
                <h2 className="text-[15px] font-bold mb-3" style={{ color: 'var(--color-light-text)' }}>
                  {s.title}
                </h2>
                <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-light-secondary)' }}>
                  {s.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
