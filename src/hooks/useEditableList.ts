'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useAsyncAction } from './useAsyncAction';
import { validateWithSchema } from '@/lib/validateWithSchema';
import { deleteEntity, submitForm } from '@/lib/apiClient';

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

    const validation = validateWithSchema(schema, state.form);
    if (!validation.success) {
      setFieldErrors(validation.fieldErrors);
      return;
    }

    setFieldErrors({});
    setSubmitError(null);
    const isCreating = state.mode === 'creating';
    const url = isCreating ? endpoint : `${endpoint}/${state.id}`;

    await handleAsyncAction(async () => {
      const result = await submitForm<TItem>(
        url,
        isCreating ? 'POST' : 'PATCH',
        validation.data
      );

      if (!result.success) {
        setFieldErrors(
          result.fieldErrors as Partial<Record<keyof FormInput, string>>
        );
        setSubmitError('Проверьте поля формы');
        throw new Error('Ошибка валидации');
      }

      setItems((prev) =>
        isCreating
          ? [...prev, result.data]
          : prev.map((item) =>
              item.id === result.data.id ? result.data : item
            )
      );
      setState({ mode: 'idle' });
    });
  }

  async function handleDelete(id: number) {
    setDeletingId(id);
    try {
      await deleteEntity(`${endpoint}/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setSubmitError('Ошибка удаления');
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
