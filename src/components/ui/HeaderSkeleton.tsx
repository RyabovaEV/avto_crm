type HeaderSkeletonProps = {
  titleWidth?: string;
  descriptionWidth?: string;
};

export function HeaderSkeleton({
  titleWidth = 'w-24',
  descriptionWidth = 'w-40',
}: HeaderSkeletonProps) {
  return (
    <header className="h-14 flex items-center px-6 bg-card border-b border-border shrink-0 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-px h-6 bg-primary/30 rounded-full" />
        <div className="flex flex-col gap-1.5">
          <div className={`h-4 ${titleWidth} rounded bg-muted animate-pulse`} />
          <div
            className={`h-3 ${descriptionWidth} rounded bg-muted animate-pulse`}
          />
        </div>
      </div>
    </header>
  );
}
