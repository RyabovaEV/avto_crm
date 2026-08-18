'use client';

import { DepartureEntryState } from '@/lib/validation/routeDeparture';
import { useState } from 'react';
import { useAsyncAction } from './useAsyncAction';
import { RouteType } from '@/generated/prisma/client';
import { deleteEntity, submitForm } from '@/lib/apiClient';
import { RouteFormErrors } from '@/lib/validation/route';
import { DayOfWeekValue } from '@/lib/validation/dayOfWeek';
import { validateRouteForm } from '@/lib/validateRouteForm';
import { useRouter } from 'next/navigation';
import {
  createRouteCommentSchema,
  RouteCommentErrors,
  updateRouteCommentSchema,
} from '@/lib/validation/routeComment';
import { flattenIssues } from '@/lib/flattenIssues';

type Direction = 'departuresFromStart' | 'departuresFromEnd';

export type RouteWithDepartures = {
  id: number;
  number: string;
  name: string;
  isCircular: boolean;
  departures: {
    id: number;
    direction: 'FROM_START' | 'FROM_END';
    time: string;
    dayOfWeek: DayOfWeekValue[];
    comment: string | null;
  }[];
  comments: {
    id: number;
    text: string;
    times: string[];
  }[];
};

export type FormState = {
  number: string;
  name: string;
  isCircular: boolean;
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

export type CommentFormState = {
  routeId: number | null;
  text: string;
  times: string[];
};

export type CommentState =
  | { mode: 'idle' }
  | { mode: 'creating'; form: CommentFormState }
  | { mode: 'editing'; id: number; form: CommentFormState };

const emptyCommentForm: CommentFormState = {
  routeId: null,
  text: '',
  times: [],
};

const emptyForm: FormState = {
  number: '',
  name: '',
  isCircular: false,
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
    isCircular: route.isCircular,
    departuresFromStart: byDirection('FROM_START'),
    departuresFromEnd: byDirection('FROM_END'),
  };
}

