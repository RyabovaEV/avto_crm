'use client';

import { Download } from 'lucide-react';
import { useState } from 'react';
import { Button } from './Button';

type ExportButtonProps = {
  endpoint: string;
  filename: string;
  label?: string;
  className?: string;
};

export function ExportButton({
  endpoint,
  filename,
  label = 'Выгрузить',
  className,
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleExport() {
    setIsExporting(true);
    setError(null);
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Ошибка выгрузки');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setError('Не удалось выгрузить данные');
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        mode="ghost"
        icon={Download}
        onClick={handleExport}
        disabled={isExporting}
        className={className}
      >
        {isExporting ? 'Выгрузка...' : label}
      </Button>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
