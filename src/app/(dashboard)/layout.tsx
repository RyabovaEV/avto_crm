import { Logo } from '@/components/ui';
import { ReactNode } from 'react';

export default function LayoutDashboard({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="h-screen flex overflow-hidden">
      <aside className="w-72 bg-sidebar flex flex-col relative overflow-hidden">
        {/* rounded bg */}
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
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

        <div className="z-10 flex flex-col gap-5 py-10 px-5">
          <div>
            <div className="flex gap-4">
              <Logo small={true} />
            </div>
            <div className="h-0.5 w-25 bg-linear-to-r from-blue-400 to-cyan-400 rounded-full" />
          </div>
        </div>
      </aside>
      <div>{children}</div>
    </div>
  );
}
