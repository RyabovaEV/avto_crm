import { Plus } from 'lucide-react';
import { Button } from '@/components/ui';
import { DepartureRow } from './DepartureRow';
import {
  DepartureEntryErrors,
  DepartureEntryInput,
} from '@/lib/validation/routeDeparture';

type Props = {
  title: string;
  entries: Required<DepartureEntryInput>[];
  errors?: DepartureEntryErrors[];
  disabled?: boolean;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, patch: Partial<DepartureEntryInput>) => void;
};

export function DepartureListEditor({
  title,
  entries,
  errors,
  disabled,
  onAdd,
  onRemove,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <Button mode="ghost" icon={Plus} onClick={onAdd} disabled={disabled}>
          Добавить рейс
        </Button>
      </div>

      {entries.length === 0 && (
        <p className="text-sm text-muted-foreground">Рейсы не добавлены</p>
      )}

      <div className="flex flex-col gap-2">
        {entries.map((entry, index) => (
          <DepartureRow
            key={index}
            value={entry}
            onChange={(patch) => onChange(index, patch)}
            onRemove={() => onRemove(index)}
            disabled={disabled}
            error={errors?.[index]}
          />
        ))}
      </div>
    </div>
  );
}
