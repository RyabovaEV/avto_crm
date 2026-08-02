import { Input, Button } from '../ui';
import { X, Check } from 'lucide-react';
import { PhoneFormInput } from '@/lib/validation/phone';

type Props = {
  title: string;
  form: PhoneFormInput;
  fieldErrors: Partial<Record<keyof PhoneFormInput, string>>;
  submitError: string | null;
  isSaving: boolean;
  onChange: <K extends keyof PhoneFormInput>(
    key: K,
    value: PhoneFormInput[K]
  ) => void;
  onSave: () => void;
  onCancel: () => void;
};

export function PhoneFormCard({
  title,
  form,
  fieldErrors,
  submitError,
  isSaving,
  onChange,
  onSave,
  onCancel,
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
      className="flex flex-col gap-4 p-4 rounded-xl border border-primary/40"
    >
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

      {submitError && <p className="text-sm text-destructive">{submitError}</p>}

      <div className="flex items-center gap-4 pt-1">
        <Button
          type="submit"
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
    </form>
  );
}
