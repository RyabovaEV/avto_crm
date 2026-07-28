'use client';

import { Plus } from 'lucide-react';
import { Section } from '../ui';
import { News } from '@/generated/prisma/client';
import { newsSchema } from '@/lib/validation/news';
import { useEditableList } from '@/hooks/useEditableList';

type Props = {
  initialData: News[];
};

const emptyForm = { date: '', news: '', isMain: false };

export default function NewsSection({ initialData }: Props) {
  const {
    items: news,
    state,
    fieldErrors,
    submitError,
    isSaving,
    deletingId,
    isFormOpen,
    startCreate,
    startEdit,
    cancel,
    updateForm,
    handleSave,
    handleDelete,
  } = useEditableList<News, typeof newsSchema>({
    initialData,
    endpoint: '/api/news',
    schema: newsSchema,
    emptyForm,
    toFormInput: (news) => ({
      date: news.date.toISOString().split('T')[0],
      news: news.news,
      isMain: news.isMain ?? false,
    }),
  });

  return (
    <Section
      title="Новости"
      buttonLabel="Добавить новость"
      buttonIcon={Plus}
      onButtonClick={startCreate}
      buttonDisabled={isFormOpen}
    >
      <div className="flex flex-col gap-3">
        {news.length === 0 && state.mode !== 'creating' && (
          <div className="text-sm text-muted-foreground">
            Новостей пока нет. Добавьте первую новость.
          </div>
        )}
      </div>
    </Section>
  );
}
