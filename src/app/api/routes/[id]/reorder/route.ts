import { withApiErrorHandling } from '@/lib/api';
import { prisma } from '@/lib/db';
import { parseRouteContext } from '@/lib/validation/route';
import { NextResponse } from 'next/server';
import zod from 'zod';

type Params = { params: Promise<{ id: string }> };

const reorderSchema = zod.object({
  direction: zod.enum(['up', 'down']),
});

export const PATCH = withApiErrorHandling(
  'PATCH route reorder',
  'Не удалось изменить порядок',
  async (request: Request, { params }: Params) => {
    const { id } = await params;
    const routeId = Number(id);

    const context = parseRouteContext(request.url);
    if (!context.success) {
      return NextResponse.json(
        { error: 'Некорректный сезон или тип маршрута' },
        { status: 400 }
      );
    }

    const body = reorderSchema.safeParse(await request.json());
    if (!body.success) {
      return NextResponse.json(
        { error: 'Некорректное направление' },
        { status: 400 }
      );
    }

    const current = await prisma.route.findUnique({ where: { id: routeId } });
    if (
      !current ||
      current.seasonId !== context.data.seasonId ||
      current.type !== context.data.type
    ) {
      return NextResponse.json({ error: 'Маршрут не найден' }, { status: 404 });
    }

    const neighbor = await prisma.route.findFirst({
      where: {
        ...context.data,
        order:
          body.data.direction === 'up'
            ? { lt: current.order }
            : { gt: current.order },
      },
      orderBy: { order: body.data.direction === 'up' ? 'desc' : 'asc' },
    });

    if (!neighbor) {
      return NextResponse.json({ success: true });
    }

    await prisma.$transaction([
      prisma.route.update({
        where: { id: current.id },
        data: { order: neighbor.order },
      }),
      prisma.route.update({
        where: { id: neighbor.id },
        data: { order: current.order },
      }),
    ]);

    return NextResponse.json({ success: true });
  }
);
