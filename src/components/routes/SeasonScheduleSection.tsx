'use client';

import { Plus } from 'lucide-react';
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
  } = useRoutesSchedule(seasonId, routeType, initialData);

  const theme = SEASON_THEME[seasonType];

  return (
    <Accordion
      icon={theme.icon}
      border={theme.border}
      iconBg={theme.iconBg}
      iconText={theme.iconText}
      title={`${seasonTitle} расписание`}
      count={routes.length}
      defaultOpen={isCurrentSeason(periods)}
      buttonLabel="Добавить маршрут"
      buttonIcon={Plus}
      onButtonClick={startCreate}
      buttonDisabled={isFormOpen}
    >
      <div className="flex flex-col gap-3">
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

        {routes.map((route) =>
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
              isDisabled={isFormOpen || deletingId !== null}
              isDeleting={deletingId === route.id}
              onEdit={() => startEdit(route)}
              onDelete={() => handleDelete(route.id)}
            />
          )
        )}
      </div>
    </Accordion>
  );
}
