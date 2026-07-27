'use client';

import { CompanyPhone } from '@/generated/prisma/client';
import { Section } from '../../ui';
import { Plus } from 'lucide-react';
import { phoneSchema, PhoneFormInput } from '@/lib/validation/phone';
import { useEditableList } from '@/hooks/useEditableList';
import { PhoneFormCard } from './PhoneFormCard';
import { PhoneRow } from './PhoneRow';

type Props = {
  initialData: CompanyPhone[];
};

const emptyForm: PhoneFormInput = { phone: '', label: '', signature: '' };

export function PhonesSection({ initialData }: Props) {
  const {
    items: phones,
    state,
    fieldErrors,
    submitError,
    isSaving,
    deletingId,
    isFormOpen,
    startCreate,
    startEdit,
    cancel,
    updateForm,
    handleSave,
    handleDelete,
  } = useEditableList<CompanyPhone, typeof phoneSchema>({
    initialData,
    endpoint: '/api/phones',
    schema: phoneSchema,
    emptyForm,
    toFormInput: (phone) => ({
      phone: phone.phone,
      label: phone.label ?? '',
      signature: phone.signature ?? '',
    }),
  });

  return (
    <Section
      title="Телефоны"
      buttonLabel="Добавить телефон"
      buttonIcon={Plus}
      onButtonClick={startCreate}
      buttonDisabled={isFormOpen}
    >
      <div className="flex flex-col gap-3">
        {state.mode === 'creating' && (
          <PhoneFormCard
            title="Новый телефон"
            form={state.form}
            fieldErrors={fieldErrors}
            submitError={submitError}
            isSaving={isSaving}
            onChange={updateForm}
            onSave={handleSave}
            onCancel={cancel}
          />
        )}

        {phones.length === 0 && state.mode !== 'creating' && (
          <p className="text-sm text-muted-foreground">Телефоны не добавлены</p>
        )}

        {phones.map((phone) =>
          state.mode === 'editing' && state.id === phone.id ? (
            <PhoneFormCard
              key={phone.id}
              title="Редактирование телефона"
              form={state.form}
              fieldErrors={fieldErrors}
              submitError={submitError}
              isSaving={isSaving}
              onChange={updateForm}
              onSave={handleSave}
              onCancel={cancel}
            />
          ) : (
            <PhoneRow
              key={phone.id}
              phone={phone}
              isDisabled={isFormOpen || deletingId !== null}
              isDeleting={deletingId === phone.id}
              onEdit={() => startEdit(phone)}
              onDelete={() => handleDelete(phone.id)}
            />
          )
        )}
      </div>
    </Section>
  );
}
