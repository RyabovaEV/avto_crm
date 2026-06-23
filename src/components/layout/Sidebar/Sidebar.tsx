import { SidebarHeader } from './SidebarHeader';
import { SidebarModules } from './SidebarModules';
import { SidebarNav } from './SidebarNav';
import { SidebarUser } from './SidebarUser';

export function Sidebar() {
  return (
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
        <SidebarHeader />
        <SidebarNav />
        <SidebarModules />
        <SidebarUser />
      </div>
    </aside>
  );
}
