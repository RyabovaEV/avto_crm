import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';
import { parseRequestBody, withApiErrorHandling } from '@/lib/api';
import { createRouteCommentSchema } from '@/lib/validation/routeComment';

export const POST = withApiErrorHandling(
  'POST route comment',
  'Не удалось сохранить примечание',
  async (request: Request) => {
    const parsed = await parseRequestBody(request, createRouteCommentSchema);
    if ('response' in parsed) return parsed.response;

    const route = await prisma.route.findUnique({
      where: { id: parsed.data.routeId },
    });
    if (!route) {
      return NextResponse.json(
        { fieldErrors: { routeId: 'Маршрут не найден' } },
        { status: 400 }
      );
    }

    const comment = await prisma.routeComment.create({ data: parsed.data });

    return NextResponse.json(comment);
  }
);
