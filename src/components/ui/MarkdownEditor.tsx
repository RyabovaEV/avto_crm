'use client';

import { cn } from '@/lib/cn';
import MDEditor from '@uiw/react-md-editor';
import { useId } from 'react';

type MarkdownEditorProps = {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string | null;
  className?: string;
  height?: number;
};

export function MarkdownEditor({
  label,
  value,
  onChange,
  placeholder,
  disabled,
  error,
  className,
  height,
}: MarkdownEditorProps) {
  const id = useId();
  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-muted-foreground transition-colors cursor-pointer pointer-events-none text-sm"
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          'w-full rounded-lg border border-border overflow-hidden',
          'focus-within:ring-1 focus-within:ring-ring transition-shadow',
          disabled && 'opacity-50 pointer-events-none',
          error && 'border-destructive focus-within:ring-destructive',
          className
        )}
      >
        <MDEditor
          value={value}
          onChange={(v) => onChange?.(v ?? '')}
          height={height ?? 200}
          preview="edit"
          aria-placeholder={placeholder}
          //className="!border-none !shadow-none !bg-transparent"
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
