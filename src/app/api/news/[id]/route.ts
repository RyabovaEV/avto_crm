import { parseRequestBody, withApiErrorHandling } from '@/lib/api';
import { prisma } from '@/lib/db';
import { newsSchema } from '@/lib/validation/news';
import { NextResponse } from 'next/server';

type Params = { params: Promise<{ id: string }> };

export const PATCH = withApiErrorHandling(
  'PATCH news',
  'Не удалось обновить данные',
  async (request: Request, { params }: Params) => {
    const { id } = await params;
    const parsed = await parseRequestBody(request, newsSchema);
    if ('response' in parsed) return parsed.response;

    const news = await prisma.news.update({
      where: { id: Number(id) },
      data: parsed.data,
    });

    return NextResponse.json(news);
  }
);

export const DELETE = withApiErrorHandling(
  'DELETE news',
  'Не удалось удалить данные',
  async (_request: Request, { params }: Params) => {
    const { id } = await params;
    await prisma.news.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  }
);
