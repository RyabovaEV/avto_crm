import { cn } from "@/lib/cn"

type ButtonMode = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'

type ButtonProps = {
  mode?: ButtonMode
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  children: React.ReactNode
}

const modeStyles: Record<ButtonMode, string> = {
  primary:     'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary:   'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline:     'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
  ghost:       'hover:bg-accent hover:text-accent-foreground',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
}

export function Button({
  mode = 'primary',
  type = 'button',
  className,
  onClick,
  disabled,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        // базовые стили всегда
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        // стили по mode
        modeStyles[mode],
        // кастомные стили конкретной кнопки
        className,
      )}
    >
      {children}
    </button>
  )
}