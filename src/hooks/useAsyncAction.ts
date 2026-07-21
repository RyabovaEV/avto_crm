'use client';

import { useState } from 'react';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useAsyncAction() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleAsyncAction(action: () => Promise<void>) {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await action();
      await delay(300);
      setIsSaving(false);
      setSuccess(true);

      setTimeout(() => setSuccess(false), 1000);
    } catch {
      setIsSaving(false);
      setError('Не удалось сохранить данные');
    }
  }

  function resetSuccess() {
    setSuccess(false);
  }

  return {
    isSaving,
    error,
    success,
    handleAsyncAction,
    resetSuccess,
  };
}
