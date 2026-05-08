import { useState, useEffect } from 'react';
import type React from 'react';
import { motion } from 'motion/react';
import { PROJECTS as STATIC_PROJECTS } from '../constants';
import { db } from '../lib/firebase';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PhoneFrame from './PhoneFrame';

interface Project {
  id?: string;
  title: string;
  description: string;
  serviceId: string;
  image: string;
  tags: string[];
  url: string;
}

function CardLink({
  project,
  className,
  style,
  children,
}: {
  project: Project;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  if (project.serviceId === 'mobile-dev') {
    return (
      <Link
        to="/hizmet/mobile-dev"
        className={className}
        style={style}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={project.url || '#'}
      target={project.url ? '_blank' : undefined}
      rel="noopener noreferrer"
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}

export default function Projects() {
  const [dbProjects, setDbProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, 'projects'),
          orderBy('createdAt', 'desc'),
          limit(8)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map(
          doc => ({ id: doc.id, ...doc.data() } as Project)
        );

        setDbProjects(data);
      } catch {
        setDbProjects([]);
      }
    };

    fetchProjects();
  }, []);

  const mergedProjects: Project[] = [...dbProjects];

  (STATIC_PROJECTS as Project[]).forEach(sp => {
    const exists = mergedProjects.some(
      p => p.title.trim().toLowerCase() === sp.title.trim().toLowerCase()
    );

    if (!exists) {
      mergedProjects.push(sp);
    }
  });

  const featuredProjects = mergedProjects.slice(0, 8);

  return (
    <section
      id="projeler"
      className="bg-background border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="section-label mb-6">
              Portfolyo
            </div>

            <h2 className="section-title-dark">
              Hayata geçirdiğimiz
              <br />
              bazı işler
            </h2>
          </div>

          <Link
            to="/projeler"
            className="group flex items-center gap-2 text-[16px] sm:text-[13px] font-medium text-secondary hover:text-primary transition-colors"
          >
            Tüm Projeleri Gör

            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </Link>
        </div>

        {featuredProjects.length > 0 ? (
          <div className="flex flex-col gap-4">

            {/* Top Row */}
            {featuredProjects.length >= 2 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">

                {/* Big Left */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="md:col-span-2"
                >
                  <CardLink
                    project={featuredProjects[0]}
                    className="group block relative overflow-hidden border border-border h-full"
                    style={{
                      borderRadius: '2px',
                      minHeight: '420px',
                    }}
                  >
                    {featuredProjects[0].serviceId === 'mobile-dev' ? (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          background:
                            'linear-gradient(135deg,#1a1a2e 0%,#0f0f1a 100%)',
                        }}
                      >
                        <div className="group-hover:scale-[1.03] transition-transform duration-700 ease-out">
                          <PhoneFrame
                            src={featuredProjects[0].image}
                            alt={featuredProjects[0].title}
                            width={180}
                            lazy={false}
                          />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={featuredProjects[0].image}
                        alt={featuredProjects[0].title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[900ms] ease-out"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <h3
                        className="font-bold text-white mb-2 leading-tight"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                          letterSpacing: '-0.03em',
                        }}
                      >
                        {featuredProjects[0].title}
                      </h3>

                      <p className="text-[16px] sm:text-[13px] text-white/50 max-w-md line-clamp-2 leading-relaxed mb-4">
                        {featuredProjects[0].description}
                      </p>

                      <div className="flex items-center gap-2 text-[15px] sm:text-[12px] font-semibold text-white/70 group-hover:text-white transition-colors duration-200">
                        İncele

                        <ArrowUpRight
                          size={13}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                        />
                      </div>
                    </div>
                  </CardLink>
                </motion.div>

                {/* Big Right */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    delay: 0.12,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <CardLink
                    project={featuredProjects[1]}
                    className="group block relative overflow-hidden border border-border h-full"
                    style={{
                      borderRadius: '2px',
                      minHeight: '420px',
                    }}
                  >
                    {featuredProjects[1].serviceId === 'mobile-dev' ? (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          background:
                            'linear-gradient(135deg,#1a1a2e 0%,#0f0f1a 100%)',
                        }}
                      >
                        <div className="group-hover:scale-[1.03] transition-transform duration-700 ease-out">
                          <PhoneFrame
                            src={featuredProjects[1].image}
                            alt={featuredProjects[1].title}
                            width={160}
                            lazy={false}
                          />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={featuredProjects[1].image}
                        alt={featuredProjects[1].title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[900ms] ease-out"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h3
                        className="font-bold text-white mb-2 leading-tight"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {featuredProjects[1].title}
                      </h3>

                      <p className="text-[15px] sm:text-[12px] text-white/45 line-clamp-2 leading-relaxed mb-3">
                        {featuredProjects[1].description}
                      </p>

                      <div className="flex items-center gap-2 text-[15px] sm:text-[11px] font-semibold text-white/60 group-hover:text-white transition-colors duration-200">
                        İncele <ArrowUpRight size={12} />
                      </div>
                    </div>
                  </CardLink>
                </motion.div>
              </div>
            )}

            {/* Grid */}
            {featuredProjects.slice(2).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
                {featuredProjects.slice(2).map((project, i) => (
                  <motion.div
                    key={project.id || i + 2}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="h-full"
                  >
                    <CardLink
                      project={project}
                      className="group flex flex-col border border-border overflow-hidden h-full"
                      style={{ borderRadius: '2px' }}
                    >
                      <div
                        className="relative overflow-hidden bg-surface"
                        style={{ height: '220px' }}
                      >
                        {project.serviceId === 'mobile-dev' ? (
                          <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                              background:
                                'linear-gradient(135deg,#1a1a2e 0%,#0f0f1a 100%)',
                            }}
                          >
                            <div className="group-hover:scale-[1.04] transition-transform duration-700 ease-out">
                              <PhoneFrame
                                src={project.image}
                                alt={project.title}
                                width={88}
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                              referrerPolicy="no-referrer"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                          </>
                        )}
                      </div>

                      <div className="p-5 flex items-start justify-between gap-3 flex-1">
                        <div>
                          <h3 className="text-[16px] sm:text-[13px] font-semibold text-primary mb-1">
                            {project.title}
                          </h3>

                          <p className="text-[15px] sm:text-[11px] text-secondary line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        <div
                          className="w-7 h-7 border border-border flex items-center justify-center shrink-0 group-hover:bg-highlight group-hover:border-highlight transition-colors duration-200"
                          style={{ borderRadius: '2px' }}
                        >
                          <ArrowUpRight
                            size={12}
                            className="text-secondary group-hover:text-white transition-colors duration-200"
                          />
                        </div>
                      </div>
                    </CardLink>
                  </motion.div>
                ))}
              </div>
            )}

          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-border py-20 text-center"
            style={{ borderRadius: '2px' }}
          >
            <p className="text-[17px] sm:text-[13px] text-secondary mb-4">
              Henüz proje eklenmemiş.
            </p>

            <Link
              to="/iletisim"
              className="text-[16px] sm:text-[12px] text-highlight hover:underline"
            >
              İlk projenizi başlatmak için iletişime geçin →
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}