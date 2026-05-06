import { motion, useInView } from 'motion/react';
import { SERVICES } from '../constants';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useState } from 'react';

export default function Services() {
  const navigate  = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="hizmetler"
      style={{ backgroundColor: 'var(--color-light)', borderTop: '1px solid var(--color-light-border)' }}
    >
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
              Hizmetler
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
                Hangi konularda<br />destek olabiliriz?
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-[14px] leading-relaxed max-w-xs"
            style={{ color: 'var(--color-light-secondary)' }}
          >
            İşini özenle yapan bir butik stüdyonun elinden çıkan pratik dijital çözümler.
          </motion.p>
        </div>

        {/* Service rows */}
        <div className="border-t" style={{ borderColor: 'var(--color-light-border)' }}>
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => navigate(`/hizmet/${service.id}`)}
              onMouseEnter={() => setHovered(service.id)}
              onMouseLeave={() => setHovered(null)}
              className="group flex items-center justify-between gap-6 py-8 border-b cursor-pointer px-4 -mx-4"
              style={{
                borderColor:     'var(--color-light-border)',
                backgroundColor: hovered === service.id ? 'var(--color-light-alt)' : 'transparent',
                transition:      'background-color 0.2s ease',
              }}
            >
              {/* Left */}
              <div className="flex items-center gap-8 md:gap-12 min-w-0">
                <span
                  className="font-mono text-[11px] shrink-0 w-7 tabular-nums"
                  style={{
                    color:      hovered === service.id ? 'var(--color-highlight)' : 'var(--color-light-secondary)',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3
                    className="text-[17px] md:text-[21px] font-bold leading-snug mb-1"
                    style={{
                      fontFamily:    'var(--font-display)',
                      color:         'var(--color-light-text)',
                      letterSpacing: '-0.025em',
                      transform:     hovered === service.id ? 'translateX(6px)' : 'none',
                      transition:    'transform 0.25s ease',
                    }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-[12px] leading-relaxed hidden sm:block" style={{ color: 'var(--color-light-secondary)' }}>
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden md:block w-20 h-13 overflow-hidden" style={{ borderRadius: '2px' }}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    style={{
                      transform: hovered === service.id ? 'scale(1.1) translateZ(0)' : 'scale(1) translateZ(0)',
                      transition: 'transform 0.6s ease',
                      filter: 'contrast(1.05) saturate(1.08)',
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div
                  className="w-9 h-9 border flex items-center justify-center"
                  style={{
                    borderRadius:    '2px',
                    backgroundColor: hovered === service.id ? 'var(--color-highlight)' : 'transparent',
                    borderColor:     hovered === service.id ? 'var(--color-highlight)' : 'var(--color-light-border)',
                    transition:      'all 0.2s ease',
                  }}
                >
                  <ArrowUpRight
                    size={15}
                    style={{ color: hovered === service.id ? 'var(--color-on-highlight)' : 'var(--color-light-secondary)' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
