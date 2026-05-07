import { useState, useEffect } from 'react';
import { useSEO } from '../hooks/useSEO';
import { motion } from 'motion/react';
import { PRODUCTS as STATIC_PRODUCTS } from '../constants';
import { db } from '../lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Check, ArrowRight } from 'lucide-react';
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

export default function ProductsPage() {
  useSEO({
    title: 'SaaS Ürünlerimiz — Hazır Yazılım Çözümleri',
    description:
      'Butiq Yazılım\'nun hazır SaaS çözümlerini keşfedin. Restoran yönetim sistemi, randevu uygulaması ve daha fazlası. Hemen kullanmaya başlayın.',
    path: '/urunler',
  });

  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        setDbProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
      } catch {
        // fallback
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const allProducts: Product[] = [...dbProducts];
  (STATIC_PRODUCTS as Product[]).forEach(sp => {
    if (!dbProducts.find(dp => dp.title === sp.title)) allProducts.push(sp);
  });

  return (
    <div className="min-h-screen bg-background">

      {/* Page header - dark */}
      <div className="bg-background border-b border-border pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="section-label mb-6">Hazır Çözümler</div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold text-primary leading-[1.0]"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '-0.04em' }}
            >
              SaaS Ürünlerimiz
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-secondary text-[15px] leading-relaxed mt-6 max-w-xl"
          >
            İhtiyacınıza yönelik, tak-çalıştır mantığında çalışan kurumsal yazılım paketleri.
          </motion.p>
        </div>
      </div>

      {/* Products - light bg */}
      <div style={{ backgroundColor: 'var(--color-light)' }}>
        <div className="max-w-7xl mx-auto px-6 py-20">

          {loading ? (
            <p className="text-center py-20 font-mono text-[12px] uppercase tracking-[0.2em]"
              style={{ color: 'var(--color-light-secondary)' }}>
              Yükleniyor...
            </p>
          ) : (
            <div className="space-y-6">
              {allProducts.map((product, i) => (
                <motion.div
                  key={product.id || i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group border overflow-hidden"
                  style={{ borderColor: 'var(--color-light-border)', borderRadius: '2px' }}
                >
                  <div className="grid lg:grid-cols-2">
                    {/* Image */}
                    <div
                      className="relative aspect-video lg:aspect-auto overflow-hidden border-b lg:border-b-0 lg:border-r"
                      style={{ borderColor: 'var(--color-light-border)', background: 'var(--color-light-alt)' }}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      {product.tag && (
                        <div
                          className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-[0.18em] px-3 py-1.5 font-bold"
                          style={{ background: 'var(--color-highlight)', color: 'var(--color-on-highlight)', borderRadius: '2px' }}
                        >
                          {product.tag}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12 flex flex-col justify-between" style={{ background: 'white' }}>
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <span
                            className="font-mono text-[10px] uppercase tracking-[0.18em]"
                            style={{ color: 'var(--color-light-secondary)' }}
                          >
                            Ürün #{String(i + 1).padStart(2, '0')}
                          </span>
                          <div className="h-px w-6" style={{ background: 'var(--color-light-border)' }} />
                          <span
                            className="font-mono text-[10px] uppercase tracking-[0.18em]"
                            style={{ color: 'var(--color-light-secondary)' }}
                          >
                            {product.category}
                          </span>
                        </div>

                        <h2
                          className="text-2xl md:text-3xl font-bold mb-3"
                          style={{ color: 'var(--color-light-text)' }}
                        >
                          {product.title}
                        </h2>
                        <p
                          className="text-[14px] leading-relaxed mb-8"
                          style={{ color: 'var(--color-light-secondary)' }}
                        >
                          {product.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-3">
                          {product.features?.map((feature: string) => (
                            <div
                              key={feature}
                              className="flex items-center gap-2.5 text-[13px]"
                              style={{ color: 'var(--color-light-secondary)' }}
                            >
                              <Check size={13} style={{ color: 'var(--color-highlight)', flexShrink: 0 }} />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div
                        className="flex justify-end pt-8 border-t mt-8"
                        style={{ borderColor: 'var(--color-light-border)' }}
                      >
                        {product.url ? (
                          <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-11 px-7 text-[13px] font-bold inline-flex items-center gap-2.5 hover:opacity-90 transition-opacity"
                            style={{ background: 'var(--color-highlight)', color: 'var(--color-on-highlight)', borderRadius: '2px' }}
                          >
                            Ürünü İncele
                            <ArrowRight size={14} />
                          </a>
                        ) : (
                          <Link
                            to="/iletisim"
                            className="h-11 px-7 text-[13px] font-bold inline-flex items-center gap-2.5 hover:opacity-90 transition-opacity"
                            style={{ background: 'var(--color-highlight)', color: 'var(--color-on-highlight)', borderRadius: '2px' }}
                          >
                            Bilgi Al
                            <ArrowRight size={14} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 border p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            style={{ borderColor: 'var(--color-light-border)', background: 'var(--color-light-alt)', borderRadius: '2px' }}
          >
            <div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: 'var(--color-light-text)' }}
              >
                Aradığınızı bulamadınız mı?
              </h3>
              <p
                className="text-[14px] leading-relaxed max-w-md"
                style={{ color: 'var(--color-light-secondary)' }}
              >
                Size özel, tamamen özgün bir yazılım geliştirilmesini isterseniz butik hizmetlerimizden yararlanabilirsiniz.
              </p>
            </div>
            <Link
              to="/iletisim"
              className="shrink-0 h-11 px-7 text-[13px] font-bold inline-flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity"
              style={{ background: 'var(--color-light-text)', borderRadius: '2px' }}
            >
              Teklif Alın →
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
