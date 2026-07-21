'use client';

import { useState } from 'react';
import { useAsyncAction } from './useAsyncAction';
import { z } from 'zod';

export function useSettingsForm<Schema extends z.ZodObject<z.ZodRawShape>>(
  initialForm: z.input<Schema>,
  endpoint: string,
  schema: Schema
) {
  type FormInput = z.input<Schema>;
  const [form, setForm] = useState<FormInput>(initialForm);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormInput, string>>
  >({});
  const { isSaving, error, success, handleAsyncAction, resetSuccess } =
    useAsyncAction();

  function updateField<K extends keyof FormInput>(key: K, value: FormInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    resetSuccess();
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = schema.safeParse(form);
    if (!result.success) {
      const errors: Partial<Record<keyof FormInput, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormInput;
        if (!errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});

    handleAsyncAction(async () => {
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.status === 400) {
        const data = await response.json();
        setFieldErrors(data.fieldErrors ?? {});
        throw new Error('Ошибка валидации');
      }

      if (!response.ok) {
        throw new Error('Ошибка сохранения');
      }
    });
  }

  return {
    form,
    isSaving,
    error,
    success,
    updateField,
    handleSubmit,
    fieldErrors,
  };
}
