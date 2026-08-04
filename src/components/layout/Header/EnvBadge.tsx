const isDev = process.env.NODE_ENV !== 'production';

export function EnvBadge() {
  return (
    <span
      className={
        isDev
          ? 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/15 text-amber-600 border border-amber-500/30'
          : 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/15 text-emerald-600 border border-emerald-500/30'
      }
    >
      <span
        className={
          isDev
            ? 'w-1.5 h-1.5 rounded-full bg-amber-500'
            : 'w-1.5 h-1.5 rounded-full bg-emerald-500'
        }
      />
      {isDev ? 'DEV' : 'PROD'}
    </span>
  );
}
