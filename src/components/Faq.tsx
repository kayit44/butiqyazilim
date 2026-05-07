import { motion, AnimatePresence, useInView } from 'motion/react';
import { useState, useRef } from 'react';
import { FAQS } from '../constants';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ backgroundColor: 'var(--color-light)', borderTop: '1px solid var(--color-light-border)' }}>
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

        {/* Header */}
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="section-label-light mb-6"
            >
              SSS
            </motion.div>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={{ y: '100%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-bold leading-[1.02]"
                style={{
                  fontFamily:    'var(--font-display)',
                  color:         'var(--color-light-text)',
                  fontSize:      'clamp(1.9rem, 3.8vw, 3.4rem)',
                  letterSpacing: '-0.04em',
                }}
              >
                Merak edilen<br />sorular
              </motion.h2>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col gap-3 md:items-end shrink-0"
          >
            <p className="text-[18px] sm:text-[14px] leading-relaxed max-w-xs md:text-right" style={{ color: 'var(--color-light-secondary)' }}>
              Başlamadan önce aklınıza takılan sorulara yanıt bulun.
            </p>
            <Link
              to="/iletisim"
              className="text-[17px] sm:text-[12px] font-semibold hover:opacity-60 transition-opacity"
              style={{ color: 'var(--color-light-text)' }}
            >
              Başka sorunuz mu var? Yazın →
            </Link>
          </motion.div>
        </div>

        {/* Two-column layout: accordion + side info */}
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Accordion */}
          <div
            className="flex-1 border-t"
            style={{ borderColor: 'var(--color-light-border)' }}
          >
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full py-6 flex items-start justify-between text-left gap-6 group border-b"
                  style={{ borderColor: 'var(--color-light-border)' }}
                >
                  <div className="flex items-start gap-5 min-w-0">
                    <span
                      className="font-mono text-[10px] shrink-0 mt-0.5 tabular-nums"
                      style={{ color: openIndex === i ? 'var(--color-highlight)' : 'var(--color-light-secondary)', transition: 'color 0.2s ease' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="text-[15px] font-semibold leading-snug group-hover:opacity-70 transition-opacity duration-200"
                      style={{
                        color:     'var(--color-light-text)',
                        transform: openIndex === i ? 'translateX(3px)' : 'none',
                        transition: 'transform 0.25s ease',
                      }}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className="w-7 h-7 border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200"
                    style={{
                      borderColor:     openIndex === i ? 'var(--color-highlight)' : 'var(--color-light-border)',
                      borderRadius:    '2px',
                      backgroundColor: openIndex === i ? 'var(--color-highlight)' : 'transparent',
                    }}
                  >
                    <Plus
                      size={14}
                      className={`transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}
                      color={openIndex === i ? 'var(--color-on-highlight)' : 'var(--color-light-secondary)'}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div
                        className="pl-10 pr-12 py-5 text-[18px] sm:text-[14px] leading-[1.85]"
                        style={{ color: 'var(--color-light-secondary)' }}
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Side panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="lg:w-72 shrink-0"
          >
            <div
              className="p-8"
              style={{ backgroundColor: 'var(--color-light-alt)', borderRadius: '2px' }}
            >
              <span
                style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--color-highlight)', display: 'block', marginBottom: '1.25rem' }}
              >
                — Hızlı Destek
              </span>
              <h3
                className="font-bold mb-4 leading-snug"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-light-text)', fontSize: '1.15rem', letterSpacing: '-0.02em' }}
              >
                Cevabını bulamadınız mı?
              </h3>
              <p className="text-[17px] sm:text-[13px] leading-relaxed mb-7" style={{ color: 'var(--color-light-secondary)' }}>
                Projeniz hakkında konuşmak veya teklife ihtiyaç duymak için bize yazın.
              </p>
              <Link
                to="/iletisim"
                className="inline-flex items-center justify-center w-full h-10 text-[17px] sm:text-[12px] font-semibold hover:opacity-85 transition-opacity"
                style={{ backgroundColor: 'var(--color-highlight)', color: 'var(--color-on-highlight)', borderRadius: '2px' }}
              >
                İletişime Geç
              </Link>
            </div>

            <div className="mt-6 space-y-5">
              {[
                { label: 'Proje süresi', value: '1 hafta' },
                { label: 'Ödeme modeli',  value: 'Milestone bazlı' },
                { label: 'Destek',        value: 'Yayın sonrası dahil' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-3.5 border-b" style={{ borderColor: 'var(--color-light-border)' }}>
                  <span className="text-[17px] sm:text-[12px]" style={{ color: 'var(--color-light-secondary)' }}>{item.label}</span>
                  <span className="text-[17px] sm:text-[12px] font-semibold" style={{ color: 'var(--color-light-text)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
