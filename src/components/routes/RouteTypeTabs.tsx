'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';
import { RouteType } from '@/generated/prisma/client';

type Props = {
  active: RouteType;
};

const tabs: { type: RouteType; label: string }[] = [
  { type: 'SUBURBAN', label: 'Пригородные' },
  { type: 'CITY', label: 'Городские' },
];

export function RouteTypeTabs({ active }: Props) {
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-muted w-fit">
      {tabs.map((tab) => (
        <Link
          key={tab.type}
          href={`/schedule?type=${tab.type}`}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            active === tab.type
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
