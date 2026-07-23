'use client';

import { CompanyPhone } from '@/generated/prisma/client';
import { PhoneFormInput, phoneSchema } from '@/lib/validation/phone';
import { useState } from 'react';
import { Button, Input } from '../ui';
import { Check, Pencil, Phone, Plus, Trash2, X } from 'lucide-react';

type Props = {
  initialData: CompanyPhone[];
};

type EditingState =
  | { mode: 'idle' }
  | { mode: 'creating'; form: PhoneFormInput }
  | { mode: 'editing'; id: number; form: PhoneFormInput };

const emptyForm: PhoneFormInput = {
  phone: '',
  label: '',
  signature: '',
};

export function PhoneSection({ initialData }: Props) {
  const [phones, setPhones] = useState(initialData);
  const [state, setState] = useState<EditingState>({ mode: 'idle' });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof PhoneFormInput, string>>
  >({});
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const isFormOpen = state.mode !== 'idle';

  function startCreate() {
    setState({ mode: 'creating', form: emptyForm });
    setFieldErrors({});
  }

  function startEdit(phone: CompanyPhone) {
    setState({
      mode: 'editing',
      id: phone.id,
      form: {
        phone: phone.phone,
        label: phone.label ?? '',
        signature: phone.signature ?? '',
      },
    });
    setFieldErrors({});
  }

  function cancel() {
    setState({ mode: 'idle' });
    setFieldErrors({});
  }

  function updateForm(key: keyof PhoneFormInput, value: string) {
    if (state.mode === 'idle') return;
    setState({ ...state, form: { ...state.form, [key]: value } });
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSave() {
    if (state.mode === 'idle') return;

    const result = phoneSchema.safeParse(state.form);
    if (!result.success) {
      const errors: Partial<Record<keyof PhoneFormInput, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof PhoneFormInput;
        if (!errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    setIsSaving(true);
    try {
      if (state.mode === 'creating') {
        const response = await fetch('/api/phones', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state.form),
        });
        if (!response.ok) throw new Error();
        const created: CompanyPhone = await response.json();
        setPhones((prev) => [...prev, created]);
      } else {
        const response = await fetch(`/api/phones/${state.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state.form),
        });
        if (!response.ok) throw new Error();
        const updated: CompanyPhone = await response.json();
        setPhones((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
      }
      setState({ mode: 'idle' });
    } catch {
      setFieldErrors({ phone: 'Ошибка сохранения данных' });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: number) {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/phones/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error();
      setPhones((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert('Ошибка удаления данных');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {state.mode === 'creating' && (
        <PhoneFormCard
          title="Новый телефон"
          form={state.form}
          fieldErrors={fieldErrors}
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
            isSaving={isSaving}
            onChange={updateForm}
            onSave={handleSave}
            onCancel={cancel}
          />
        ) : (
          <div
            key={phone.id}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-muted/50"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Phone size={16} />
            </div>
            <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-foreground">
                {phone.phone}
              </span>
              {phone.label && (
                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                  {phone.label}
                </span>
              )}
              {phone.signature && (
                <span className="px-1.5 py-0.5 rounded text-muted-foreground text-xs font-mono bg-muted">
                  {phone.signature}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => startEdit(phone)}
              disabled={isFormOpen || deletingId !== null}
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
              <Pencil size={15} />
            </button>
            <button
              type="button"
              onClick={() => handleDelete(phone.id)}
              disabled={isFormOpen || deletingId !== null}
              className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
              {deletingId === phone.id ? (
                <span className="text-xs">...</span>
              ) : (
                <Trash2 size={15} />
              )}
            </button>
          </div>
        )
      )}

      {!isFormOpen && (
        <Button
          mode="outline"
          type="button"
          className="self-start px-4"
          onClick={startCreate}
        >
          <Plus size={15} /> Добавить телефон
        </Button>
      )}
    </div>
  );
}

type PhoneFormCardProps = {
  title: string;
  form: PhoneFormInput;
  fieldErrors: Partial<Record<keyof PhoneFormInput, string>>;
  isSaving: boolean;
  onChange: (key: keyof PhoneFormInput, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

function PhoneFormCard({
  title,
  form,
  fieldErrors,
  isSaving,
  onChange,
  onSave,
  onCancel,
}: PhoneFormCardProps) {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl border border-primary/40 bg-primary/5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          <X size={16} />
        </button>
      </div>

      <Input
        label="Номер телефона"
        placeholder="8 (0000) 00-00-00"
        value={form.phone}
        onChange={(e) => onChange('phone', e.target.value)}
        disabled={isSaving}
        error={fieldErrors.phone}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Название"
          placeholder="Диспетчер"
          value={form.label ?? ''}
          onChange={(e) => onChange('label', e.target.value)}
          disabled={isSaving}
          error={fieldErrors.label}
        />
        <Input
          label="Код (для выборки)"
          placeholder="DISP"
          value={form.signature ?? ''}
          onChange={(e) => onChange('signature', e.target.value)}
          disabled={isSaving}
          error={fieldErrors.signature}
        />
      </div>

      <div className="flex items-center gap-4 pt-1">
        <Button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="px-6 py-2"
        >
          <Check size={15} /> {isSaving ? 'Сохранение...' : 'Сохранить'}
        </Button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          Отмена
        </button>
      </div>
    </div>
  );
}
