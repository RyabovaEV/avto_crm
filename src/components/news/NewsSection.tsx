'use client';

import { Plus } from 'lucide-react';
import { Section } from '../ui';
import { News } from '@/generated/prisma/client';
import { newsSchema } from '@/lib/validation/news';
import { useEditableList } from '@/hooks/useEditableList';
import { NewsFormCard } from './NewsFormCard';
import { NewsRow } from './NewsRow';

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
        {state.mode === 'creating' && (
          <NewsFormCard
            title="Новая новость"
            form={state.form}
            fieldErrors={fieldErrors}
            submitError={submitError}
            isSaving={isSaving}
            onChange={updateForm}
            onSave={handleSave}
            onCancel={cancel}
          />
        )}

        {news.length === 0 && state.mode !== 'creating' && (
          <p className="text-sm text-muted-foreground">Телефоны не добавлены</p>
        )}

        {news.map((newsItem) =>
          state.mode === 'editing' && state.id === newsItem.id ? (
            <NewsFormCard
              key={newsItem.id}
              title="Редактирование новости"
              form={state.form}
              fieldErrors={fieldErrors}
              submitError={submitError}
              isSaving={isSaving}
              onChange={updateForm}
              onSave={handleSave}
              onCancel={cancel}
            />
          ) : (
            <NewsRow
              key={newsItem.id}
              newsItem={newsItem}
              isDisabled={isFormOpen || deletingId !== null}
              isDeleting={deletingId === newsItem.id}
              onEdit={() => startEdit(newsItem)}
              onDelete={() => handleDelete(newsItem.id)}
            />
          )
        )}
      </div>
    </Section>
  );
}
