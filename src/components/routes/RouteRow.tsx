import { EntityRow } from '@/components/ui';
import {
  RouteWithDepartures,
  CommentState,
  CommentFormState,
} from '@/hooks/useRoutesSchedule';
import { formatDaysOfWeek } from '@/lib/scheduleDays';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { RouteComments } from './RouteComments';
import { RouteCommentErrors } from '@/lib/validation/routeComment';
import { RouteCommentForm } from './RouteCommentForm';

type Props = {
  route: RouteWithDepartures;
  isDisabled: boolean;
  isDeleting: boolean;
  isFirst: boolean;
  isLast: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;

  commentState: CommentState;
  commentFieldErrors: RouteCommentErrors;
  commentSubmitError: string | null;
  isCommentSaving: boolean;
  deletingCommentId: number | null;
  onCommentFieldChange: <K extends keyof CommentFormState>(
    key: K,
    value: CommentFormState[K]
  ) => void;
  onCommentSave: () => void;
  onCommentCancel: () => void;
  onCommentEditStart: (comment: {
    id: number;
    text: string;
    times: string[];
  }) => void;
  onCommentDelete: (commentId: number) => void;
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
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
  commentState,
  commentFieldErrors,
  commentSubmitError,
  isCommentSaving,
  deletingCommentId,
  onCommentFieldChange,
  onCommentSave,
  onCommentCancel,
  onCommentEditStart,
  onCommentDelete,
}: Props) {
  const fromStart = route.departures.filter(
    (d) => d.direction === 'FROM_START'
  );
  const fromEnd = route.departures.filter((d) => d.direction === 'FROM_END');

  const editingCommentId =
    commentState.mode === 'editing' ? commentState.id : null;

  return (
    <EntityRow
      icon={{ type: 'text', text: route.number }}
      isDisabled={isDisabled}
      isDeleting={isDeleting}
      onEdit={onEdit}
      onDelete={onDelete}
      actions={
        <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={isDisabled || isFirst}
            className="p-0.5 rounded text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronUp size={13} />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={isDisabled || isLast}
            className="p-0.5 rounded text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronDown size={13} />
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">
            {route.name}
          </span>
          {route.isCircular && (
            <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
              КРУГОВОЙ
            </span>
          )}
        </div>
        <DepartureGroup
          label={route.isCircular ? 'Рейсы' : 'Отправление'}
          departures={fromStart}
        />
        {!route.isCircular && (
          <DepartureGroup label="Обратно" departures={fromEnd} />
        )}

        <RouteComments
          comments={route.comments}
          isDisabled={isDisabled}
          deletingCommentId={deletingCommentId}
          editingCommentId={editingCommentId}
          onEdit={(comment) => onCommentEditStart(comment)}
          onDelete={(commentId) => onCommentDelete(commentId)}
          renderEditForm={() => (
            <RouteCommentForm
              mode="editing"
              routes={[route]}
              form={
                commentState.mode === 'editing'
                  ? commentState.form
                  : { routeId: route.id, text: '', times: [] }
              }
              fieldErrors={commentFieldErrors}
              submitError={commentSubmitError}
              isSaving={isCommentSaving}
              onChange={onCommentFieldChange}
              onSave={onCommentSave}
              onCancel={onCommentCancel}
            />
          )}
        />
      </div>
    </EntityRow>
  );
}
