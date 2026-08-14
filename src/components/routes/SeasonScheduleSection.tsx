'use client';

import { MessageSquarePlus, Plus } from 'lucide-react';
import { RouteType, SeasonPeriod, SeasonType } from '@/generated/prisma/client';
import {
  useRoutesSchedule,
  RouteWithDepartures,
} from '@/hooks/useRoutesSchedule';
import { RouteFormCard } from './RouteFormCard';
import { RouteRow } from './RouteRow';
import { isCurrentSeason } from '@/lib/seasonPeriod';
import { Accordion } from '../ui/Accordion';
import { SEASON_THEME } from '@/config/SeasonTheme';
import { RouteCommentForm } from './RouteCommentForm';
import { ExportButton } from '../ui';

type Props = {
  seasonId: number;
  seasonType: SeasonType;
  seasonTitle: string;
  periods: SeasonPeriod[];
  routeType: RouteType;
  initialData: RouteWithDepartures[];
};

export function SeasonScheduleSection({
  seasonId,
  seasonType,
  seasonTitle,
  routeType,
  periods,
  initialData,
}: Props) {
  const {
    routes,
    state,
    fieldErrors,
    submitError,
    isSaving,
    deletingId,
    isFormOpen,
    startCreate,
    startEdit,
    cancel,
    updateField,
    toggleCircular,
    addDeparture,
    removeDeparture,
    updateDeparture,
    handleSave,
    handleDelete,
    handleReorder,
    commentState,
    commentFieldErrors,
    commentSubmitError,
    isCommentSaving,
    deletingCommentId,
    startCreateComment,
    updateCommentField,
    handleSaveComment,
    cancelComment,
    startEditComment,
    handleDeleteComment,
  } = useRoutesSchedule(seasonId, routeType, initialData);

  const theme = SEASON_THEME[seasonType];
  const isAddingComment = commentState.mode === 'creating';
  const isEditingComment = commentState.mode === 'editing';
  const isAnyFormOpen = isFormOpen || isAddingComment || isEditingComment;

  const exportQuery = `seasonId=${seasonId}&type=${routeType}`;
  const exportFilename = `routes-${seasonType.toLowerCase()}-${routeType.toLowerCase()}.ts`;

  return (
    <Accordion
      icon={theme.icon}
      border={theme.border}
      iconBg={theme.iconBg}
      iconText={theme.iconText}
      title={`${seasonTitle} расписание`}
      count={routes.length}
      defaultOpen={isCurrentSeason(periods)}
      actions={[
        {
          label: 'Добавить примечание',
          icon: MessageSquarePlus,
          onClick: startCreateComment,
          disabled: isAnyFormOpen,
          mode: 'ghost',
          align: 'end',
        },
        {
          label: 'Добавить маршрут',
          icon: Plus,
          onClick: startCreate,
          disabled: isAnyFormOpen,
        },
      ]}
    >
      <div className="flex flex-col gap-3">
        {isAddingComment && (
          <RouteCommentForm
            mode="creating"
            routes={routes}
            form={commentState.form}
            fieldErrors={commentFieldErrors}
            submitError={commentSubmitError}
            isSaving={isCommentSaving}
            onChange={updateCommentField}
            onSave={handleSaveComment}
            onCancel={cancelComment}
          />
        )}

        {state.mode === 'creating' && (
          <RouteFormCard
            title="Новый маршрут"
            form={state.form}
            fieldErrors={fieldErrors}
            submitError={submitError}
            isSaving={isSaving}
            onFieldChange={updateField}
            onToggleCircular={toggleCircular}
            onAddDeparture={addDeparture}
            onRemoveDeparture={removeDeparture}
            onChangeDeparture={updateDeparture}
            onSave={handleSave}
            onCancel={cancel}
          />
        )}

        {routes.length === 0 && state.mode !== 'creating' && (
          <p className="text-sm text-muted-foreground">Маршруты не добавлены</p>
        )}

        {routes.map((route, index) =>
          state.mode === 'editing' && state.id === route.id ? (
            <RouteFormCard
              key={route.id}
              title="Редактирование маршрута"
              form={state.form}
              fieldErrors={fieldErrors}
              submitError={submitError}
              isSaving={isSaving}
              onFieldChange={updateField}
              onToggleCircular={toggleCircular}
              onAddDeparture={addDeparture}
              onRemoveDeparture={removeDeparture}
              onChangeDeparture={updateDeparture}
              onSave={handleSave}
              onCancel={cancel}
            />
          ) : (
            <RouteRow
              key={route.id}
              route={route}
              isDisabled={isAnyFormOpen || deletingId !== null}
              isDeleting={deletingId === route.id}
              onEdit={() => startEdit(route)}
              isFirst={index === 0}
              isLast={index === routes.length - 1}
              onDelete={() => handleDelete(route.id)}
              onMoveUp={() => handleReorder(route.id, 'up')}
              onMoveDown={() => handleReorder(route.id, 'down')}
              commentState={commentState}
              commentFieldErrors={commentFieldErrors}
              commentSubmitError={commentSubmitError}
              isCommentSaving={isCommentSaving}
              deletingCommentId={deletingCommentId}
              onCommentFieldChange={updateCommentField}
              onCommentSave={handleSaveComment}
              onCommentCancel={cancelComment}
              onCommentEditStart={(comment) =>
                startEditComment(route.id, comment)
              }
              onCommentDelete={(commentId) =>
                handleDeleteComment(route.id, commentId)
              }
            />
          )
        )}
      </div>

      <div className="flex justify-end">
        <ExportButton
          endpoint={`/api/routes/export?${exportQuery}`}
          filename={exportFilename}
        />
      </div>
    </Accordion>
  );
}
