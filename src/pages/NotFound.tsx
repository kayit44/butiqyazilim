import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-lg"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary mb-6">
          Hata 404
        </p>
        <h1
          className="font-bold text-primary mb-4"
          style={{ fontSize: 'clamp(5rem, 18vw, 14rem)', lineHeight: 1, letterSpacing: '-0.06em' }}
        >
          404
        </h1>
        <p className="text-secondary text-[15px] leading-relaxed mb-10 max-w-sm mx-auto">
          Aradığınız sayfa silinmiş, ismi değiştirilmiş veya geçici olarak
          kullanım dışı olabilir.
        </p>
        <Link
          to="/"
          className="h-11 px-8 bg-highlight text-[13px] font-semibold inline-flex items-center hover:opacity-90 transition-opacity"
          style={{ borderRadius: '2px', color: 'var(--color-on-highlight)' }}
        >
          Ana Sayfaya Dön →
        </Link>
      </motion.div>
    </div>
  );
}
