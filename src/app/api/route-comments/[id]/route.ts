import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';
import { parseRequestBody, withApiErrorHandling } from '@/lib/api';
import { updateRouteCommentSchema } from '@/lib/validation/routeComment';

type Params = { params: Promise<{ id: string }> };

export const PATCH = withApiErrorHandling(
  'PATCH route comment',
  'Не удалось обновить примечание',
  async (request: Request, { params }: Params) => {
    const { id } = await params;
    const commentId = Number(id);

    const parsed = await parseRequestBody(request, updateRouteCommentSchema);
    if ('response' in parsed) return parsed.response;

    const comment = await prisma.routeComment.update({
      where: { id: commentId },
      data: parsed.data,
    });

    return NextResponse.json(comment);
  }
);

export const DELETE = withApiErrorHandling(
  'DELETE route comment',
  'Не удалось удалить примечание',
  async (_request: Request, { params }: Params) => {
    const { id } = await params;
    await prisma.routeComment.delete({ where: { id: Number(id) } });

    return NextResponse.json({ success: true });
  }
);
