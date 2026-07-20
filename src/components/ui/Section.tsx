import { useId } from 'react';

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export function Section({ title, children }: SectionProps) {
  const titleId = useId();
  return (
    <section
      aria-labelledby={titleId}
      className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-10"
    >
      <h2 id={titleId} className="font-bold text-foreground">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
