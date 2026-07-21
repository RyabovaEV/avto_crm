import { Button } from './Button';
import { Check } from 'lucide-react';

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  isSaving?: boolean;
  error?: string | null;
  success?: boolean;
};

export function Form({
  children,
  isSaving,
  error,
  success,
  ...props
}: FormProps) {
  return (
    <form {...props} className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        {children}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
      <Button className="self-end" type="submit" disabled={isSaving}>
        {isSaving ? (
          'Сохранение...'
        ) : success ? (
          <>
            <Check size={16} /> Сохранено!
          </>
        ) : (
          'Сохранить'
        )}
      </Button>
    </form>
  );
}
