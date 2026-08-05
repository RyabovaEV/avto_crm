import { SectionSkeleton } from '@/components/ui';

export default function LoadingSettings() {
  return (
    <>
      {/* Header skeleton */}
      <header className="h-14 flex items-center px-6 bg-card border-b border-border shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-px h-6 bg-primary/30 rounded-full" />
          <div className="flex flex-col gap-1.5">
            <div className="h-4 w-24 rounded bg-muted animate-pulse" />
            <div className="h-3 w-40 rounded bg-muted animate-pulse" />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 sm:p-10 flex flex-col gap-4">
        {/* Организация */}
        <SectionSkeleton fieldCount={6} />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 items-start">
          {/* Страхование */}
          <SectionSkeleton fieldCount={4} />

          {/* Телефоны */}
          <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-10">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="h-4 w-20 rounded bg-muted animate-pulse" />
              <div className="h-9 w-40 rounded-lg bg-muted animate-pulse" />
            </div>
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-muted/50"
                >
                  <div className="w-9 h-9 rounded-lg bg-muted animate-pulse shrink-0" />
                  <div className="flex-1 h-4 rounded bg-muted animate-pulse" />
                  <div className="w-6 h-6 rounded bg-muted animate-pulse" />
                  <div className="w-6 h-6 rounded bg-muted animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
