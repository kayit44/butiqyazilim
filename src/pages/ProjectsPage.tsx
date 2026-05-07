import { useEffect, useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { PROJECTS as STATIC_PROJECTS, SERVICES } from '../constants';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, X, Maximize2 } from 'lucide-react';
import PhoneFrame from '../components/PhoneFrame';

export default function ProjectsPage() {
  useSEO({
    title: 'Projeler — Portföyümüz',
    description:
      'Butiq Yazılım tarafından geliştirilen web tasarım, e-ticaret ve yazılım projelerini inceleyin. Gerçek müşteri projeleri ve referanslar.',
    path: '/projeler',
  });

  const [dynamicProjects, setDynamicProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        setDynamicProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch {
        // fallback
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const allProjects = [...dynamicProjects, ...STATIC_PROJECTS];

  return (
    <div className="min-h-screen bg-background">

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/96 flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
              >
                <X size={28} />
              </button>
              <img
                src={selectedImage}
                className="w-full max-h-[85vh] object-contain"
                alt="Proje görüntüsü"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page header - dark */}
      <div className="bg-background border-b border-border pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[12px] font-mono text-secondary hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              Ana Sayfa
            </Link>
          </motion.div>

          <div className="section-label mb-6">Portfolyo</div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold text-primary leading-[1.0]"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '-0.04em' }}
            >
              Neler yaptık?
            </motion.h1>
          </div>

        </div>
      </div>

      {/* Projects grid - light bg */}
      <div style={{ backgroundColor: 'var(--color-light)' }}>
        <div className="max-w-7xl mx-auto px-6 py-20">

          {loading ? (
            <div className="py-20 text-center" style={{ color: 'var(--color-light-secondary)' }}>
              <p className="font-mono text-[12px] uppercase tracking-[0.2em]">Yükleniyor...</p>
            </div>
          ) : allProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {allProjects.map((project, i) => (
                <motion.div
                  key={project.id || i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  {/* Image */}
                  {project.serviceId === 'mobile-dev' ? (
                    <Link
                      to="/hizmet/mobile-dev"
                      className="relative mb-5 border flex items-center justify-center block"
                      style={{
                        borderColor: 'var(--color-light-border)',
                        borderRadius: '2px',
                        background: 'linear-gradient(135deg,#1a1a2e 0%,#0f0f1a 100%)',
                        padding: '32px 0',
                      }}
                    >
                      <div className="group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                        <PhoneFrame src={project.image} alt={project.title} width={180} />
                      </div>
                      {/* Service badge */}
                      <div className="absolute bottom-3 left-3">
                        <span
                          className="font-mono text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 backdrop-blur-sm"
                          style={{ background: 'rgba(245,243,239,0.85)', color: 'var(--color-light-text)', borderRadius: '2px' }}
                        >
                          {SERVICES.find(s => s.id === project.serviceId)?.title || 'Genel Proje'}
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <div
                      className="relative aspect-video overflow-hidden mb-5 border"
                      style={{ borderColor: 'var(--color-light-border)', borderRadius: '2px', background: 'var(--color-light-alt)' }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out cursor-zoom-in"
                        referrerPolicy="no-referrer"
                        onClick={() => setSelectedImage(project.image)}
                      />

                      {/* Action buttons */}
                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => setSelectedImage(project.image)}
                          className="w-9 h-9 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                          style={{ borderRadius: '2px' }}
                        >
                          <Maximize2 size={14} style={{ color: 'var(--color-light-text)' }} />
                        </button>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                            style={{ borderRadius: '2px' }}
                            onClick={e => e.stopPropagation()}
                          >
                            <ExternalLink size={14} style={{ color: 'var(--color-light-text)' }} />
                          </a>
                        )}
                      </div>

                      {/* Service badge */}
                      <div className="absolute bottom-3 left-3">
                        <span
                          className="font-mono text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 backdrop-blur-sm"
                          style={{ background: 'rgba(245,243,239,0.85)', color: 'var(--color-light-text)', borderRadius: '2px' }}
                        >
                          {SERVICES.find(s => s.id === project.serviceId)?.title || 'Genel Proje'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3
                        className="text-[18px] font-bold mb-1.5 group-hover:opacity-70 transition-opacity"
                        style={{ color: 'var(--color-light-text)' }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-[13px] leading-relaxed"
                        style={{ color: 'var(--color-light-secondary)' }}
                      >
                        {project.description}
                      </p>
                    </div>
                    {project.serviceId === 'mobile-dev' ? (
                      <Link
                        to="/hizmet/mobile-dev"
                        className="shrink-0 text-[11px] font-mono uppercase tracking-[0.15em] hover:opacity-60 transition-opacity mt-1"
                        style={{ color: 'var(--color-highlight)' }}
                      >
                        İncele →
                      </Link>
                    ) : project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 text-[11px] font-mono uppercase tracking-[0.15em] hover:opacity-60 transition-opacity mt-1"
                        style={{ color: 'var(--color-highlight)' }}
                      >
                        İncele →
                      </a>
                    ) : null}
                  </div>

                </motion.div>
              ))}
            </div>
          ) : (
            <div
              className="py-24 text-center border"
              style={{ borderColor: 'var(--color-light-border)', borderRadius: '2px' }}
            >
              <p className="text-[14px] mb-4" style={{ color: 'var(--color-light-secondary)' }}>
                Henüz proje eklenmemiş.
              </p>
              <Link
                to="/iletisim"
                className="text-[13px] font-semibold hover:opacity-60 transition-opacity"
                style={{ color: 'var(--color-highlight)' }}
              >
                İlk projenizi başlatın →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
