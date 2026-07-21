'use client';

import { CompanyInsurance } from '@/generated/prisma/client';
import { Form, Input } from '../ui';
import { useSettingsForm } from '@/hooks/useSettingsForm';
import {
  InsuranceFormInput,
  insuranceSchema,
} from '@/lib/validation/insurance';

type Props = {
  initialData: CompanyInsurance | null;
};

export function InsuranceForm({ initialData }: Props) {
  const { form, isSaving, fieldErrors, success, updateField, handleSubmit } =
    useSettingsForm(
      {
        insurer: initialData?.insurer ?? '',
        number: initialData?.number ?? '',
        dateBegin: initialData?.dateBegin
          ? new Date(initialData.dateBegin).toISOString().split('T')[0]
          : '',
        dateEnd: initialData?.dateEnd
          ? new Date(initialData.dateEnd).toISOString().split('T')[0]
          : '',
      },
      '/api/insurance',
      insuranceSchema
    );

  return (
    <Form onSubmit={handleSubmit} isSaving={isSaving} success={success}>
      <Input
        label="Страховая компания"
        value={form.insurer}
        onChange={(e) => updateField('insurer', e.target.value)}
        disabled={isSaving}
        error={fieldErrors.insurer}
      />
      <Input
        label="Номер полиса"
        value={form.number}
        onChange={(e) => updateField('number', e.target.value)}
        disabled={isSaving}
        error={fieldErrors.number}
      />
      <Input
        label="Дата начала действия"
        type="date"
        value={form.dateBegin}
        onChange={(e) => updateField('dateBegin', e.target.value)}
        disabled={isSaving}
        error={fieldErrors.dateBegin}
      />
      <Input
        label="Дата окончания действия"
        type="date"
        value={form.dateEnd}
        onChange={(e) => updateField('dateEnd', e.target.value)}
        disabled={isSaving}
        error={fieldErrors.dateEnd}
      />
    </Form>
  );
}
