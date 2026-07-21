'use client';

import { useState } from 'react';
import { Form, Input } from '../ui';
import { CompanyInfo } from '@/generated/prisma/client';

type Props = {
  initialData: CompanyInfo | null;
};

export function OrganizationForm({ initialData }: Props) {
  const [form, setForm] = useState({
    name: initialData?.name ?? '',
    email: initialData?.email ?? '',
    address: initialData?.address ?? '',
    workingHours: initialData?.workingHours ?? '',
    directorName: initialData?.directorName ?? '',
    deputyName: initialData?.deputyName ?? '',
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
      const response = await fetch('/api/organization', {
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
        label="Название организации"
        value={form.name}
        onChange={(e) => updateField('name', e.target.value)}
      />
      <Input
        label="E-mail"
        type="email"
        value={form.email}
        onChange={(e) => updateField('email', e.target.value)}
      />
      <Input
        label="Адрес"
        value={form.address}
        onChange={(e) => updateField('address', e.target.value)}
      />
      <Input
        label="Часы работы"
        value={form.workingHours}
        onChange={(e) => updateField('workingHours', e.target.value)}
      />
      <Input
        label="Директор"
        value={form.directorName}
        onChange={(e) => updateField('directorName', e.target.value)}
      />
      <Input
        label="Заместитель директора"
        value={form.deputyName}
        onChange={(e) => updateField('deputyName', e.target.value)}
      />
    </Form>
  );
}
