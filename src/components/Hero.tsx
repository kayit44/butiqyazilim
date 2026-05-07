import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SLIDES = [
  {
    image:   '/yazilim.jpg',
    imageMd: '/yazilim-w.jpg',
    tag:   'Yazılım & Tasarım Stüdyosu',
    line1: 'MARKANIZA',
    line2: 'ÖZEL',
    line3: 'YAZILIM',
    cta:   'Proje Başlatın',
  },
  {
    image:   '/shopping1.jpg',
    imageMd: '/shoppin-w.jpg',
    tag:   'E-Ticaret Çözümleri',
    line1: 'SATIŞ',
    line2: 'ARTIRAN',
    line3: 'MAĞAZALAR',
    cta:   'E-Ticaret',
  },
  {
    image:   '/kurums1.jpg',
    imageMd: '/kurums1-w.jpg',
    tag:   'Kurumsal Web',
    line1: 'GÜÇLÜ',
    line2: 'KURUMSAL',
    line3: 'KİMLİK',
    cta:   'Keşfet',
  },
  {
    image:   '/var.jpg',
    imageMd: '/var-w.jpg',
    tag:   'Strateji · Tasarım · Kod',
    line1: 'DİJİTALDE',
    line2: 'VAR',
    line3: 'OLMAK',
    cta:   'Bize Ulaşın',
  },
];

const DURATION = 5500;

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div style={{ overflow: 'hidden', lineHeight: '0.93' }}>
      <motion.div
        initial={{ y: '103%', skewY: 2 }}
        animate={{ y: 0, skewY: 0 }}
        exit={{ y: '-103%', skewY: -1, opacity: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const goTo = (idx: number) => setCurrent(idx);

  useEffect(() => {
    timerRef.current = setTimeout(() => goTo((current + 1) % SLIDES.length), DURATION);
    return () => clearTimeout(timerRef.current);
  }, [current]);

  const slide = SLIDES[current];

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '100svh', minHeight: 600 }}>

      {/* ── Background slides ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: DURATION / 1000 + 2, ease: 'linear' }}
            style={{ willChange: 'transform' }}
          >
            <picture style={{ width: '100%', height: '100%', display: 'contents' }}>
              <source media="(min-width: 768px)" srcSet={slide.imageMd} />
              <img
                src={slide.image}
                alt={slide.line1}
                className="w-full h-full object-cover"
                style={{
                  filter: 'brightness(0.52) contrast(1.08) saturate(1.1)',
                  transform: 'translateZ(0)',
                  objectPosition: 'center center',
                }}
                fetchPriority={current === 0 ? 'high' : 'auto'}
                loading="eager"
                decoding="async"
              />
            </picture>
          </motion.div>
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(6,6,7,0.88) 0%, rgba(6,6,7,0.28) 40%, rgba(6,6,7,0.05) 100%)' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Thin vertical accent line (left) ── */}
      <div
        className="absolute left-6 md:left-16 top-0 bottom-0 z-10 hidden md:flex flex-col items-center"
        style={{ width: 1 }}
      >
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="origin-top w-full"
          style={{ height: '100%', background: 'linear-gradient(to bottom, transparent 0%, rgba(232,197,71,0.18) 30%, rgba(232,197,71,0.18) 70%, transparent 100%)' }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-20 md:pb-24">

        {/* Tag */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`tag-${current}`}
            className="mb-6 md:mb-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.28em', color: 'rgba(242,239,233,0.5)' }}
          >
            — {slide.tag}
          </motion.p>
        </AnimatePresence>

        {/* Headline */}
        <AnimatePresence mode="wait">
          <div key={`headline-${current}`}>
            <Reveal delay={0.28}>
              <span className="hero-display block text-white">
                {slide.line1}
              </span>
            </Reveal>
            <Reveal delay={0.40}>
              <span className="hero-display block" style={{ color: 'var(--color-highlight)' }}>
                {slide.line2}
              </span>
            </Reveal>
            <Reveal delay={0.52}>
              <span className="hero-display block text-white">
                {slide.line3}
              </span>
            </Reveal>
          </div>
        </AnimatePresence>

        {/* CTA */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`cta-${current}`}
            className="mt-10 md:mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.68 }}
          >
            <Link
              to="/iletisim"
              className="group h-12 px-8 inline-flex items-center gap-2.5 font-semibold text-[14px] hover:opacity-85 transition-opacity"
              style={{ background: 'var(--color-highlight)', color: 'var(--color-on-highlight)', borderRadius: '2px' }}
            >
              {slide.cta}
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="#hizmetler-wrapper"
              className="text-[12px] font-medium transition-colors hover:text-white/90"
              style={{ color: 'rgba(242,239,233,0.45)', letterSpacing: '0.06em' }}
            >
              Hizmetleri Keşfet ↓
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Slide counter top-right ── */}
      <div
        className="absolute top-24 right-6 md:right-16 z-10"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'rgba(242,239,233,0.3)' }}
      >
        {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
      </div>

      {/* ── Controls bottom-right ── */}
      <div className="absolute bottom-10 right-6 md:right-16 z-10 flex items-center gap-4">
        {/* Progress bar */}
        <div className="relative overflow-hidden" style={{ width: 64, height: 1, background: 'rgba(242,239,233,0.12)' }}>
          <motion.div
            key={current}
            className="absolute left-0 top-0 h-full"
            style={{ background: 'var(--color-highlight)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: DURATION / 1000, ease: 'linear' }}
          />
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slayt ${i + 1}`}
              style={{
                width:      i === current ? 20 : 5,
                height:     5,
                background: i === current ? 'var(--color-highlight)' : 'rgba(242,239,233,0.22)',
                borderRadius: 2,
                transition: 'all 0.35s ease',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Stats bottom-left ── */}
      <div className="absolute bottom-10 left-6 md:left-16 z-10 flex items-center gap-8 md:gap-12">
        {[
          { n: 'Butik',   label: 'Yaklaşım'    },
          { n: 'Hızlı',   label: 'Teslimat'    },
          { n: 'Özel',    label: 'Çözümler'    },
        ].map(s => (
          <div key={s.label} className="flex flex-col items-start">
            <span className="stat-number text-white leading-none" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>
              {s.n}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(242,239,233,0.35)', marginTop: 3 }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
