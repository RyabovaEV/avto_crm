'use client';

import { useState } from 'react';
import { Button, Input } from '../ui';
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/organization', {
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
    <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <Input
          label="Название организации"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          label="E-mail"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          label="Адрес"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <Input
          label="Часы работы"
          value={form.workingHours}
          onChange={(e) => setForm({ ...form, workingHours: e.target.value })}
        />
        <Input
          label="Директор"
          value={form.directorName}
          onChange={(e) => setForm({ ...form, directorName: e.target.value })}
        />
        <Input
          label="Заместитель директора"
          value={form.deputyName}
          onChange={(e) => setForm({ ...form, deputyName: e.target.value })}
        />
      </div>
      <Button className="self-end" type="submit">
        Сохранить
      </Button>
    </form>
  );
}
