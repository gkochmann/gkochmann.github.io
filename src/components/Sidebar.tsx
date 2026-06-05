import { motion } from 'framer-motion';
import {
  LayoutDashboard, GitCompare, FileText, Database,
  Clock, Settings, ChevronRight
} from 'lucide-react';

type NavSection = 'overview' | 'live-reviews' | 'contracts' | 'sources' | 'audit' | 'settings';

interface SidebarProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
}

const navItems = [
  { id: 'overview' as NavSection, label: 'Overview', icon: LayoutDashboard },
  { id: 'live-reviews' as NavSection, label: 'Live Reviews', icon: GitCompare, badge: '7' },
  { id: 'contracts' as NavSection, label: 'System Contracts', icon: FileText },
  { id: 'sources' as NavSection, label: 'Source Explorer', icon: Database },
  { id: 'audit' as NavSection, label: 'Audit Trail', icon: Clock },
  { id: 'settings' as NavSection, label: 'Settings', icon: Settings },
];

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  return (
    <div className="w-56 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#3157F6] to-[#6654F1] flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-xs">CC</span>
          </div>
          <div>
            <div className="font-bold text-sm text-gray-900 leading-none">CodeCounsel</div>
            <div className="text-[10px] text-gray-400 mt-0.5 font-medium">Live System Contracts</div>
          </div>
        </div>
      </div>

      {/* Workspace */}
      <div className="px-3 py-3 border-b border-gray-100">
        <button className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-[9px]">F</span>
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-gray-800 leading-none">Friendli</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Production</div>
            </div>
          </div>
          <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-gray-600" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-0.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group
                  ${isActive
                    ? 'bg-[#3157F6] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full
                    ${isActive ? 'bg-white/20 text-white' : 'bg-red-100 text-red-600'}`}>
                    {item.badge}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">VC</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-gray-800 truncate">Demo User</div>
            <div className="text-[10px] text-gray-400">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}
