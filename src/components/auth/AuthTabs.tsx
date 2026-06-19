'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

const tabs = [
  { label: 'Вход', href: '/login' },
  { label: 'Регистрация', href: '/register' },
]

export function AuthTabs() {
  const pathname = usePathname()

  return (
    <div className="flex rounded-xl bg-secondary p-1 mb-8">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={cn(
            'flex-1 text-center py-2 text-sm font-medium rounded-lg transition-all capitalize',
            pathname === tab.href
              ? 'bg-white text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  )
}