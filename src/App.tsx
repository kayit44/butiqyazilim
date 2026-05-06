import { Suspense, lazy, Component, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const AdminPanel  = lazy(() => import('./pages/AdminPanel'));
const Privacy     = lazy(() => import('./pages/Privacy'));
const Terms       = lazy(() => import('./pages/Terms'));
const NotFound    = lazy(() => import('./pages/NotFound'));
const ProjectsPage  = lazy(() => import('./pages/ProjectsPage'));
const ProductsPage  = lazy(() => import('./pages/ProductsPage'));
const ContactPage   = lazy(() => import('./pages/ContactPage'));

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ color: '#fff', padding: '2rem', fontFamily: 'monospace' }}>
          <h2>Bir hata oluştu</h2>
          <pre style={{ fontSize: '12px', opacity: 0.6 }}>{(this.state.error as Error).message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] origin-left"
      style={{
        scaleX,
        height: '2px',
        background: 'var(--color-highlight)',
        transformOrigin: '0%',
      }}
    />
  );
}

function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function AppShell() {
  const location = useLocation();
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <ScrollProgressBar />
      <Navbar />
      <main>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <PageTransition>
            <Routes location={location}>
              <Route path="/"                     element={<Home />} />
              <Route path="/hizmet/:serviceId"    element={<ProjectDetail />} />
              <Route path="/admin"                element={<AdminPanel />} />
              <Route path="/gizlilik"             element={<Privacy />} />
              <Route path="/kullanim-kosullari"   element={<Terms />} />
              <Route path="/projeler"             element={<ProjectsPage />} />
              <Route path="/urunler"              element={<ProductsPage />} />
              <Route path="/iletisim"             element={<ContactPage />} />
              <Route path="*"                     element={<NotFound />} />
            </Routes>
          </PageTransition>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <AppShell />
      </Router>
    </ErrorBoundary>
  );
}
