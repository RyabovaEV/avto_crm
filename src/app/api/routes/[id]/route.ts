import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';
import { parseRequestBody, withApiErrorHandling } from '@/lib/api';
import {
  parseRouteContext,
  routeWithDeparturesSchema,
} from '@/lib/validation/route';

type Params = { params: Promise<{ id: string }> };

async function findOwnedRoute(
  routeId: number,
  context: { type: string; seasonId: number }
) {
  const route = await prisma.route.findUnique({ where: { id: routeId } });
  if (
    !route ||
    route.seasonId !== context.seasonId ||
    route.type !== context.type
  ) {
    return null;
  }
  return route;
}

export const PATCH = withApiErrorHandling(
  'PATCH route',
  'Не удалось обновить маршрут',
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

    const existing = await findOwnedRoute(routeId, context.data);
    if (!existing) {
      return NextResponse.json({ error: 'Маршрут не найден' }, { status: 404 });
    }

    const parsed = await parseRequestBody(request, routeWithDeparturesSchema);
    if ('response' in parsed) return parsed.response;

    const { departuresFromStart, departuresFromEnd, ...routeData } =
      parsed.data;

    const route = await prisma.$transaction(async (tx) => {
      await tx.route.update({ where: { id: routeId }, data: routeData });
      await tx.routeDeparture.deleteMany({ where: { routeId } });
      await tx.routeDeparture.createMany({
        data: [
          ...departuresFromStart.map((d) => ({
            ...d,
            routeId,
            direction: 'FROM_START' as const,
          })),
          ...departuresFromEnd.map((d) => ({
            ...d,
            routeId,
            direction: 'FROM_END' as const,
          })),
        ],
      });

      return tx.route.findUniqueOrThrow({
        where: { id: routeId },
        include: { departures: { orderBy: { time: 'asc' } }, comments: true },
      });
    });

    return NextResponse.json(route);
  }
);

export const DELETE = withApiErrorHandling(
  'DELETE route',
  'Не удалось удалить маршрут',
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

    const existing = await findOwnedRoute(routeId, context.data);
    if (!existing) {
      return NextResponse.json({ error: 'Маршрут не найден' }, { status: 404 });
    }

    await prisma.route.delete({ where: { id: routeId } });

    return NextResponse.json({ success: true });
  }
);
