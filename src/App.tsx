import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DemoApp } from './DemoApp';
import { SiteNav } from './components/SiteNav';
import { HomePage } from './pages/HomePage';
import { PartnershipsPage } from './pages/PartnershipsPage';

function normalizePath(pathname: string) {
  const path = pathname.replace(/\/+$/, '');
  return path || '/';
}

function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    function handlePopState() {
      setPath(normalizePath(window.location.pathname));
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  function navigateTo(nextPath: string) {
    const normalized = normalizePath(nextPath);
    if (normalized === path) return;

    history.pushState(null, '', normalized);
    setPath(normalized);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  let page: React.ReactNode;
  if (path === '/partnerships') {
    page = <PartnershipsPage />;
  } else if (path === '/demo') {
    page = <DemoApp />;
  } else {
    page = <HomePage />;
  }

  return (
    <>
      <SiteNav activePath={path} onNavigate={navigateTo} />
      <AnimatePresence mode="wait">
        <motion.div
          key={path}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          {page}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
