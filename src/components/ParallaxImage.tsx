import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';

interface ParallaxImageProps {
  image: string;
  label?: string;
  title: string;
  subtitle?: string;
  ctaHref?: string;
  height?: string;
}

export default function ParallaxImage({
  image,
  label = 'Portfolyo',
  title,
  subtitle,

  ctaHref = '/projeler',
  height = '70vh',
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  /* Image moves slower than scroll → parallax depth */
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  /* Text moves upward as you scroll into section */
  const textY = useTransform(scrollYProgress, [0.2, 0.7], ['30px', '-10px']);
  const textOp = useTransform(scrollYProgress, [0.15, 0.4, 0.75, 0.95], [0, 1, 1, 0]);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: `clamp(220px, 56.25vw, ${height})` }}
    >
      {/* Parallax image layer */}
      <motion.div
        className="absolute inset-0 w-full"
        style={{ y: imgY, height: '125%', top: '-12.5%', willChange: 'transform' }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.52) contrast(1.08) saturate(1.1)', transform: 'translateZ(0)' }}
          loading="lazy"
          decoding="async"
        />
      </motion.div>

      {/* Gradient */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top,rgba(6,6,7,0.65) 0%,rgba(6,6,7,0.08) 55%,transparent 100%)' }}
      />

      {/* Text overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-16 md:pb-20"
        style={{ y: textY, opacity: textOp }}
      >
        <p
          className="mb-4"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(242,239,233,0.5)',
          }}
        >
          — {label}
        </p>
        <h2
          className="font-bold text-white leading-[1.0] mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
            letterSpacing: '-0.04em',
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-[14px] mb-8 max-w-md" style={{ color: 'rgba(242,239,233,0.6)' }}>
            {subtitle}
          </p>
        )}
      
      </motion.div>
    </div>
  );
}
