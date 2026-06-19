import { cn } from '@/lib/cn'
import { type LucideIcon } from 'lucide-react'

type InputProps = {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search'
  className?: string
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  autoComplete?: string
  /** иконка слева статика */
  icon?: LucideIcon
  disabled?: boolean
  /**иконка справа с функцией */
  rightIcon?: LucideIcon     
  onRightIconClick?: () => void 
}

export function Input({
  type = 'text',
  className,
  placeholder,
  value,
  onChange,
  autoComplete,
  icon: Icon,
  disabled,
  rightIcon: RightIcon,
  onRightIconClick,
}: InputProps) {
  return (
    <div className="relative w-full">

      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          <Icon size={15} />
        </div>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        className={cn(
          'w-full pr-4 py-2.5 rounded-lg border border-border',
          'bg-white text-foreground text-sm',
          'focus:outline-none focus:ring-2 focus:ring-ring transition-shadow',
          'placeholder:text-muted-foreground',
          'disabled:opacity-50 disabled:pointer-events-none',
          Icon ? 'pl-10' : 'pl-4',
          RightIcon ? 'pr-10' : 'pr-4',
          className,
        )}
      />

      {/* Иконка справа — кнопка если передан onRightIconClick */}
      {RightIcon && (
        onRightIconClick ? (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <RightIcon size={15} />
          </button>
        ) : (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <RightIcon size={15} />
          </div>
        )
      )}
    </div>
  )
}