import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Send, Clock, CheckCircle2, Phone } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const contactItems = [
  { icon: Mail, label: 'E-Posta', value: 'iletisim@butiqstudio.com', href: 'mailto:iletisim@butiqstudio.com' },
  { icon: WhatsAppIcon, label: 'WhatsApp', value: '+90 (536) 773 62 42', href: 'https://wa.me/905367736242' },
  { icon: MapPin, label: 'Ofis', value: 'Bahçelievler, İstanbul', href: null },
  { icon: Clock, label: 'Çalışma Saatleri', value: 'Pzt – Cum, 09:00 – 18:00', href: null },
];

const services = [
  'Web Tasarım & Geliştirme',
  'SaaS Uygulama Geliştirme',
  'E-Ticaret Çözümleri',
  'Mobil Uygulama',
  'Diğer',
];

function Field({ label, name, type, placeholder }: { label: string; name: string; type: string; placeholder: string }) {
  return (
    <div>
      <label
        className="block font-mono text-[10px] uppercase tracking-[0.2em] mb-2.5"
        style={{ color: 'var(--color-light-secondary)' }}
      >
        {label}
      </label>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full border px-4 py-3.5 text-[14px] outline-none transition-colors"
        style={{
          background: 'white',
          borderColor: 'var(--color-light-border)',
          color: 'var(--color-light-text)',
          borderRadius: '2px',
        }}
        onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-highlight)')}
        onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-light-border)')}
      />
    </div>
  );
}

