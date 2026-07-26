import { CompanyPhone } from '@/generated/prisma/client';
import { Phone, Pencil, Trash2 } from 'lucide-react';

type Props = {
  phone: CompanyPhone;
  isDisabled: boolean;
  isDeleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export function PhoneRow({
  phone,
  isDisabled,
  isDeleting,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-muted/50">
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
        onClick={onEdit}
        disabled={isDisabled}
        className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-40 disabled:pointer-events-none"
      >
        <Pencil size={15} />
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={isDisabled}
        className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-40 disabled:pointer-events-none"
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
