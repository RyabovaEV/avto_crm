'use client';

import { Form, Input } from '../ui';
import { CompanyInfo } from '@/generated/prisma/client';
import { useSettingsForm } from '@/hooks/useSettingsForm';

type Props = {
  initialData: CompanyInfo | null;
};

export function OrganizationForm({ initialData }: Props) {
  const { form, isSaving, error, success, updateField, handleSubmit } =
    useSettingsForm(
      {
        name: initialData?.name ?? '',
        email: initialData?.email ?? '',
        address: initialData?.address ?? '',
        workingHours: initialData?.workingHours ?? '',
        directorName: initialData?.directorName ?? '',
        deputyName: initialData?.deputyName ?? '',
      },
      '/api/organization'
    );

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
