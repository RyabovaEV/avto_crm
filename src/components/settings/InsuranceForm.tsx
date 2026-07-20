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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/insurance', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Ошибка сохранения');
      }
    } catch {
      setError('Не удалось сохранить данные');
    } finally {
      setIsSaving(false);
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label="Страховая компания"
        value={form.insurer}
        onChange={(e) => setForm({ ...form, insurer: e.target.value })}
      />
      <Input
        label="Номер полиса"
        value={form.number}
        onChange={(e) => setForm({ ...form, number: e.target.value })}
      />
      <Input
        label="Дата начала действия"
        type="date"
        value={form.dateBegin}
        onChange={(e) => setForm({ ...form, dateBegin: e.target.value })}
      />
      <Input
        label="Дата окончания действия"
        type="date"
        value={form.dateEnd}
        onChange={(e) => setForm({ ...form, dateEnd: e.target.value })}
      />
    </Form>
  );
}