export default function ContactPage() {
  useEffect(() => { document.title = 'İletişim — Butiq Studio'; }, []);

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) return;
    setFormState('submitting');
    const data = new FormData(e.currentTarget);
    try {
      await addDoc(collection(db, 'contacts'), {
        name: data.get('name'),
        email: data.get('email'),
        service: data.get('service'),
        message: data.get('message'),
        createdAt: serverTimestamp(),
      });
      setFormState('success');
    } catch {
      setFormState('error');
    }
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Page header - dark */}
      <div className="bg-background border-b border-border pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="section-label mb-6"
          >
            İletişim
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold text-primary leading-[1.0]"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                letterSpacing: '-0.04em',
              }}
            >
              Bir projeniz mi var?
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold leading-[1.0]"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                letterSpacing: '-0.04em',
                color: 'var(--color-highlight)',
              }}
            >
              Konuşalım.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Content - light */}
      <div style={{ backgroundColor: 'var(--color-light)' }}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 xl:gap-24">

            {/* Left — contact info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p
                className="text-base leading-relaxed max-w-sm mb-12"
                style={{ color: 'var(--color-light-secondary)' }}
              >
                Fikirlerinizi gerçeğe dönüştürmek için sabırsızlanıyoruz. Formu doldurun, en geç 24 saat içinde dönüş yapalım.
              </p>

              <ul className="border-t" style={{ borderColor: 'var(--color-light-border)' }}>
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <li
                    key={label}
                    className="flex items-center gap-5 py-5 border-b group"
                    style={{ borderColor: 'var(--color-light-border)' }}
                  >
                    <div
                      className="w-10 h-10 border flex items-center justify-center shrink-0"
                      style={{ borderColor: 'var(--color-light-border)', borderRadius: '2px', color: 'var(--color-light-secondary)' }}
                    >
                      <Icon size={16} />
                    </div>
                    <div>
                      <p
                        className="font-mono text-[9px] uppercase tracking-[0.2em] mb-0.5"
                        style={{ color: 'var(--color-light-secondary)' }}
                      >
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('https') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="text-[14px] font-medium hover:opacity-60 transition-opacity"
                          style={{ color: 'var(--color-light-text)' }}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-[14px] font-medium" style={{ color: 'var(--color-light-text)' }}>
                          {value}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Quick action */}
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="https://wa.me/905367736242"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-6 inline-flex items-center gap-2.5 text-[13px] font-semibold bg-[#25D366] text-white hover:opacity-90 transition-opacity"
                  style={{ borderRadius: '2px' }}
                >
                  <WhatsAppIcon size={15} />
                  WhatsApp ile Hızlı İletişim
                </a>
                <a
                  href="tel:+905367736242"
                  className="h-11 px-6 border inline-flex items-center gap-2.5 text-[13px] font-medium hover:opacity-60 transition-opacity"
                  style={{ borderColor: 'var(--color-light-border)', color: 'var(--color-light-text)', borderRadius: '2px' }}
                >
                  <Phone size={13} strokeWidth={1.5} />
                  +90 (536) 773 62 42
                </a>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="min-h-[480px] flex flex-col items-center justify-center text-center border p-12"
                    style={{ borderColor: 'var(--color-light-border)', borderRadius: '2px', background: 'white' }}
                  >
                    <div
                      className="w-14 h-14 border flex items-center justify-center mb-6"
                      style={{ borderColor: 'var(--color-highlight)', borderRadius: '2px' }}
                    >
                      <CheckCircle2 size={24} style={{ color: 'var(--color-highlight)' }} />
                    </div>
                    <h3
                      className="text-2xl font-bold mb-3"
                      style={{ color: 'var(--color-light-text)' }}
                    >
                      Mesajınız Alındı
                    </h3>
                    <p
                      className="text-[14px] leading-relaxed max-w-xs mb-8"
                      style={{ color: 'var(--color-light-secondary)' }}
                    >
                      Ekibimiz talebinizi inceleyip en kısa sürede sizinle iletişime geçecek.
                    </p>
                    <button
                      onClick={() => { setFormState('idle'); setAgreed(false); }}
                      className="h-10 px-6 text-[13px] font-medium border hover:opacity-60 transition-opacity"
                      style={{ borderColor: 'var(--color-light-border)', color: 'var(--color-light-text)', borderRadius: '2px' }}
                    >
                      Yeni Mesaj Gönder
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="border p-8 md:p-10 space-y-6"
                    style={{ borderColor: 'var(--color-light-border)', background: 'white', borderRadius: '2px' }}
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Ad Soyad" name="name" type="text" placeholder="Ahmet Yılmaz" />
                      <Field label="E-posta" name="email" type="email" placeholder="ahmet@firma.com" />
                    </div>

                    <div>
                      <label
                        className="block font-mono text-[10px] uppercase tracking-[0.2em] mb-2.5"
                        style={{ color: 'var(--color-light-secondary)' }}
                      >
                        Hizmet
                      </label>
                      <select
                        name="service"
                        className="w-full border px-4 py-3.5 text-[14px] outline-none transition-colors appearance-none cursor-pointer"
                        style={{
                          background: 'white',
                          borderColor: 'var(--color-light-border)',
                          color: 'var(--color-light-text)',
                          borderRadius: '2px',
                        }}
                      >
                        {services.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label
                        className="block font-mono text-[10px] uppercase tracking-[0.2em] mb-2.5"
                        style={{ color: 'var(--color-light-secondary)' }}
                      >
                        Mesaj
                      </label>
                      <textarea
                        required
                        name="message"
                        rows={5}
                        placeholder="Projenizden kısaca bahsedin..."
                        className="w-full border px-4 py-3.5 text-[14px] outline-none transition-colors resize-none"
                        style={{
                          background: 'white',
                          borderColor: 'var(--color-light-border)',
                          color: 'var(--color-light-text)',
                          borderRadius: '2px',
                        }}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-highlight)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-light-border)')}
                      />
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <button
                        type="button"
                        onClick={() => setAgreed(v => !v)}
                        className="mt-0.5 w-5 h-5 border flex items-center justify-center shrink-0 transition-colors"
                        style={{
                          borderColor: agreed ? 'var(--color-highlight)' : 'var(--color-light-border)',
                          background: agreed ? 'var(--color-highlight)' : 'white',
                          borderRadius: '2px',
                        }}
                      >
                        {agreed && (
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                      <span className="text-[12px] leading-relaxed" style={{ color: 'var(--color-light-secondary)' }}>
                        Gizlilik politikasını okudum ve verilerimin işlenmesini kabul ediyorum.
                      </span>
                    </label>

                    {formState === 'error' && (
                      <p className="text-[13px] text-center py-2 px-4 border" style={{ color: '#c0392b', borderColor: '#f5c6cb', background: '#fff5f5', borderRadius: '2px' }}>
                        Bir hata oluştu. Lütfen tekrar deneyin veya WhatsApp'tan ulaşın.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={formState === 'submitting' || !agreed}
                      onClick={() => { if (formState === 'error') setFormState('idle'); }}
                      className="w-full h-12 text-[14px] font-bold flex items-center justify-center gap-2.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                      style={{ background: 'var(--color-highlight)', color: 'var(--color-on-highlight)', borderRadius: '2px' }}
                    >
                      {formState === 'submitting' ? (
                        <span className="opacity-70">Gönderiliyor…</span>
                      ) : (
                        <>
                          Talep Gönder
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
