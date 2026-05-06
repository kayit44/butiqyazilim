import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const sections = [
  { title: '1. Hizmet Kapsamı', text: 'Butiq Studio, web tasarım, yazılım geliştirme ve dijital danışmanlık hizmetleri sunmaktadır. Hizmet detayları her proje için ayrı sözleşmelerle belirlenir.' },
  { title: '2. Fikri Mülkiyet', text: 'Proje tesliminden sonra telif hakları müşteriye devredilir. Geliştirme sürecinde kullanılan açık kaynak bileşenler kendi lisans koşullarına tabidir.' },
  { title: '3. Ödeme Koşulları', text: 'Ödeme planı proje başlangıcında belirlenir. Genel olarak %50 peşin, %50 teslimat şeklinde uygulanır. Gecikmeli ödemeler için faiz uygulanabilir.' },
  { title: '4. Revizyon Hakkı', text: 'Her proje belirli sayıda ücretsiz revizyon hakkı içerir. Bu limitin aşılması durumunda ek ücretlendirme yapılır.' },
  { title: '5. Sorumluluk Sınırı', text: 'Butiq Studio, üçüncü taraf servislerden kaynaklanan kesintilerden sorumlu tutulamaz. Azami sorumluluk, ilgili proje için ödenen tutarla sınırlıdır.' },
];

export default function Terms() {
  useEffect(() => { document.title = 'Kullanım Koşulları — Butiq Studio'; }, []);
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
              Kullanım Koşulları
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
