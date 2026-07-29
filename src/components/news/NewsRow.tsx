import { News } from '@/generated/prisma/client';
import { EntityRow } from '../ui';
import { Newspaper } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';

type Props = {
  newsItem: News;
  isDisabled: boolean;
  isDeleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export function NewsRow({
  newsItem,
  isDisabled,
  isDeleting,
  onEdit,
  onDelete,
}: Props) {
  return (
    <EntityRow
      icon={{ type: 'icon', icon: Newspaper }}
      isDisabled={isDisabled}
      isDeleting={isDeleting}
      onEdit={onEdit}
      onDelete={onDelete}
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">
            {new Date(newsItem.date).toLocaleDateString('ru-RU')}
          </span>
          {newsItem.isMain && (
            <span className="px-2 py-0.5 rounded-md bg-destructive text-destructive-foreground text-xs font-medium">
              Важно
            </span>
          )}
        </div>
        <div className="text-sm text-foreground">
          <MDEditor.Markdown source={newsItem.news} />
        </div>
      </div>
    </EntityRow>
  );
}
