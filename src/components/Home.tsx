import { lazy, Suspense, useEffect } from 'react';
import Hero from './Hero';
import ParallaxImage from './ParallaxImage';

const Services       = lazy(() => import('./Services'));
const Process        = lazy(() => import('./Process'));
const ProductsTeaser = lazy(() => import('./ProductsTeaser'));
const Projects       = lazy(() => import('./Projects'));
const Faq            = lazy(() => import('./Faq'));

function Placeholder({ light = false }: { light?: boolean }) {
  return (
    <div
      className="py-24 border-t"
      style={{
        backgroundColor: light ? 'var(--color-light)' : 'var(--color-background)',
        borderColor:     light ? 'var(--color-light-border)' : 'var(--color-border)',
      }}
    />
  );
}

export default function Home() {
  useEffect(() => {
    document.title = 'Butiq Studio — Web Tasarım & Yazılım Geliştirme';
  }, []);

  return (
    <>
      {/* 1 — Tam ekran slider */}
      <Hero />


      {/* 2 — Hizmetler (krem) */}
      <div id="hizmetler-wrapper">
        <Suspense fallback={<Placeholder light />}>
          <Services />
        </Suspense>
      </div>

      {/* 3 — Parallax görseli #1 */}
      <ParallaxImage
        image="/sanat.png"
        label="Tasarım Felsefemiz"
        title="Estetik ile işlevsellik arasındaki hassas denge"
        subtitle="Her piksel bir amaca hizmet eder. Her satır kod bir değer taşır."
        ctaHref="#surec"
        height="65vh"
      />

      {/* 4 — Süreç (koyu) */}
      <Suspense fallback={<Placeholder />}>
        <Process />
      </Suspense>

      {/* 5 — Projeler (koyu) */}
      <Suspense fallback={<Placeholder />}>
        <Projects />
      </Suspense>

      {/* 6 — Parallax görseli #2 */}
      <ParallaxImage
        image="/saas2.jpg"
        label="Hazır Çözümler"
        title="Tak-çalıştır SaaS yazılımlarımızı keşfedin"
        ctaHref="/urunler"
        height="55vh"
      />

      {/* 7 — Hazır ürünler (krem) */}
      <Suspense fallback={<Placeholder light />}>
        <ProductsTeaser />
      </Suspense>

      {/* 8 — SSS (krem) */}
      <Suspense fallback={<Placeholder light />}>
        <Faq />
      </Suspense>
    </>
  );
}
