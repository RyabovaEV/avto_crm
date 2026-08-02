import { Input } from '@/components/ui';
import { DayOfWeekPicker } from '@/components/ui';
import { X } from 'lucide-react';
import {
  DepartureEntryErrors,
  DepartureEntryState,
} from '@/lib/validation/routeDeparture';
import { cn } from '@/lib/cn';
import { formatTimeInput } from '@/lib/formatTimeInput';

type Props = {
  value: DepartureEntryState;
  onChange: (patch: Partial<DepartureEntryState>) => void;
  onRemove: () => void;
  disabled?: boolean;
  error?: DepartureEntryErrors;
};

export function DepartureRow({
  value,
  onChange,
  onRemove,
  disabled,
  error,
}: Props) {
  const hasError = Boolean(error?.time || error?.dayOfWeek || error?.comment);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <div className="w-24 shrink-0">
          <Input
            placeholder="08:30"
            value={value.time}
            onChange={(e) =>
              onChange({ time: formatTimeInput(e.target.value) })
            }
            disabled={disabled}
            className={cn(error?.time && 'border-destructive')}
          />
        </div>

        <DayOfWeekPicker
          value={value.dayOfWeek}
          onChange={(days) => onChange({ dayOfWeek: days })}
          disabled={disabled}
        />

        <Input
          placeholder="Комментарий"
          value={value.comment ?? ''}
          onChange={(e) => onChange({ comment: e.target.value })}
          disabled={disabled}
        />

        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          className="shrink-0 p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          <X size={15} />
        </button>
      </div>

      {hasError && (
        <p className="text-xs text-destructive pl-1">
          {error?.time || error?.dayOfWeek || error?.comment}
        </p>
      )}
    </div>
  );
}
