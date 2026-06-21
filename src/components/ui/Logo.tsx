import { cn } from '@/lib/cn';
import { Bus } from 'lucide-react';

type LogoProps = {
  small?: boolean;
};

export function Logo({ small = false }: LogoProps) {
  const size = small ? 24 : 28;

  return (
    <>
      <div
        className={cn(
          'bg-blue-400/20 rounded-2xl flex items-center justify-center border border-blue-400/30',
          small ? 'w-12 h-12' : 'w-14 h-14'
        )}
      >
        <Bus size={size} className="text-blue-300" />
      </div>
      <div>
        <div
          className={cn(
            'text-white font-bold tracking-tight',
            small ? 'text-xl' : 'text-2xl'
          )}
        >
          ООО &quot;Авто&quot;
        </div>
        <div className="text-blue-300 text-sm">Транспортное предприятие</div>
      </div>
    </>
  );
}
