import Link from 'next/link';

export function SidebarNav() {
  return (
    <div className="border-b border-sidebar-border p-5">
      <nav className="flex flex-col">
        <div className="text-xs font-mono text-sidebar-foreground/40 uppercase tracking-widest px-2 mb-3">
          Навигация
        </div>
        <Link
          href="/news"
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-150 mb-1 group bg-blue-400/20 border border-blue-400/30 text-white "
        >
          Новости
        </Link>
        <Link
          href="/schedule"
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-150 mb-1 group text-sidebar-foreground hover:bg-white/5 hover:text-white"
        >
          Расписание
        </Link>
        <Link
          href="/driving-school"
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-150 mb-1 group text-sidebar-foreground hover:bg-white/5 hover:text-white"
        >
          Автошкола
        </Link>
        <Link
          href="/vacancies"
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-150 mb-1 group text-sidebar-foreground hover:bg-white/5 hover:text-white"
        >
          Вакансии
        </Link>
      </nav>
    </div>
  );
}
