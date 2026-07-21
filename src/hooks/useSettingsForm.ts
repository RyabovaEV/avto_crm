'use client';

import { useState } from 'react';
import { useAsyncAction } from './useAsyncAction';

export function useSettingsForm<T extends Record<string, string>>(
  initialForm: T,
  endpoint: string
) {
  const [form, setForm] = useState<T>(initialForm);
  const { isSaving, error, success, handleAsyncAction, resetSuccess } =
    useAsyncAction();

  function updateField<K extends keyof T>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    resetSuccess();
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleAsyncAction(async () => {
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

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
  };
}
