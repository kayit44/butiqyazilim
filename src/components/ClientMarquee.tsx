import { motion } from 'motion/react';

const TECH_ITEMS = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Firebase',
  'PostgreSQL', 'Tailwind CSS', 'Framer Motion', 'Stripe',
  'Python', 'MongoDB', 'Express', 'Three.js', 'OpenAI API'
];

export default function ClientMarquee() {
  const doubled = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div
      className="w-full border-t border-b overflow-hidden select-none"
      style={{
        backgroundColor: 'var(--color-light-alt)',
        borderColor: 'var(--color-light-border)',
      }}
    >
      <div className="flex whitespace-nowrap py-4">
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex items-center gap-10 pl-10"
        >
          {doubled.map((item, idx) => (
            <span
              key={idx}
              className="font-mono text-[11px] uppercase tracking-[0.22em] shrink-0"
              style={{ color: 'var(--color-light-secondary)' }}
            >
              {item}
              <span
                className="ml-10"
                style={{ color: 'var(--color-light-border)' }}
              >
                ×
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
