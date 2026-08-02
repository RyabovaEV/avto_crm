import { cn } from '@/lib/cn';
import { DayOfWeekValue } from '@/lib/validation/dayOfWeek';

type DayOfWeekPickerProps = {
  value: DayOfWeekValue[];
  onChange: (days: DayOfWeekValue[]) => void;
  disabled?: boolean;
  className?: string;
};

const ALL_DAYS: DayOfWeekValue[] = [
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN',
];

const dayShort: Record<DayOfWeekValue, string> = {
  MON: 'П',
  TUE: 'В',
  WED: 'С',
  THU: 'Ч',
  FRI: 'П',
  SAT: 'С',
  SUN: 'В',
};

const dayFull: Record<DayOfWeekValue, string> = {
  MON: 'Понедельник',
  TUE: 'Вторник',
  WED: 'Среда',
  THU: 'Четверг',
  FRI: 'Пятница',
  SAT: 'Суббота',
  SUN: 'Воскресенье',
};

export function DayOfWeekPicker({
  value,
  onChange,
  disabled,
  className,
}: DayOfWeekPickerProps) {
  function toggleDay(day: DayOfWeekValue) {
    if (disabled) return;
    onChange(
      value.includes(day) ? value.filter((d) => d !== day) : [...value, day]
    );
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {ALL_DAYS.map((day) => {
        const isActive = value.includes(day);
        return (
          <button
            key={day}
            type="button"
            title={dayFull[day]}
            aria-label={dayFull[day]}
            aria-pressed={isActive}
            onClick={() => toggleDay(day)}
            disabled={disabled}
            className={cn(
              'w-7 h-7 rounded-md text-xs font-semibold transition-colors shrink-0',
              'disabled:opacity-50 disabled:pointer-events-none',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted'
            )}
          >
            {dayShort[day]}
          </button>
        );
      })}
    </div>
  );
}
