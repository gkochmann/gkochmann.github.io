import { Bell, Search, RefreshCw } from 'lucide-react';

export function Topbar() {
  return (
    <div className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-5 shrink-0">
      {/* Search */}
      <div className="flex items-center gap-2 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search contracts, features, sources..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3157F6]/20 focus:border-[#3157F6]/40"
          />
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Scan status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-xl">
          <RefreshCw className="h-3 w-3 text-green-600" />
          <span className="text-xs font-medium text-green-700">Last scan: 12 min ago</span>
        </div>

        {/* Release info */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F6FF] border border-[#3157F6]/10 rounded-xl">
          <span className="text-xs font-medium text-[#3157F6]">iOS 8.14.0 / Android 8.14.2</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <Bell className="h-4 w-4 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center cursor-pointer">
          <span className="text-white text-xs font-bold">VC</span>
        </div>
      </div>
    </div>
  );
}
