export default function LoadingSchedule() {
  return (
    <>
      {/* Header skeleton */}
      <header className="h-14 flex items-center px-6 bg-card border-b border-border shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-px h-6 bg-primary/30 rounded-full" />
          <div className="flex flex-col gap-1.5">
            <div className="h-4 w-28 rounded bg-muted animate-pulse" />
            <div className="h-3 w-56 rounded bg-muted animate-pulse" />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 sm:p-10 flex flex-col gap-4">
        {/* RouteTypeTabs skeleton */}
        <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-muted w-fit">
          <div className="h-9 w-36 rounded-lg bg-card animate-pulse" />
          <div className="h-9 w-32 rounded-lg bg-muted animate-pulse" />
        </div>

        {/* Seasons (Accordion) skeleton */}
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between gap-3 px-6 py-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-muted animate-pulse shrink-0" />
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-36 rounded bg-muted animate-pulse" />
                    <div className="h-4 w-6 rounded-md bg-muted animate-pulse" />
                  </div>
                </div>
                <div className="w-4 h-4 rounded bg-muted animate-pulse shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
