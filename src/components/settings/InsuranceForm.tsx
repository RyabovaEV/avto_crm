'use client';

import { CompanyInsurance } from '@/generated/prisma/client';
import { Form, Input } from '../ui';
import { useState } from 'react';

type Props = {
  initialData: CompanyInsurance | null;
};

export function InsuranceForm({ initialData }: Props) {
  const [form, setForm] = useState({
    insurer: initialData?.insurer ?? '',
    number: initialData?.number ?? '',
    dateBegin: initialData?.dateBegin
      ? new Date(initialData.dateBegin).toISOString().split('T')[0]
      : '',
    dateEnd: initialData?.dateEnd
      ? new Date(initialData.dateEnd).toISOString().split('T')[0]
      : '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function updateField<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSuccess(false);
  }

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/insurance', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Ошибка сохранения');
      }

      await delay(300);
      setIsSaving(false);
      setSuccess(true);

      setTimeout(() => setSuccess(false), 1000);
    } catch {
      setIsSaving(false);
      setError('Не удалось сохранить данные');
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      isSaving={isSaving}
      error={error}
      success={success}
    >
      <Input
        label="Страховая компания"
        value={form.insurer}
        onChange={(e) => updateField('insurer', e.target.value)}
        disabled={isSaving}
      />
      <Input
        label="Номер полиса"
        value={form.number}
        onChange={(e) => updateField('number', e.target.value)}
        disabled={isSaving}
      />
      <Input
        label="Дата начала действия"
        type="date"
        value={form.dateBegin}
        onChange={(e) => updateField('dateBegin', e.target.value)}
        disabled={isSaving}
      />
      <Input
        label="Дата окончания действия"
        type="date"
        value={form.dateEnd}
        onChange={(e) => updateField('dateEnd', e.target.value)}
        disabled={isSaving}
      />
    </Form>
  );
}
