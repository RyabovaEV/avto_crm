// RouteComments.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/cn';

type Comment = { id: number; text: string; times: string[] };

type Props = {
  comments: Comment[];
  isDisabled: boolean;
  deletingCommentId: number | null;
  editingCommentId: number | null;
  onEdit: (comment: Comment) => void;
  onDelete: (commentId: number) => void;
  renderEditForm: (comment: Comment) => React.ReactNode;
};

export function RouteComments({
  comments,
  isDisabled,
  deletingCommentId,
  editingCommentId,
  onEdit,
  onDelete,
  renderEditForm,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (comments.length === 0) return null;

  return (
    <div className="flex flex-col gap-1.5 pt-1">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors w-fit"
      >
        <ChevronDown
          size={12}
          className={cn('transition-transform', isExpanded && 'rotate-180')}
        />
        Примечания ({comments.length})
      </button>

      {isExpanded && (
        <div className="flex flex-col gap-2">
          {comments.map((comment) =>
            editingCommentId === comment.id ? (
              <div key={comment.id}>{renderEditForm(comment)}</div>
            ) : (
              <div
                key={comment.id}
                className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg p-2"
              >
                <div className="flex-1 min-w-0">
                  {comment.times.length > 0 && (
                    <span className="font-mono text-foreground mr-1">
                      {comment.times.join(', ')}:
                    </span>
                  )}
                  {comment.text}
                </div>
                <button
                  type="button"
                  onClick={() => onEdit(comment)}
                  disabled={isDisabled}
                  className="shrink-0 p-1 rounded hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                >
                  <Pencil size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(comment.id)}
                  disabled={isDisabled}
                  className="shrink-0 p-1 rounded hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                >
                  {deletingCommentId === comment.id ? (
                    '...'
                  ) : (
                    <Trash2 size={12} />
                  )}
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
