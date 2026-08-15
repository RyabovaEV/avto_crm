'use client';

import { ErrorState } from '@/components/ui/';

export default function Error({ error }: { error: Error }) {
  return (
    <ErrorState
      error={error}
      description="Что-то пошло не так на нашей стороне. Мы уже работаем над устранением проблемы. Попробуйте обновить страницу или вернитесь позже."
      backHref="/schedule"
    />
  );
}
