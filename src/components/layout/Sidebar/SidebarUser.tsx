import { LogOut } from 'lucide-react';

export function SidebarUser() {
  return (
    <div className="p-5">
      <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 mb-2">
        <div className="w-8 h-8 rounded-full bg-blue-500/80 flex items-center justify-center text-xs font-bold text-white ring-2 ring-blue-400/30 flex-shrink-0">
          AA
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-sm font-semibold leading-tight truncate">
            Name
          </div>
          <div className="text-blue-300/70 text-xs leading-tight truncate mt-0.5">
            Admin
          </div>
        </div>
      </div>
      <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-sidebar-foreground/60 hover:bg-white/8 hover:text-white transition-all duration-150 border border-transparent hover:border-white/10">
        <LogOut size={12} /> Sign out
      </button>
      <div className="text-center text-xs font-mono text-blue-400/30 mt-3">
        © {new Date().getFullYear()} TransitAdmin
      </div>
    </div>
  );
}
