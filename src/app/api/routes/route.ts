import { prisma } from '@/lib/db';
import { parseRequestBody, withApiErrorHandling } from '@/lib/api';
import {
  parseRouteContext,
  routeWithDeparturesSchema,
} from '@/lib/validation/route';
import { NextResponse } from 'next/server';

export const GET = withApiErrorHandling(
  'GET routes',
  'Не удалось загрузить маршруты',
  async (request: Request) => {
    const context = parseRouteContext(request.url);
    if (!context.success) {
      return NextResponse.json(
        { error: 'Некорректный сезон или тип маршрута' },
        { status: 400 }
      );
    }
    const routes = await prisma.route.findMany({
      where: context.data,
      orderBy: { number: 'asc' },
      include: {
        departures: { orderBy: { time: 'asc' } },
        comments: true,
      },
    });

    return NextResponse.json(routes);
  }
);

export const POST = withApiErrorHandling(
  'POST route',
  'Не удалось сохранить маршрут',
  async (request: Request) => {
    const context = parseRouteContext(request.url);
    if (!context.success) {
      return NextResponse.json(
        { error: 'Некорректный сезон или тип маршрута' },
        { status: 400 }
      );
    }

    const parsed = await parseRequestBody(request, routeWithDeparturesSchema);
    if ('response' in parsed) return parsed.response;

    const { departuresFromStart, departuresFromEnd, ...routeData } =
      parsed.data;

    const maxOrder = await prisma.route.aggregate({
      where: context.data,
      _max: { order: true },
    });

    const route = await prisma.route.create({
      data: {
        ...routeData,
        ...context.data,
        order: (maxOrder._max.order || 0) + 1,
        departures: {
          create: [
            ...departuresFromStart.map((d) => ({
              ...d,
              direction: 'FROM_START' as const,
            })),
            ...departuresFromEnd.map((d) => ({
              ...d,
              direction: 'FROM_END' as const,
            })),
          ],
        },
      },
      include: { departures: { orderBy: { time: 'asc' } }, comments: true },
    });

    return NextResponse.json(route);
  }
);
