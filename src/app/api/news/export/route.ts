import { withApiErrorHandling } from '@/lib/api';
import { prisma } from '@/lib/db';
import { buildTsFileContent } from '@/lib/export/toTsFile';
import { NextResponse } from 'next/server';

export const GET = withApiErrorHandling(
  'GET news export',
  'Не удалось выгрузить данные',
  async () => {
    const news = await prisma.news.findMany({ orderBy: { date: 'desc' } });

    const data = news.map((n) => ({
      id: n.id,
      date: n.date.toISOString(),
      news: n.news,
      isMain: n.isMain,
    }));

    const typeDeclaration = `export type NewsData = {
  id: number;
  /** ISO 8601 */
  date: string;
  news: string;
  isMain: boolean;
};`;

    const content = buildTsFileContent({
      varName: 'news',
      typeName: 'NewsData[]',
      typeDeclaration,
      data,
    });

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'application/typescript; charset=utf-8',
        'Content-Disposition': 'attachment; filename="news.ts"',
      },
    });
  }
);
