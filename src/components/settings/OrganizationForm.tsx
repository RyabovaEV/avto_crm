'use client';

import { ExportButton, Form, Input } from '../ui';
import { CompanyInfo } from '@/generated/prisma/client';
import { useSettingsForm } from '@/hooks/useSettingsForm';
import { organizationSchema } from '@/lib/validation/organization';

type Props = {
  initialData: CompanyInfo | null;
};

export function OrganizationForm({ initialData }: Props) {
  const {
    form,
    isSaving,
    fieldErrors,
    error,
    success,
    updateField,
    handleSubmit,
  } = useSettingsForm(
    {
      name: initialData?.name ?? '',
      email: initialData?.email ?? '',
      address: initialData?.address ?? '',
      workingHours: initialData?.workingHours ?? '',
      directorName: initialData?.directorName ?? '',
      deputyName: initialData?.deputyName ?? '',
    },
    '/api/organization',
    organizationSchema
  );

  return (
    <Form
      onSubmit={handleSubmit}
      isSaving={isSaving}
      error={error}
      success={success}
      secondaryAction={
        <ExportButton
          endpoint="/api/organization/export"
          filename="organization.json"
        />
      }
    >
      <Input
        label="Название организации"
        value={form.name}
        onChange={(e) => updateField('name', e.target.value)}
        disabled={isSaving}
        error={fieldErrors.name}
      />
      <Input
        label="E-mail"
        type="email"
        value={form.email}
        onChange={(e) => updateField('email', e.target.value)}
        disabled={isSaving}
        error={fieldErrors.email}
      />
      <Input
        label="Адрес"
        value={form.address}
        onChange={(e) => updateField('address', e.target.value)}
        disabled={isSaving}
        error={fieldErrors.address}
      />
      <Input
        label="Часы работы"
        value={form.workingHours}
        onChange={(e) => updateField('workingHours', e.target.value)}
        disabled={isSaving}
        error={fieldErrors.workingHours}
      />
      <Input
        label="Директор"
        value={form.directorName}
        onChange={(e) => updateField('directorName', e.target.value)}
        disabled={isSaving}
        error={fieldErrors.directorName}
      />
      <Input
        label="Заместитель директора"
        value={form.deputyName}
        onChange={(e) => updateField('deputyName', e.target.value)}
        disabled={isSaving}
        error={fieldErrors.deputyName}
      />
    </Form>
  );
}
