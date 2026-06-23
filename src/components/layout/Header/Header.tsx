type HeaderProps = {
  title: string;
  description?: string;
};

export function Header({ title, description }: HeaderProps) {
  return (
    <header className="h-14 flex items-center justify-between px-6 bg-card border-b border-border flex-shrink-0 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-px h-6 bg-primary/30 rounded-full" />
        <div>
          <h1 className="text-base font-semibold text-foreground leading-tight">
            {title}
          </h1>
          <p className="text-xs text-muted-foreground leading-tight">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-xs text-muted-foreground font-mono hidden sm:block">
          {new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </div>
      </div>
    </header>
  );
}
