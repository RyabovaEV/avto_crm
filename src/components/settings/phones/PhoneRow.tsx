import { EntityRow } from '@/components/ui';
import { CompanyPhone } from '@/generated/prisma/client';
import { Phone } from 'lucide-react';

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
    <EntityRow
      icon={{ type: 'icon', icon: Phone }}
      isDisabled={isDisabled}
      isDeleting={isDeleting}
      onEdit={onEdit}
      onDelete={onDelete}
    >
      <span className="text-sm font-medium text-foreground">{phone.phone}</span>
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
    </EntityRow>
  );
}
