import { cn } from '@/lib/cn';

type CheckboxProps = {
  label?: string;
  className?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
  required?: boolean;
  error?: string; // текст ошибки под чекбоксом
};

export function Checkbox({
  label,
  className,
  checked,
  onChange,
  disabled,
  id,
  name,
  required,
  error,
}: CheckboxProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label
        htmlFor={id}
        className={cn(
          'flex items-center gap-2 cursor-pointer select-none',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          required={required}
          className="accent-blue-600 w-3.5 h-3.5 rounded"
        />

        {label && (
          <span className="flex items-center gap-2 text-sm cursor-pointer text-muted-foreground">
            {label}
            {required && <span className="text-destructive ml-0.5">*</span>}
          </span>
        )}
      </label>

      {error && <p className="text-xs text-destructive pl-6">{error}</p>}
    </div>
  );
}
