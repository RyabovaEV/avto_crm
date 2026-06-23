import { Sidebar } from '@/components/layout/Sidebar/';
import { ReactNode } from 'react';

export default function LayoutDashboard({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
    </div>
  );
}
