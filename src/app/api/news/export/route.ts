import { withApiErrorHandling } from '@/lib/api';
import { prisma } from '@/lib/db';
import { buildJsonFileContent } from '@/lib/toJsonFile';
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

    const content = buildJsonFileContent(data);

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': 'attachment; filename="news.json"',
      },
    });
  }
);
