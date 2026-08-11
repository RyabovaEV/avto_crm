'use client';

import { ChevronDown, type LucideIcon } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/cn';
import { Button } from './Button';

type ButtonMode = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';

type AccordionAction = {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
  mode?: ButtonMode;
  align?: 'start' | 'end';
};

type AccordionProps = {
  icon: LucideIcon;
  border: string;
  iconBg: string;
  iconText: string;
  title: string;
  count?: number;
  subtitle?: string;
  defaultOpen?: boolean;
  actions?: AccordionAction[];
  children: ReactNode;
};

export function Accordion({
  icon: Icon,
  border,
  iconBg,
  iconText,
  title,
  count,
  subtitle,
  defaultOpen = false,
  actions,
  children,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggle = () => setIsOpen((prev) => !prev);

  const startActions = actions?.filter((a) => a.align === 'start') ?? [];
  const endActions = actions?.filter((a) => a.align !== 'start') ?? [];

  return (
    <section
      className={cn(
        'bg-card border rounded-2xl overflow-hidden transition-colors',
        border
      )}
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-3 px-6 py-4 text-left cursor-pointer hover:bg-muted/40 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
              iconBg,
              iconText
            )}
          >
            <Icon size={16} />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-foreground">{title}</span>
              {count !== undefined && (
                <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs font-mono">
                  {count}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <ChevronDown
          size={18}
          className={cn(
            'shrink-0 text-muted-foreground transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="px-6 pt-4 pb-6 space-y-3 border-t border-border">
            {(startActions.length > 0 || endActions.length > 0) && (
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  {startActions.map((action) => (
                    <Button
                      key={action.label}
                      mode={action.mode ?? 'outline'}
                      icon={action.icon}
                      onClick={action.onClick}
                      disabled={action.disabled}
                      className={cn(
                        action.mode === 'ghost'
                          ? 'text-primary hover:text-primary hover:bg-transparent hover:underline'
                          : 'px-4 py-1.5 text-xs'
                      )}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {endActions.map((action) => (
                    <Button
                      key={action.label}
                      mode={action.mode ?? 'outline'}
                      icon={action.icon}
                      onClick={action.onClick}
                      disabled={action.disabled}
                      className={cn(
                        action.mode === 'ghost'
                          ? 'text-primary hover:text-primary hover:bg-transparent hover:underline text-xs weight-xs'
                          : 'px-4 py-1.5 text-xs'
                      )}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
