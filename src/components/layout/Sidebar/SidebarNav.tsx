'use client';
import Link from 'next/link';
import { NAV_ITEM } from '@/config/navigation';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export function SidebarNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col">
      {NAV_ITEM.map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              'w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-150 mb-1 group border',
              isActive
                ? 'bg-blue-400/20 border-blue-400/30 text-white'
                : 'border-transparent text-sidebar-foreground hover:bg-white/5 hover:text-white'
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
