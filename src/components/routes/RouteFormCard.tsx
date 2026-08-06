import { Input, Button, Checkbox } from '@/components/ui';
import { X, Check } from 'lucide-react';
import { DepartureListEditor } from './DepartureListEditor';
import { DepartureEntryInput } from '@/lib/validation/routeDeparture';
import { RouteFormErrors } from '@/lib/validation/route';
import type { FormState } from '@/hooks/useRoutesSchedule';

type Direction = 'departuresFromStart' | 'departuresFromEnd';

type Props = {
  title: string;
  form: FormState;
  fieldErrors: RouteFormErrors;
  submitError: string | null;
  isSaving: boolean;
  onFieldChange: <K extends 'number' | 'name'>(
    key: K,
    value: FormState[K]
  ) => void;
  onToggleCircular: (value: boolean) => void;
  onAddDeparture: (direction: Direction) => void;
  onRemoveDeparture: (direction: Direction, index: number) => void;
  onChangeDeparture: (
    direction: Direction,
    index: number,
    patch: Partial<DepartureEntryInput>
  ) => void;
  onSave: () => void;
  onCancel: () => void;
};

export function RouteFormCard({
  title,
  form,
  fieldErrors,
  submitError,
  isSaving,
  onFieldChange,
  onToggleCircular,
  onAddDeparture,
  onRemoveDeparture,
  onChangeDeparture,
  onSave,
  onCancel,
}: Props) {
  const hasEndDepartures = form.departuresFromEnd.length > 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
      className="flex flex-col gap-5 p-4 rounded-xl border border-primary/40"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          <X size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4">
        <Input
          label="№ маршрута"
          placeholder="например, 106"
          value={form.number}
          onChange={(e) => onFieldChange('number', e.target.value)}
          disabled={isSaving}
          error={fieldErrors.number}
        />
        <Input
          label="Название маршрута"
          placeholder="Центр — Название"
          value={form.name}
          onChange={(e) => onFieldChange('name', e.target.value)}
          disabled={isSaving}
          error={fieldErrors.name}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Checkbox
          label="Круговой маршрут"
          checked={form.isCircular}
          onChange={onToggleCircular}
          disabled={isSaving || hasEndDepartures}
        />
        {hasEndDepartures && (
          <p className="text-xs text-muted-foreground pl-6">
            Чтобы сделать маршрут круговым, удалите рейсы в колонке «Отправление
            (кон. пункт)»
          </p>
        )}
      </div>

      <div
        className={
          form.isCircular
            ? 'grid grid-cols-1 gap-5'
            : 'grid grid-cols-1 xl:grid-cols-2 gap-5'
        }
      >
        <DepartureListEditor
          title={form.isCircular ? 'Рейсы' : 'Отправление (нач. пункт)'}
          entries={form.departuresFromStart}
          errors={fieldErrors.departuresFromStart}
          disabled={isSaving}
          onAdd={() => onAddDeparture('departuresFromStart')}
          onRemove={(index) => onRemoveDeparture('departuresFromStart', index)}
          onChange={(index, patch) =>
            onChangeDeparture('departuresFromStart', index, patch)
          }
        />
        {!form.isCircular && (
          <DepartureListEditor
            title="Отправление (кон. пункт)"
            entries={form.departuresFromEnd}
            errors={fieldErrors.departuresFromEnd}
            disabled={isSaving}
            onAdd={() => onAddDeparture('departuresFromEnd')}
            onRemove={(index) => onRemoveDeparture('departuresFromEnd', index)}
            onChange={(index, patch) =>
              onChangeDeparture('departuresFromEnd', index, patch)
            }
          />
        )}
      </div>

      {submitError && <p className="text-sm text-destructive">{submitError}</p>}

      <div className="flex items-center gap-4 pt-1">
        <Button
          type="submit"
          onClick={onSave}
          disabled={isSaving}
          className="px-6 py-2"
        >
          <Check size={15} /> {isSaving ? 'Сохранение...' : 'Сохранить'}
        </Button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          Отмена
        </button>
      </div>
    </form>
  );
}
