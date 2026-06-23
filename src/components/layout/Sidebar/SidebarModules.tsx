import {
  Briefcase,
  CalendarDays,
  GraduationCap,
  Newspaper,
} from 'lucide-react';

export function SidebarModules() {
  return (
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
  );
}
