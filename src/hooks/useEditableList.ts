'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useAsyncAction } from './useAsyncAction';
import { validateWithSchema } from '@/lib/validateWithSchema';

type EditableListState<FormInput> =
  | { mode: 'idle' }
  | { mode: 'creating'; form: FormInput }
  | { mode: 'editing'; id: number; form: FormInput };

type UseEditableListConfig<
  TItem extends { id: number },
  Schema extends z.ZodObject<z.ZodRawShape>,
> = {
  initialData: TItem[];
  endpoint: string;
  schema: Schema;
  emptyForm: z.input<Schema>;
  toFormInput: (item: TItem) => z.input<Schema>;
};

export function useEditableList<
  TItem extends { id: number },
  Schema extends z.ZodObject<z.ZodRawShape>,
>({
  initialData,
  endpoint,
  schema,
  emptyForm,
  toFormInput,
}: UseEditableListConfig<TItem, Schema>) {
  type FormInput = z.input<Schema>;

  const [items, setItems] = useState<TItem[]>(initialData);
  const [state, setState] = useState<EditableListState<FormInput>>({
    mode: 'idle',
  });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormInput, string>>
  >({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { isSaving, handleAsyncAction } = useAsyncAction();

  const isFormOpen = state.mode !== 'idle';

  function startCreate() {
    setState({ mode: 'creating', form: emptyForm });
    setFieldErrors({});
    setSubmitError(null);
  }

  function startEdit(item: TItem) {
    setState({ mode: 'editing', id: item.id, form: toFormInput(item) });
    setFieldErrors({});
    setSubmitError(null);
  }

  function cancel() {
    setState({ mode: 'idle' });
    setFieldErrors({});
    setSubmitError(null);
  }

  function updateForm<K extends keyof FormInput>(key: K, value: FormInput[K]) {
    if (state.mode === 'idle') return;
    setState({ ...state, form: { ...state.form, [key]: value } });
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    setSubmitError(null);
  }

  async function handleSave() {
    if (state.mode === 'idle') return;

    const result = validateWithSchema(schema, state.form);
    if (!result.success) {
      setFieldErrors(result.fieldErrors);
      return;
    }

    setFieldErrors({});
    setSubmitError(null);
    const isCreating = state.mode === 'creating';
    const url = isCreating ? endpoint : `${endpoint}/${state.id}`;

    await handleAsyncAction(async () => {
      const response = await fetch(url, {
        method: isCreating ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (response.status === 400) {
        const data = await response.json();
        setFieldErrors(data.fieldErrors ?? {});
        throw new Error('Ошибка валидации');
      }

      if (!response.ok) {
        setSubmitError('Не удалось сохранить данные');
        throw new Error('Ошибка сохранения');
      }

      const saved: TItem = await response.json();
      setItems((prev) =>
        isCreating
          ? [...prev, saved]
          : prev.map((item) => (item.id === saved.id ? saved : item))
      );
      setState({ mode: 'idle' });
    });
  }

  async function handleDelete(id: number) {
    setDeletingId(id);
    try {
      const response = await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error();
      setItems((prev) => prev.filter((item) => item.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  return {
    items,
    state,
    fieldErrors,
    submitError,
    isSaving,
    deletingId,
    isFormOpen,
    startCreate,
    startEdit,
    cancel,
    updateForm,
    handleSave,
    handleDelete,
  };
}
