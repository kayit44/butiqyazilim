import { Linkedin, Instagram, Github, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { Logo } from './Logo';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>

      {/* ── Big CTA banner ── */}
      <div style={{ borderBottom: '1px solid var(--color-border)', padding: '5rem 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="flex-1">
              <p
                className="mb-6"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.24em', color: 'var(--color-secondary)' }}
              >
                — Birlikte Çalışalım
              </p>
              <h2
                className="font-bold text-primary leading-[0.96]"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.6rem, 6vw, 5.5rem)',
                  letterSpacing: '-0.05em',
                }}
              >
                Projenizi<br />
                <span style={{ color: 'var(--color-highlight)' }}>hayata geçirelim.</span>
              </h2>
            </div>

            <div className="flex flex-col gap-3 shrink-0 md:pb-2">
              <Link
                to="/iletisim"
                className="h-12 px-8 text-[14px] font-semibold inline-flex items-center justify-center transition-opacity duration-200 hover:opacity-85"
                style={{ background: 'var(--color-highlight)', color: 'var(--color-on-highlight)', borderRadius: '2px' }}
              >
                Ücretsiz Görüşme Talep Et
              </Link>
              <a
                href="https://wa.me/905367736242"
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-8 text-[14px] font-medium inline-flex items-center justify-center gap-2 transition-colors duration-200 hover:text-primary"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-secondary)', borderRadius: '2px' }}
              >
                <Phone size={14} strokeWidth={1.5} />
                +90 (536) 773 62 42
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo size="sm" />
            </div>
            <p className="text-[13px] leading-relaxed mb-6 max-w-[220px]" style={{ color: 'var(--color-secondary)' }}>
              Markanızın dijital dünyada öne çıkması için özel yazılım ve tasarım çözümleri.
            </p>
            <div className="flex items-center gap-1.5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#4ade80' }} />
              <span className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: '#4ade80', letterSpacing: '0.06em' }}>
                Yeni Projeler İçin Açık
              </span>
            </div>
            <div className="flex gap-2.5">
              {[Twitter, Linkedin, Instagram, Github].map((Icon, i) => (
                <div
                  key={i}
                  className="w-8 h-8 flex items-center justify-center"
                  style={{ border: '1px solid var(--color-border)', color: 'var(--color-secondary)', borderRadius: '2px', opacity: 0.4 }}
                >
                  <Icon size={13} />
                </div>
              ))}
            </div>
          </div>

          {/* Sayfalar */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(138,136,128,0.4)', marginBottom: '1.5rem' }}>
              Sayfalar
            </h4>
            <ul className="space-y-3.5">
              {NAV_LINKS.map(link => {
                const isAnchor = link.href.startsWith('#');
                return (
                  <li key={link.label}>
                    {isAnchor ? (
                      <a
                        href={link.href}
                        onClick={(e: any) => handleNavClick(e, link.href)}
                        className="text-[13px] transition-colors duration-200 hover:text-primary"
                        style={{ color: 'var(--color-secondary)' }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-[13px] transition-colors duration-200 hover:text-primary"
                        style={{ color: 'var(--color-secondary)' }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Hizmetler */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(138,136,128,0.4)', marginBottom: '1.5rem' }}>
              Hizmetler
            </h4>
            <ul className="space-y-3.5">
              {[
                { label: 'E-Ticaret Sitesi', href: '/hizmet/e-commerce' },
                { label: 'Kurumsal Web', href: '/hizmet/corporate' },
                { label: 'Kişisel Site', href: '/hizmet/personal' },
                { label: 'Mobil Uygulama', href: '/hizmet/mobile-dev' },
                { label: 'Hazır Ürünler', href: '/urunler' },
              ].map(item => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-[13px] transition-colors duration-200 hover:text-primary"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(138,136,128,0.4)', marginBottom: '1.5rem' }}>
              İletişim
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:iletisim@butiqyazilim.com"
                className="flex items-start gap-2.5 text-[13px] transition-colors duration-200 hover:text-primary"
                style={{ color: 'var(--color-secondary)' }}
              >
                <Mail size={13} className="mt-0.5 shrink-0" />
                iletisim@butiqyazilim.com
              </a>
              <a
                href="https://wa.me/905367736242"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-[13px] transition-colors duration-200 hover:text-primary"
                style={{ color: 'var(--color-secondary)' }}
              >
                <Phone size={13} className="mt-0.5 shrink-0" strokeWidth={1.5} />
                +90 (536) 773 62 42
              </a>
              <p className="flex items-start gap-2.5 text-[13px]" style={{ color: 'var(--color-secondary)' }}>
                <MapPin size={13} className="mt-0.5 shrink-0" strokeWidth={1.5} />
                Bahçelievler, İstanbul
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(138,136,128,0.3)', letterSpacing: '0.08em' }}>
            © 2026 Butiq Yazılım — Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-6" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(138,136,128,0.3)' }}>
            <Link to="/gizlilik" className="hover:opacity-60 transition-opacity duration-200">
              Gizlilik Politikası
            </Link>
            <Link to="/kullanim-kosullari" className="hover:opacity-60 transition-opacity duration-200">
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
