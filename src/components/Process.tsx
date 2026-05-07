import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { PROCESS } from '../constants';
import { Link } from 'react-router-dom';

const STEP_IMAGES = ['/designer.jpg', '/figma1.jpg', '/kdlama.jpg', '/hosting.jpg'];

function ProcessStep({
  step,
  index,
  image,
}: {
  step: { title: string; description: string };
  index: number;
  image: string;
}) {
  const ref      = useRef<HTMLDivElement>(null);
  const textRef  = useRef<HTMLDivElement>(null);
  const inView   = useInView(textRef, { once: true, margin: '-120px' });
  const isEven   = index % 2 === 0;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY  = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const numOp = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 0.12, 0]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 border-b"
      style={{ borderColor: 'var(--color-border)', minHeight: '520px' }}
    >
      {/* ── Image panel ── */}
      <div
        className={`relative overflow-hidden aspect-video md:aspect-auto md:min-h-[360px] ${isEven ? 'md:order-1' : 'md:order-2'}`}
      >
        {/* Parallax image */}
        <motion.div
          className="absolute inset-0 w-full"
          style={{ y: imgY, height: '122%', top: '-11%', willChange: 'transform' }}
        >
          <img
            src={image}
            alt={step.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.62) contrast(1.06) saturate(1.08)', transform: 'translateZ(0)' }}
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        {/* Dark gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: isEven
              ? 'linear-gradient(to right, rgba(6,6,7,0) 45%, rgba(6,6,7,0.55) 100%)'
              : 'linear-gradient(to left,  rgba(6,6,7,0) 45%, rgba(6,6,7,0.55) 100%)',
          }}
        />

        {/* Giant ghost number */}
        <motion.span
          className="absolute bottom-0 pointer-events-none select-none leading-none font-black"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(7rem, 18vw, 15rem)',
            color: 'white',
            letterSpacing: '-0.06em',
            opacity: numOp,
            left: isEven ? '1rem' : 'auto',
            right: isEven ? 'auto' : '1rem',
            bottom: '-0.12em',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
      </div>

      {/* ── Text panel ── */}
      <div
        ref={textRef}
        className={`flex flex-col justify-center px-8 md:px-16 py-16 md:py-20 ${
          isEven ? 'md:order-2' : 'md:order-1'
        }`}
      >
        {/* Step label */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 24 : -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-label mb-8"
        >
          Adım {String(index + 1).padStart(2, '0')}
        </motion.div>

        {/* Title — clip reveal */}
        <div className="overflow-hidden mb-6">
          <motion.h3
            initial={{ y: '105%', skewY: 1.5 }}
            animate={inView ? { y: 0, skewY: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.9rem, 3.8vw, 3.2rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              color: 'var(--color-primary)',
            }}
          >
            {step.title}
          </motion.h3>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="leading-relaxed max-w-sm"
          style={{ fontSize: '15px', color: 'var(--color-secondary)' }}
        >
          {step.description}
        </motion.p>

        {/* Step connector line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 origin-left"
          style={{
            height: '1px',
            width: '48px',
            background: 'var(--color-highlight)',
          }}
        />
      </div>
    </div>
  );
}

export default function Process() {
  return (
    <section id="surec" className="bg-background border-t border-border">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="section-label mb-6">Sürecimiz</div>
            <h2 className="section-title-dark">
              Fikirlerinizi çalışan<br />ürünlere dönüştürüyoruz
            </h2>
          </div>
          <p className="text-[15px] sm:text-[13px] text-secondary leading-relaxed max-w-xs">
            Baştan sona şeffaf ve öngörülebilir bir iş süreciyle projenizi
            zamanında ve beklentilerin ötesinde teslim ediyoruz.
          </p>
        </div>
      </div>

      {/* Steps — full-width alternating panels */}
      <div className="border-t" style={{ borderColor: 'var(--color-border)' }}>
        {PROCESS.map((step, i) => (
          <ProcessStep
            key={step.title}
            step={step}
            index={i}
            image={STEP_IMAGES[i] ?? '/1.jpg'}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-6 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 border border-border"
          style={{ borderRadius: '2px' }}
        >
          <div>
            <p className="text-primary font-semibold text-[16px] mb-1">
              Projenizi hayata geçirelim
            </p>
            <p className="text-secondary text-[15px] sm:text-[13px]">
              Ücretsiz ön görüşme için bugün ulaşın.
            </p>
          </div>
          <Link
            to="/iletisim"
            className="shrink-0 h-10 px-7 text-[15px] sm:text-[13px] font-medium inline-flex items-center transition-opacity duration-200 hover:opacity-85"
            style={{ background: 'var(--color-highlight)', color: 'var(--color-on-highlight)', borderRadius: '2px' }}
          >
            Ücretsiz Görüşme →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
