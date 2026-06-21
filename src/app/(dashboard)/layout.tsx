import { Logo } from '@/components/ui';
import {
  Briefcase,
  CalendarDays,
  GraduationCap,
  LogOut,
  Newspaper,
} from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function LayoutDashboard({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="h-screen flex overflow-hidden">
      <aside className="w-72 bg-sidebar flex flex-col relative overflow-hidden">
        {/* rounded bg */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute border border-white rounded-full"
              style={{
                width: `${(i + 1) * 130}px`,
                height: `${(i + 1) * 130}px`,
                bottom: '-10%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
          ))}
        </div>

        <div className="h-screen z-10 flex flex-col py-5 ">
          <div className="flex flex-col gap-5 border-b border-sidebar-border p-5">
            <div className="flex gap-4">
              <Logo small={true} />
            </div>
            <div className="h-0.5 w-25 bg-linear-to-r from-blue-400 to-cyan-400 rounded-full" />
          </div>
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
          <div className="grow border-b border-sidebar-border p-5">
            <div className="text-xs font-mono text-sidebar-foreground/40 uppercase tracking-widest px-2 mb-3">
              Доступные модули
            </div>
            <div className="flex flex-col gap-2 px-2">
              {[
                {
                  label: 'Новости',
                  icon: <Newspaper size={11} />,
                },
                { label: 'Расписание', icon: <CalendarDays size={11} /> },
                { label: 'Автошкола', icon: <GraduationCap size={11} /> },
                { label: 'Вакансии', icon: <Briefcase size={11} /> },
              ].map((m) => (
                <div
                  key={m.label}
                  className="flex items-center gap-2 text-blue-200/60 text-xs"
                >
                  <span className="text-cyan-400/70">{m.icon}</span>
                  {m.label}
                </div>
              ))}
            </div>
          </div>
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
        </div>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
    </div>
  );
}
