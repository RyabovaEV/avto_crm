import { NewsFormInput } from '@/lib/validation/news';
import { Button, Checkbox, Input } from '../ui';
import { Check } from 'lucide-react';

type Props = {
  title: string;
  form: NewsFormInput;
  fieldErrors: Partial<Record<keyof NewsFormInput, string>>;
  submitError: string | null;
  isSaving: boolean;
  onChange: <K extends keyof NewsFormInput>(
    key: K,
    value: NewsFormInput[K]
  ) => void;
  onSave: () => void;
  onCancel: () => void;
};

export function NewsFormCard({
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
        label="Дата новости"
        type="date"
        value={form.date}
        onChange={(e) => onChange('date', e.target.value)}
        disabled={isSaving}
        error={fieldErrors.date}
      />

      <Input
        label="Заголовок новости"
        value={form.news}
        onChange={(e) => onChange('news', e.target.value)}
        disabled={isSaving}
        error={fieldErrors.news}
      />

      <div className="flex items-center gap-4 pt-1">
        <Button
          type="submit"
          disabled={isSaving}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isSaving ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
}