export function useRoutesSchedule(
  seasonId: number,
  type: RouteType,
  initialData: RouteWithDepartures[]
) {
  const router = useRouter();

  const [prevInitialData, setPrevInitialData] = useState(initialData);
  const [routes, setRoutes] = useState(initialData);
  const [state, setState] = useState<State>({ mode: 'idle' });
  const [fieldErrors, setFieldErrors] = useState<RouteFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { isSaving, handleAsyncAction } = useAsyncAction();

  const [commentState, setCommentState] = useState<CommentState>({
    mode: 'idle',
  });
  const [commentFieldErrors, setCommentFieldErrors] =
    useState<RouteCommentErrors>({});
  const [commentSubmitError, setCommentSubmitError] = useState<string | null>(
    null
  );
  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(
    null
  );
  const commentAsyncAction = useAsyncAction();

  function startCreateComment() {
    setCommentState({ mode: 'creating', form: emptyCommentForm });
    setCommentFieldErrors({});
    setCommentSubmitError(null);
  }

  function startEditComment(
    routeId: number,
    comment: { id: number; text: string; times: string[] }
  ) {
    setCommentState({
      mode: 'editing',
      id: comment.id,
      form: { routeId, text: comment.text, times: comment.times },
    });
    setCommentFieldErrors({});
    setCommentSubmitError(null);
  }

  function cancelComment() {
    setCommentState({ mode: 'idle' });
    setCommentFieldErrors({});
    setCommentSubmitError(null);
  }

  function updateCommentField<K extends keyof CommentFormState>(
    key: K,
    value: CommentFormState[K]
  ) {
    setCommentState((prev) => {
      if (prev.mode === 'idle') return prev;
      return { ...prev, form: { ...prev.form, [key]: value } };
    });
  }

  if (initialData !== prevInitialData) {
    setPrevInitialData(initialData);
    setRoutes(initialData);
  }

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

  function updateField<K extends 'number' | 'name' | 'isCircular'>(
    key: K,
    value: FormState[K]
  ) {
    setState((prev) => {
      if (prev.mode === 'idle') return prev;
      return { ...prev, form: { ...prev.form, [key]: value } };
    });
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

  async function handleReorder(id: number, direction: 'up' | 'down') {
    await fetch(`/api/routes/${id}/reorder?${query}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ direction }),
    });
    router.refresh();
  }

  function toggleCircular(value: boolean) {
    if (state.mode === 'idle') return;
    setState({
      ...state,
      form: {
        ...state.form,
        isCircular: value,
        departuresFromEnd: value ? [] : state.form.departuresFromEnd,
      },
    });
  }

  async function handleSaveComment() {
    if (commentState.mode === 'idle') return;

    const isCreating = commentState.mode === 'creating';

    if (isCreating) {
      const validation = createRouteCommentSchema.safeParse(commentState.form);
      if (!validation.success) {
        setCommentFieldErrors(flattenIssues(validation.error));
        return;
      }

      setCommentFieldErrors({});
      setCommentSubmitError(null);

      await commentAsyncAction.handleAsyncAction(async () => {
        const saved = await submitForm<{
          id: number;
          routeId: number;
          text: string;
          times: string[];
        }>('/api/route-comments', 'POST', validation.data);

        if (!saved.success) {
          setCommentFieldErrors(saved.fieldErrors as RouteCommentErrors);
          setCommentSubmitError('Проверьте поля формы');
          throw new Error('Ошибка валидации');
        }

        setRoutes((prev) =>
          prev.map((r) =>
            r.id === saved.data.routeId
              ? {
                  ...r,
                  comments: [
                    ...r.comments,
                    {
                      id: saved.data.id,
                      text: saved.data.text,
                      times: saved.data.times,
                    },
                  ],
                }
              : r
          )
        );

        // форма не закрывается — сбрасывается на пустую, чтобы вносить следующий комментарий подряд
        setCommentState({ mode: 'creating', form: emptyCommentForm });
      });
    } else {
      const { routeId, ...rest } = commentState.form;
      const validation = updateRouteCommentSchema.safeParse(rest);
      if (!validation.success) {
        setCommentFieldErrors(flattenIssues(validation.error));
        return;
      }

      setCommentFieldErrors({});
      setCommentSubmitError(null);
      const commentId = commentState.id;

      await commentAsyncAction.handleAsyncAction(async () => {
        const saved = await submitForm<{
          id: number;
          routeId: number;
          text: string;
          times: string[];
        }>(`/api/route-comments/${commentId}`, 'PATCH', validation.data);

        if (!saved.success) {
          setCommentFieldErrors(saved.fieldErrors as RouteCommentErrors);
          setCommentSubmitError('Проверьте поля формы');
          throw new Error('Ошибка валидации');
        }

        setRoutes((prev) =>
          prev.map((r) =>
            r.id === routeId
              ? {
                  ...r,
                  comments: r.comments.map((c) =>
                    c.id === commentId
                      ? {
                          id: c.id,
                          text: saved.data.text,
                          times: saved.data.times,
                        }
                      : c
                  ),
                }
              : r
          )
        );

        setCommentState({ mode: 'idle' }); // при редактировании форма закрывается — тут нет сценария "правим подряд много"
      });
    }
  }

  async function handleDeleteComment(routeId: number, commentId: number) {
    setDeletingCommentId(commentId);
    try {
      await deleteEntity(`/api/route-comments/${commentId}`);
      setRoutes((prev) =>
        prev.map((r) =>
          r.id === routeId
            ? { ...r, comments: r.comments.filter((c) => c.id !== commentId) }
            : r
        )
      );
    } finally {
      setDeletingCommentId(null);
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
    isCommentSaving: commentAsyncAction.isSaving,
    deletingCommentId,
    startCreateComment,
    startEditComment,
    cancelComment,
    updateCommentField,
    handleSaveComment,
    handleDeleteComment,
  };
}
