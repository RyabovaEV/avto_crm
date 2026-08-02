'use client';

import { DepartureEntryState } from '@/lib/validation/routeDeparture';
import { useState } from 'react';
import { useAsyncAction } from './useAsyncAction';
import { RouteType } from '@/generated/prisma/client';
import { deleteEntity, submitForm } from '@/lib/apiClient';
import { RouteFormErrors } from '@/lib/validation/route';
import { DayOfWeekValue } from '@/lib/validation/dayOfWeek';
import { validateRouteForm } from '@/lib/validateRouteForm';

type Direction = 'departuresFromStart' | 'departuresFromEnd';

export type RouteWithDepartures = {
  id: number;
  number: string;
  name: string;
  departures: {
    id: number;
    direction: 'FROM_START' | 'FROM_END';
    time: string;
    dayOfWeek: DayOfWeekValue[];
    comment: string | null;
  }[];
};

export type FormState = {
  number: string;
  name: string;
  departuresFromStart: DepartureEntryState[];
  departuresFromEnd: DepartureEntryState[];
};

type State =
  | { mode: 'idle' }
  | { mode: 'creating'; form: FormState }
  | { mode: 'editing'; id: number; form: FormState };

const emptyEntry: DepartureEntryState = {
  time: '',
  dayOfWeek: [],
  comment: '',
};

const emptyForm: FormState = {
  number: '',
  name: '',
  departuresFromStart: [],
  departuresFromEnd: [],
};

function toFormInput(route: RouteWithDepartures): FormState {
  const byDirection = (direction: 'FROM_START' | 'FROM_END') =>
    route.departures
      .filter((d) => d.direction === direction)
      .map((d) => ({
        time: d.time,
        dayOfWeek: d.dayOfWeek,
        comment: d.comment ?? '',
      }));

  return {
    number: route.number,
    name: route.name,
    departuresFromStart: byDirection('FROM_START'),
    departuresFromEnd: byDirection('FROM_END'),
  };
}

export function useRoutesSchedule(
  seasonId: number,
  type: RouteType,
  initialData: RouteWithDepartures[]
) {
  const [routes, setRoutes] = useState(initialData);
  const [state, setState] = useState<State>({ mode: 'idle' });
  const [fieldErrors, setFieldErrors] = useState<RouteFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { isSaving, handleAsyncAction } = useAsyncAction();

  const isFormOpen = state.mode !== 'idle';
  const query = `seasonId=${seasonId}&type=${type}`;

  function startCreate() {
    setState({ mode: 'creating', form: emptyForm });
    setFieldErrors({});
    setSubmitError(null);
  }

  function startEdit(route: RouteWithDepartures) {
    setState({ mode: 'editing', id: route.id, form: toFormInput(route) });
    setFieldErrors({});
    setSubmitError(null);
  }

  function cancel() {
    setState({ mode: 'idle' });
    setFieldErrors({});
    setSubmitError(null);
  }

  function updateField<K extends 'number' | 'name'>(
    key: K,
    value: FormState[K]
  ) {
    if (state.mode === 'idle') return;
    setState({ ...state, form: { ...state.form, [key]: value } });
  }

  // --- управление динамическими списками рейсов ---

  function addDeparture(direction: Direction) {
    if (state.mode === 'idle') return;
    setState({
      ...state,
      form: {
        ...state.form,
        [direction]: [...state.form[direction], { ...emptyEntry }],
      },
    });
  }

  function removeDeparture(direction: Direction, index: number) {
    if (state.mode === 'idle') return;
    setState({
      ...state,
      form: {
        ...state.form,
        [direction]: state.form[direction].filter((_, i) => i !== index),
      },
    });
  }

  function updateDeparture(
    direction: Direction,
    index: number,
    patch: Partial<DepartureEntryState>
  ) {
    if (state.mode === 'idle') return;
    setState({
      ...state,
      form: {
        ...state.form,
        [direction]: state.form[direction].map((entry, i) =>
          i === index ? { ...entry, ...patch } : entry
        ),
      },
    });
  }

  // --- сохранение / удаление ---

  async function handleSave() {
    if (state.mode === 'idle') return;

    const validation = validateRouteForm(state.form);
    if (!validation.success) {
      setFieldErrors(validation.fieldErrors);
      return;
    }

    setFieldErrors({});
    setSubmitError(null);
    const isCreating = state.mode === 'creating';
    const url = isCreating
      ? `/api/routes?${query}`
      : `/api/routes/${state.id}?${query}`;

    await handleAsyncAction(async () => {
      const saved = await submitForm<RouteWithDepartures>(
        url,
        isCreating ? 'POST' : 'PATCH',
        validation.data
      );

      if (!saved.success) {
        setFieldErrors(saved.fieldErrors as RouteFormErrors);
        setSubmitError('Проверьте поля формы');
        throw new Error('Ошибка валидации');
      }

      setRoutes((prev) =>
        isCreating
          ? [...prev, saved.data]
          : prev.map((r) => (r.id === saved.data.id ? saved.data : r))
      );
      setState({ mode: 'idle' });
    });
  }

  async function handleDelete(id: number) {
    setDeletingId(id);
    try {
      await deleteEntity(`/api/routes/${id}?${query}`);
      setRoutes((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  return {
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
    addDeparture,
    removeDeparture,
    updateDeparture,
    handleSave,
    handleDelete,
  };
}
