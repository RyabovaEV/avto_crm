import { useId } from 'react';
import { Button } from './Button';
import { type LucideIcon } from 'lucide-react';

type SectionProps = {
  title: string;
  buttonLabel?: string;
  buttonIcon?: LucideIcon;
  onButtonClick?: () => void;
  buttonDisabled?: boolean;
  children: React.ReactNode;
};

export function Section({
  title,
  buttonLabel,
  buttonIcon,
  onButtonClick,
  buttonDisabled,
  children,
}: SectionProps) {
  const titleId = useId();
  return (
    <section
      aria-labelledby={titleId}
      className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-10"
    >
      <header className="flex align-items justify-between gap-4 flex-wrap">
        <h2 id={titleId} className="font-bold text-foreground">
          {title}
        </h2>
        {buttonLabel && (
          <Button
            mode="outline"
            icon={buttonIcon}
            onClick={onButtonClick}
            disabled={buttonDisabled}
          >
            {buttonLabel}
          </Button>
        )}
      </header>

      <div className="space-y-3">{children}</div>
    </section>
  );
}
