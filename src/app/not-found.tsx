import { FileQuestion, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="relative mb-8 select-none">
          <span className="text-[160px] font-bold leading-none text-primary/10 block">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <FileQuestion size={36} className="text-primary-foreground" />
            </div>
          </div>
        </div>

        <div className="w-12 h-1 bg-primary rounded-full mx-auto mb-5" />
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Страница не найдена
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          Возможно, страница была перемещена или удалена, либо вы перешли по
          неверной ссылке.
        </p>

        <Link
          href="/settings"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold bg-primary hover:bg-hover text-primary-foreground rounded-lg transition-colors shadow-sm"
        >
          <ArrowRight size={18} /> На главную
        </Link>
      </div>
    </div>
  );
}
