import { LucideIcon, Pencil, Trash2 } from 'lucide-react';
import { ReactNode } from 'react';

type EntityRowIcon =
  | { type: 'icon'; icon: LucideIcon }
  | { type: 'text'; text: string };

type Props = {
  icon: EntityRowIcon;
  isDisabled: boolean;
  isDeleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
  actions?: ReactNode;
  children: ReactNode;
};

export function EntityRow({
  icon,
  isDisabled,
  isDeleting,
  onEdit,
  onDelete,
  actions,
  children,
}: Props) {
  return (
    <div className="group flex items-top gap-3 px-4 py-3 rounded-xl border border-border bg-muted/50">
      {icon.type === 'icon' ? (
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <icon.icon size={16} />
        </div>
      ) : (
        <div className="min-w-9 h-9 px-2 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <span className="text-xs font-semibold whitespace-nowrap">
            {icon.text}
          </span>
        </div>
      )}
      <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
        {children}
      </div>

      {actions}

      <button
        type="button"
        onClick={onEdit}
        disabled={isDisabled}
        className="self-baseline p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-40 disabled:pointer-events-none"
      >
        <Pencil size={15} />
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={isDisabled}
        className="self-baseline p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-40 disabled:pointer-events-none"
      >
        {isDeleting ? (
          <span className="text-xs">...</span>
        ) : (
          <Trash2 size={15} />
        )}
      </button>
    </div>
  );
}
