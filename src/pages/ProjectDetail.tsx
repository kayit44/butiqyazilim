import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS as STATIC_PROJECTS, SERVICES } from '../constants';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ArrowLeft, ExternalLink, X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import PhoneFrame from '../components/PhoneFrame';

interface Project {
  id?: string;
  title: string;
  description: string;
  serviceId: string;
  image: string;
  images?: string[];
  tags: string[];
  url: string;
}

function PhoneMockup({ src, onZoom, onPrev, onNext, hasMultiple }: {
  src: string; onZoom: () => void; onPrev: () => void; onNext: () => void; hasMultiple: boolean;
}) {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ padding: '0 48px' }}>
      {hasMultiple && (
        <button
          onClick={onPrev}
          className="absolute left-0 z-10 w-9 h-9 flex items-center justify-center border transition-all hover:opacity-60"
          style={{ borderColor: 'var(--color-light-border)', color: 'var(--color-light-secondary)', borderRadius: '2px' }}
        >
          <ChevronLeft size={16} />
        </button>
      )}

      <div onClick={onZoom} style={{ cursor: 'zoom-in' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={src}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <PhoneFrame src={src} alt="Ekran görüntüsü" width={248} />
          </motion.div>
        </AnimatePresence>
      </div>

      {hasMultiple && (
        <button
          onClick={onNext}
          className="absolute right-0 z-10 w-9 h-9 flex items-center justify-center border transition-all hover:opacity-60"
          style={{ borderColor: 'var(--color-light-border)', color: 'var(--color-light-secondary)', borderRadius: '2px' }}
        >
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}

function MobileProjectCard({ project, onLightbox }: { project: Project; onLightbox: (img: string) => void }) {
  const allImages = [project.image, ...(project.images || [])].filter(Boolean);
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx(i => (i - 1 + allImages.length) % allImages.length);
  const next = () => setIdx(i => (i + 1) % allImages.length);

  return (
    <div>
      <PhoneMockup
        src={allImages[idx]}
        onZoom={() => onLightbox(allImages[idx])}
        onPrev={prev}
        onNext={next}
        hasMultiple={allImages.length > 1}
      />

      {/* Dots + counter */}
      {allImages.length > 1 && (
        <div className="flex flex-col items-center gap-2 mt-5 mb-4">
          <div className="flex items-center gap-1.5">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                style={{
                  width: i === idx ? 18 : 5,
                  height: 5,
                  borderRadius: '3px',
                  background: i === idx ? 'var(--color-highlight)' : 'var(--color-light-border)',
                  transition: 'all 0.3s ease',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] tracking-[0.18em]" style={{ color: 'var(--color-light-secondary)' }}>
            {idx + 1} / {allImages.length}
          </span>
        </div>
      )}

      {/* Meta */}
      <div className="flex items-start justify-between gap-4 mt-5">
        <div>
          <h3 className="text-[18px] font-bold mb-1.5" style={{ color: 'var(--color-light-text)' }}>
            {project.title}
          </h3>
          <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-light-secondary)' }}>
            {project.description}
          </p>
        </div>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.15em] hover:opacity-60 transition-opacity mt-1"
            style={{ color: 'var(--color-highlight)' }}
          >
            <ExternalLink size={11} />
            İncele
          </a>
        )}
      </div>

      {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="font-mono text-[9px] uppercase tracking-[0.15em] px-2.5 py-1"
              style={{ background: 'var(--color-light-alt)', color: 'var(--color-light-secondary)', borderRadius: '2px' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectDetail() {
  const { serviceId } = useParams();
  const [dynamicProjects, setDynamicProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isMobileApp = serviceId === 'mobile-dev';

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), where('serviceId', '==', serviceId));
        const snapshot = await getDocs(q);
        const sorted = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as Project))
          .sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setDynamicProjects(sorted);
      } catch {
        // fallback
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [serviceId]);

  const service = SERVICES.find(s => s.id === serviceId);

  useEffect(() => {
    if (service) document.title = `${service.title} — Butiq Studio`;
  }, [service]);

  const allProjects: Project[] = [
    ...dynamicProjects,
    ...(STATIC_PROJECTS as Project[]).filter(p => p.serviceId === serviceId),
  ];

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background">
        <h1 className="text-4xl font-bold text-primary mb-4">Hizmet Bulunamadı</h1>
        <Link to="/" className="text-[13px] font-mono" style={{ color: 'var(--color-highlight)' }}>
          Ana Sayfaya Dön →
        </Link>
      </div>
    );
  }

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
              className="relative max-w-md w-full"
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
                style={{ borderRadius: isMobileApp ? '1.5rem' : '2px' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page header */}
      <div className="bg-background border-b border-border pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center gap-6 mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[12px] font-mono text-secondary hover:text-primary transition-colors group"
              >
                <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                Ana Sayfa
              </Link>
              <span style={{ color: 'var(--color-border)' }}>/</span>
              <Link
                to="/projeler"
                className="inline-flex items-center gap-2 text-[12px] font-mono text-secondary hover:text-primary transition-colors group"
              >
                Tüm Projeler
              </Link>
            </div>
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
              {service.title}
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-secondary text-[15px] leading-relaxed mt-6 max-w-xl"
          >
            {service.details}
          </motion.p>
        </div>
      </div>

      {/* Projects */}
      <div style={{ backgroundColor: 'var(--color-light)' }}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          {loading ? (
            <p className="text-center py-20 font-mono text-[12px] uppercase tracking-[0.2em]"
              style={{ color: 'var(--color-light-secondary)' }}>
              Yükleniyor...
            </p>
          ) : allProjects.length > 0 ? (

            /* ── Mobil uygulama — telefon mockup grid ── */
            isMobileApp ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {allProjects.map((project, i) => (
                  <motion.div
                    key={project.id || i}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <MobileProjectCard project={project} onLightbox={setSelectedImage} />
                  </motion.div>
                ))}
              </div>
            ) : (

            /* ── Diğer hizmetler — standart grid ── */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {allProjects.map((project, i) => (
                <motion.div
                  key={project.id || i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  {/* Main image */}
                  <div
                    className="relative aspect-video overflow-hidden mb-5 border"
                    style={{ borderColor: 'var(--color-light-border)', borderRadius: '2px', background: 'var(--color-light-alt)' }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 cursor-zoom-in"
                      referrerPolicy="no-referrer"
                      onClick={() => setSelectedImage(project.image)}
                    />
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
                  </div>

                  {/* Extra images */}
                  {project.images && project.images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mb-5">
                      {project.images.map((img: string, idx: number) => (
                        <div
                          key={idx}
                          className="aspect-video overflow-hidden border cursor-zoom-in"
                          style={{ borderColor: 'var(--color-light-border)', borderRadius: '2px' }}
                          onClick={() => setSelectedImage(img)}
                        >
                          <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" alt="" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-[18px] font-bold mb-1.5" style={{ color: 'var(--color-light-text)' }}>
                        {project.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-light-secondary)' }}>
                        {project.description}
                      </p>
                    </div>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 text-[11px] font-mono uppercase tracking-[0.15em] hover:opacity-60 transition-opacity mt-1"
                        style={{ color: 'var(--color-highlight)' }}
                      >
                        Canlı Site →
                      </a>
                    )}
                  </div>

                  {project.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] uppercase tracking-[0.15em] px-2.5 py-1"
                          style={{ background: 'var(--color-light-alt)', color: 'var(--color-light-secondary)', borderRadius: '2px' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            )
          ) : (
            <div
              className="py-24 text-center border"
              style={{ borderColor: 'var(--color-light-border)', borderRadius: '2px' }}
            >
              <p className="text-[14px] mb-4" style={{ color: 'var(--color-light-secondary)' }}>
                Bu hizmet için henüz proje eklenmemiş.
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
