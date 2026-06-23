import { Logo } from '@/components/ui';

export function SidebarHeader() {
  return (
    <div className="flex flex-col gap-5 border-b border-sidebar-border p-5">
      <div className="flex gap-4">
        <Logo small={true} />
      </div>
      <div className="h-0.5 w-25 bg-linear-to-r from-blue-400 to-cyan-400 rounded-full" />
    </div>
  );
}
