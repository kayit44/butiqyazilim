import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { PRODUCTS as STATIC_PRODUCTS } from '../constants';
import { db } from '../lib/firebase';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id?: string;
  title: string;
  description: string;
  category: string;
  image: string;
  features: string[];
  url?: string;
  tag?: string;
}

export default function ProductsTeaser() {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(2));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setDbProducts(data);
      } catch {
        // fallback to static
      }
    };
    fetchProducts();
  }, []);

  const allProducts: Product[] = [...dbProducts];
  (STATIC_PRODUCTS as Product[]).forEach(sp => {
    if (!dbProducts.find(dp => dp.title === sp.title)) allProducts.push(sp);
  });
  const teaserProducts = allProducts.slice(0, 2);

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
              Hazır Çözümler
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
                İşletmenizi hızlandıracak<br />hazır yazılımlar
              </motion.h2>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Link
              to="/urunler"
              className="group flex items-center gap-2 text-[15px] sm:text-[13px] font-medium hover:opacity-60 transition-opacity"
              style={{ color: 'var(--color-light-text)' }}
            >
              Tüm Ürünleri Gör
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        {teaserProducts.length === 0 && (
          <div
            className="py-20 text-center border"
            style={{ borderColor: 'var(--color-light-border)', borderRadius: '2px', background: 'var(--color-light-alt)' }}
          >
            <p className="text-[15px] sm:text-[13px] mb-4" style={{ color: 'var(--color-light-secondary)' }}>
              Hazır ürünlerimiz yakında burada olacak.
            </p>
            <Link
              to="/iletisim"
              className="text-[15px] sm:text-[12px] font-semibold hover:opacity-60 transition-opacity"
              style={{ color: 'var(--color-light-text)' }}
            >
              Özel çözüm için iletişime geçin →
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {teaserProducts.map((product, i) => (
            <motion.div
              key={product.id || i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group border flex flex-col overflow-hidden"
              style={{ borderColor: 'var(--color-light-border)', borderRadius: '2px' }}
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-[#ECEAE4]" style={{ height: '220px' }}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {product.tag && (
                  <div className="absolute top-4 right-4">
                    <span
                      className="text-[9px] font-mono px-2.5 py-1 uppercase tracking-[0.12em]"
                      style={{
                        background:   'var(--color-highlight)',
                        color:        'var(--color-on-highlight)',
                        borderRadius: '2px',
                      }}
                    >
                      {product.tag}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.18em]"
                    style={{ color: 'var(--color-light-secondary)' }}
                  >
                    {product.category}
                  </span>
                </div>

                <h3
                  className="font-bold mb-3 leading-snug"
                  style={{
                    fontFamily:    'var(--font-display)',
                    color:         'var(--color-light-text)',
                    fontSize:      '1.25rem',
                    letterSpacing: '-0.025em',
                  }}
                >
                  {product.title}
                </h3>
                <p
                  className="text-[15px] sm:text-[13px] leading-relaxed mb-6 flex-1"
                  style={{ color: 'var(--color-light-secondary)' }}
                >
                  {product.description}
                </p>

                {/* Features */}
                {product.features?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.features.slice(0, 3).map(f => (
                      <span
                        key={f}
                        className="text-[10px] px-2.5 py-1"
                        style={{
                          background:   'var(--color-light-alt)',
                          color:        'var(--color-light-secondary)',
                          borderRadius: '2px',
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer link */}
                <div
                  className="flex items-center justify-between pt-5 border-t"
                  style={{ borderColor: 'var(--color-light-border)' }}
                >
                  {product.url ? (
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] sm:text-[12px] font-semibold hover:opacity-60 transition-opacity"
                      style={{ color: 'var(--color-light-text)' }}
                    >
                      Ürünü İncele →
                    </a>
                  ) : (
                    <Link
                      to="/urunler"
                      className="text-[15px] sm:text-[12px] font-semibold hover:opacity-60 transition-opacity"
                      style={{ color: 'var(--color-light-text)' }}
                    >
                      Detayları Gör →
                    </Link>
                  )}
                  <div
                    className="w-8 h-8 border flex items-center justify-center group-hover:bg-highlight group-hover:border-highlight transition-all duration-200"
                    style={{ borderColor: 'var(--color-light-border)', borderRadius: '2px' }}
                  >
                    <ArrowUpRight size={13} style={{ color: 'var(--color-light-secondary)' }} className="group-hover:text-[var(--color-on-highlight)] transition-colors duration-200" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
