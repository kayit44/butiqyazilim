import { motion } from 'motion/react';

interface ScrollBandProps {
  text?: string;
  dark?: boolean;
  reverse?: boolean;
}

export default function ScrollBand({
  text = 'STRATEJİ · TASARIM · TEKNOLOJİ · YAZILIM · MOBİL · E-TİCARET · SAAS · MARKA',
  dark = true,
  reverse = false,
}: ScrollBandProps) {
  const repeated = Array(4).fill(text).join('  ·  ');

  return (
    <div
      className="overflow-hidden py-4 border-t border-b select-none"
      style={{
        backgroundColor: dark ? 'var(--color-surface)' : 'var(--color-light-alt)',
        borderColor: dark ? 'var(--color-border)' : 'var(--color-light-border)',
      }}
    >
      <motion.div
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap"
      >
        {[repeated, repeated].map((t, i) => (
          <span
            key={i}
            className="font-mono text-[11px] uppercase tracking-[0.25em] pr-16"
            style={{ color: dark ? 'var(--color-border)' : 'var(--color-light-border)', filter: 'brightness(1.6)' }}
          >
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
