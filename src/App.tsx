import { DemoApp } from './DemoApp';
import { SiteNav } from './components/SiteNav';
import { HomePage } from './pages/HomePage';
import { PartnershipsPage } from './pages/PartnershipsPage';

function normalizePath(pathname: string) {
  const path = pathname.replace(/\/+$/, '');
  return path || '/';
}

function App() {
  const path = normalizePath(window.location.pathname);

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
      <SiteNav activePath={path} />
      {page}
    </>
  );
}

export default App;
