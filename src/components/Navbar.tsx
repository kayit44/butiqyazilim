import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { Logo } from './Logo';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') { setActiveSection(''); return; }
    const ids = ['hizmetler', 'surec'];
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [location.pathname]);

  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  useEffect(() => {
    if (!pendingScroll || location.pathname !== '/') return;
    const tryScroll = () => {
      const element = document.querySelector(pendingScroll);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setPendingScroll(null);
      }
    };
    tryScroll();
    const t = setTimeout(tryScroll, 400);
    return () => clearTimeout(t);
  }, [location.pathname, pendingScroll]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (location.pathname !== '/') {
        setPendingScroll(href);
        navigate('/');
      } else {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled && !isMobileMenuOpen;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: transparent ? 'transparent' : 'var(--color-background)',
        borderBottom: transparent ? '1px solid transparent' : '1px solid var(--color-border)',
        backdropFilter: transparent ? 'none' : 'blur(12px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">

        {/* Logo */}
        <div className="animate-fade-in shrink-0">
          <Logo size="sm" />
        </div>

        {/* Nav links - center */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => {
            const isAnchor = link.href.startsWith('#');
            const isActive = isAnchor
              ? activeSection === link.href.slice(1)
              : location.pathname === link.href;
            return (
              <div
                key={link.label}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {isAnchor ? (
                  <a
                    href={link.href}
                    onClick={(e: any) => handleNavClick(e, link.href)}
                    className={`text-[13px] transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-secondary hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className={`text-[13px] transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-secondary hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Right side: phone + CTA */}
        <div className="hidden md:flex items-center gap-5 animate-fade-in" style={{ animationDelay: '240ms' }}>
          <a
            href="https://wa.me/905367736242"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[12px] text-secondary hover:text-primary transition-colors duration-200"
          >
            <Phone size={12} strokeWidth={1.5} />
            <span className="font-mono tracking-wide">+90 (536) 773 62 42</span>
          </a>
          <div className="w-px h-4 bg-border" />
          <Link
            to="/iletisim"
            className="h-8 px-5 text-[12px] font-medium bg-highlight inline-flex items-center hover:opacity-90 transition-opacity duration-200"
            style={{ color: '#0F0F0E', borderRadius: '2px' }}
          >
            Proje Başlat
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1 text-secondary hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(v => !v)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={`md:hidden bg-background border-t border-border overflow-hidden transition-all duration-200 ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col px-6 py-4">
          {NAV_LINKS.map((link) => {
            const isAnchor = link.href.startsWith('#');
            return isAnchor ? (
              <a
                key={link.label}
                href={link.href}
                onClick={(e: any) => {
                  setIsMobileMenuOpen(false);
                  handleNavClick(e, link.href);
                }}
                className="py-3.5 text-[14px] text-secondary hover:text-primary transition-colors border-b border-border/60 last:border-0"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3.5 text-[14px] text-secondary hover:text-primary transition-colors border-b border-border/60 last:border-0"
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-5 flex flex-col gap-3">
            <a
              href="https://wa.me/905367736242"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-10 border border-border text-secondary text-[13px]"
              style={{ borderRadius: '2px' }}
            >
              <Phone size={13} />
              +90 (536) 773 62 42
            </a>
            <Link
              to="/iletisim"
              onClick={() => setIsMobileMenuOpen(false)}
              className="h-10 flex items-center justify-center bg-highlight text-[13px] font-medium"
              style={{ color: 'var(--color-on-highlight)', borderRadius: '2px' }}
            >
              Proje Başlat
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
