import { NewsFormInput } from '@/lib/validation/news';
import { Button, Checkbox, Input, MarkdownEditor } from '../ui';
import { Check, X } from 'lucide-react';

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
      <div className="flex flex-col align-baseline gap-4">
        <Input
          label="Дата новости"
          type="date"
          value={form.date}
          onChange={(e) => onChange('date', e.target.value)}
          disabled={isSaving}
          error={fieldErrors.date}
          className=""
        />

        <MarkdownEditor
          label="Текст новости"
          value={form.news}
          onChange={(v) => onChange('news', v)}
          placeholder="Введите текст новости"
          error={fieldErrors.news}
          disabled={isSaving}
        />

        <Checkbox
          label="Важная новость"
          checked={form.isMain}
          onChange={(checked) => onChange('isMain', checked)}
          disabled={isSaving}
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
