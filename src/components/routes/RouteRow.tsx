import { EntityRow } from '@/components/ui';
import { RouteWithDepartures } from '@/hooks/useRoutesSchedule';
import { formatDaysOfWeek } from '@/lib/scheduleDays';

type Props = {
  route: RouteWithDepartures;
  isDisabled: boolean;
  isDeleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

function DepartureGroup({
  label,
  departures,
}: {
  label: string;
  departures: RouteWithDepartures['departures'];
}) {
  if (departures.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {departures.map((d) => (
          <span
            key={d.id}
            className="text-sm text-foreground whitespace-nowrap"
          >
            {d.time}
            <span className="text-xs text-muted-foreground ml-1">
              {formatDaysOfWeek(d.dayOfWeek)}
              {d.comment && ` · ${d.comment}`}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function RouteRow({
  route,
  isDisabled,
  isDeleting,
  onEdit,
  onDelete,
}: Props) {
  const fromStart = route.departures.filter(
    (d) => d.direction === 'FROM_START'
  );
  const fromEnd = route.departures.filter((d) => d.direction === 'FROM_END');

  return (
    <EntityRow
      icon={{ type: 'text', text: route.number }}
      isDisabled={isDisabled}
      isDeleting={isDeleting}
      onEdit={onEdit}
      onDelete={onDelete}
    >
      <div className="flex flex-col gap-2 w-full">
        <span className="text-sm font-semibold text-foreground">
          {route.name}
        </span>
        <DepartureGroup label="Отправление" departures={fromStart} />
        <DepartureGroup label="Обратно" departures={fromEnd} />
      </div>
    </EntityRow>
  );
}
