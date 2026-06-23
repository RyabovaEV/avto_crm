import {
  Briefcase,
  CalendarDays,
  GraduationCap,
  Newspaper,
} from 'lucide-react';

export function SidebarModules() {
  return (
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
  );
}
