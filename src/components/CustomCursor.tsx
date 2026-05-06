import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [hov, setHov] = useState(false);
  const [visible, setVisible] = useState(false);

  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.2 });
  const tx = useSpring(x, { stiffness: 90,  damping: 22, mass: 0.6 });
  const ty = useSpring(y, { stiffness: 90,  damping: 22, mass: 0.6 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHov(!!(el.closest('a') || el.closest('button') || el.closest('[data-hover]')));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <>
      {/* Ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{ x: tx, y: ty, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{ width: hov ? 36 : 24, height: hov ? 36 : 24, opacity: hov ? 0.18 : 0.1 }}
          transition={{ duration: 0.18 }}
          style={{ background: 'var(--color-primary)', borderRadius: '50%' }}
        />
      </motion.div>

      {/* Dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{ width: hov ? 5 : 4, height: hov ? 5 : 4 }}
          transition={{ duration: 0.12 }}
          style={{ background: hov ? 'var(--color-highlight)' : 'var(--color-primary)', borderRadius: '50%' }}
        />
      </motion.div>
    </>
  );
}
