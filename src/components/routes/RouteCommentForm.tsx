import { Button } from '@/components/ui';
import { X, Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { RouteWithDepartures } from '@/hooks/useRoutesSchedule';
import { RouteCommentErrors } from '@/lib/validation/routeComment';

type CommentFormState = {
  routeId: number | null;
  text: string;
  times: string[];
};

type Props = {
  mode: 'creating' | 'editing';
  routes: RouteWithDepartures[]; // для дропдоуна при создании
  form: CommentFormState;
  fieldErrors: RouteCommentErrors;
  submitError: string | null;
  isSaving: boolean;
  onChange: <K extends keyof CommentFormState>(
    key: K,
    value: CommentFormState[K]
  ) => void;
  onSave: () => void;
  onCancel: () => void;
};

export function RouteCommentForm({
  mode,
  routes,
  form,
  fieldErrors,
  submitError,
  isSaving,
  onChange,
  onSave,
  onCancel,
}: Props) {
  const selectedRoute = routes.find((r) => r.id === form.routeId);

  const availableTimes = selectedRoute
    ? {
        fromStart: selectedRoute.departures
          .filter((d) => d.direction === 'FROM_START')
          .map((d) => d.time),
        fromEnd: selectedRoute.departures
          .filter((d) => d.direction === 'FROM_END')
          .map((d) => d.time),
      }
    : { fromStart: [], fromEnd: [] };

  function toggleTime(time: string) {
    onChange(
      'times',
      form.times.includes(time)
        ? form.times.filter((t) => t !== time)
        : [...form.times, time]
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
      className="flex flex-col gap-4 p-4 rounded-xl border border-primary/40"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">
          {mode === 'creating'
            ? 'Новое примечание'
            : 'Редактирование примечания'}
        </span>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-muted-foreground text-sm">Маршрут</label>
        {mode === 'creating' ? (
          <select
            value={form.routeId ?? ''}
            onChange={(e) => {
              onChange(
                'routeId',
                e.target.value ? Number(e.target.value) : null
              );
              onChange('times', []); // при смене маршрута старые времена от другого маршрута теряют смысл
            }}
            disabled={isSaving}
            className={cn(
              'w-full px-4 py-2.5 rounded-lg border border-border bg-input text-foreground text-sm',
              'focus:outline-none focus:ring-1 focus:ring-ring transition-shadow',
              fieldErrors.routeId && 'border-destructive focus:ring-destructive'
            )}
          >
            <option value="">Выберите маршрут</option>
            {routes.map((route) => (
              <option key={route.id} value={route.id}>
                {route.number} — {route.name}
              </option>
            ))}
          </select>
        ) : (
          <span className="text-sm font-medium text-foreground">
            {selectedRoute
              ? `${selectedRoute.number} — ${selectedRoute.name}`
              : ''}
          </span>
        )}
        {fieldErrors.routeId && (
          <p className="text-sm text-destructive">{fieldErrors.routeId}</p>
        )}
      </div>

      {selectedRoute && (
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground text-sm">
            Относится к конкретным рейсам (необязательно)
          </span>

          {availableTimes.fromStart.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
                {selectedRoute.isCircular ? 'Рейсы' : 'Отправление'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {availableTimes.fromStart.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => toggleTime(time)}
                    disabled={isSaving}
                    className={cn(
                      'px-2.5 py-1 rounded-md text-xs font-medium border transition-colors',
                      form.times.includes(time)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'text-muted-foreground border-border hover:border-primary hover:text-primary'
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {availableTimes.fromEnd.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
                Обратно
              </span>
              <div className="flex flex-wrap gap-1.5">
                {availableTimes.fromEnd.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => toggleTime(time)}
                    disabled={isSaving}
                    className={cn(
                      'px-2.5 py-1 rounded-md text-xs font-medium border transition-colors',
                      form.times.includes(time)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'text-muted-foreground border-border hover:border-primary hover:text-primary'
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {form.times.length === 0 && (
            <span className="text-xs text-muted-foreground">
              Ничего не выбрано — примечание относится ко всему маршруту
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-muted-foreground text-sm">
          Текст примечания
        </label>
        <textarea
          value={form.text}
          onChange={(e) => onChange('text', e.target.value)}
          disabled={isSaving}
          rows={3}
          placeholder="Например: следуют с заездом к больнице"
          className={cn(
            'w-full px-4 py-2.5 rounded-lg border border-border bg-input text-foreground text-sm resize-none',
            'focus:outline-none focus:ring-1 focus:ring-ring transition-shadow',
            'placeholder:text-muted-foreground',
            fieldErrors.text && 'border-destructive focus:ring-destructive'
          )}
        />
        {fieldErrors.text && (
          <p className="text-sm text-destructive">{fieldErrors.text}</p>
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
          {mode === 'creating' ? 'Готово' : 'Отмена'}
        </button>
      </div>
    </form>
  );
}
