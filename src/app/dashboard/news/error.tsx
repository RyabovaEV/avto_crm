'use client';

import { AlertCircle, ArrowRight, Check, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Error({ error }: { error: Error }) {
  const [copying, setCopying] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(error.message).catch(() => {});
    setCopying(true);
    setTimeout(() => setCopying(false), 1500);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="relative mb-8 select-none">
          <span className="text-[160px] font-bold leading-none text-destructive/10 dark:text-foreground/10 block">
            500
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-destructive rounded-2xl flex items-center justify-center shadow-lg">
              <AlertCircle size={36} className="text-destructive-foreground" />
            </div>
          </div>
        </div>

        <div className="w-12 h-1 bg-destructive rounded-full mx-auto mb-5" />
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Произошла ошибка сервера
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Не удалось загрузить новости. Мы уже работаем над устранением
          проблемы. Попробуйте обновить страницу или вернитесь позже.
        </p>

        <button
          onClick={copy}
          className="inline-flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-lg text-xs font-mono text-muted-foreground hover:border-primary hover:text-primary transition-colors mb-8 mx-auto"
        >
          <span className="text-muted-foreground/70">Код ошибки:</span>
          <span className="text-foreground font-semibold">{error.message}</span>
          {copying ? (
            <Check size={12} className="text-chart-5" />
          ) : (
            <ExternalLink size={12} />
          )}
        </button>

        <div className="bg-muted border border-border rounded-2xl p-5 text-left mb-8">
          <p className="text-xs font-semibold text-foreground mb-3">
            Что можно сделать:
          </p>
          <ul className="space-y-2">
            {[
              'Обновить страницу (F5 или Ctrl+R)',
              'Очистить кэш браузера и попробовать снова',
              'Подождать несколько минут — проблема может быть временной',
            ].map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <Check size={13} className="text-primary mt-0.5 shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg transition-colors shadow-sm"
          >
            <ArrowRight size={18} /> Обновить страницу
          </button>
          <Link
            href={'/dashboard/news'}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold bg-card hover:bg-muted text-foreground border border-border rounded-lg transition-colors shadow-sm"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
