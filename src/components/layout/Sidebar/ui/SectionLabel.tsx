interface SectionLabelProps {
  label: string;
}

export function SectionLabel({ label }: SectionLabelProps) {
  return (
    <div className="text-xs font-mono text-sidebar-foreground/40 uppercase tracking-widest px-2 mb-3">
      {label}
    </div>
  );
}
