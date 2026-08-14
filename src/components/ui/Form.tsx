import { ReactNode } from 'react';
import { Button } from './Button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  isSaving?: boolean;
  error?: string | null;
  success?: boolean;
  secondaryAction?: ReactNode;
};

export function Form({
  children,
  isSaving,
  error,
  success,
  secondaryAction,
  ...props
}: FormProps) {
  return (
    <form {...props} className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        {children}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
      <div
        className={cn(
          'flex items-center',
          secondaryAction ? 'justify-between' : 'justify-end'
        )}
      >
        {secondaryAction}
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
      </div>
    </form>
  );
}
