import { LogoMark } from './LogoMark';

interface SiteNavProps {
  activePath: string;
  onNavigate: (path: string) => void;
}

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/partnerships', label: 'Partnerships' },
  { href: '/demo', label: 'Demo' },
];

export function SiteNav({ activePath, onNavigate }: SiteNavProps) {
  function handleNavigate(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    onNavigate(href);
  }

  return (
    <header className="sticky top-0 z-[60] border-b border-gray-100 bg-white/92 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" onClick={event => handleNavigate(event, '/')} className="flex items-center gap-2.5">
          <LogoMark className="h-8 w-8" />
          <span className="text-sm font-bold text-gray-900">CodeCounsel</span>
        </a>

        <nav className="flex items-center gap-1 rounded-xl border border-gray-100 bg-gray-50 p-1">
          {navItems.map(item => {
            const isActive = activePath === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={event => handleNavigate(event, item.href)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                  isActive
                    ? 'bg-[#3157F6] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-white hover:text-gray-900'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden w-[104px] sm:block" aria-hidden="true" />
      </div>
    </header>
  );
}
