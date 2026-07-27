type SectionSkeletonProps = {
  fieldCount?: number;
};

export function SectionSkeleton({ fieldCount = 4 }: SectionSkeletonProps) {
  return (
    <section className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-10">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="h-4 w-40 rounded bg-muted animate-pulse" />
      </div>
      <div className="flex flex-col gap-5">
        {Array.from({ length: fieldCount }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="h-3 w-24 rounded bg-muted animate-pulse" />
            <div className="h-10 w-full rounded-lg bg-muted animate-pulse" />
          </div>
        ))}
        <div className="self-end h-10 w-32 rounded-lg bg-muted animate-pulse" />
      </div>
    </section>
  );
}
