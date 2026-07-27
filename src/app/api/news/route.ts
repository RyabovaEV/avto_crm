import { parseRequestBody, withApiErrorHandling } from '@/lib/api';
import { prisma } from '@/lib/db';
import { newsSchema } from '@/lib/validation/news';
import { NextResponse } from 'next/server';

export const GET = withApiErrorHandling(
  'GET news',
  'Не удалось загрузить данные',
  async () =>
    NextResponse.json(await prisma.news.findMany({ orderBy: { date: 'desc' } }))
);

export const POST = withApiErrorHandling(
  'POST news',
  'Не удалось сохранить данные',
  async (request: Request) => {
    const parsed = await parseRequestBody(request, newsSchema);
    if ('response' in parsed) return parsed.response;

    const news = await prisma.news.create({
      data: parsed.data,
    });

    return NextResponse.json(news);
  }
);
