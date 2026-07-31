import { prisma } from '@/lib/db';
import { parseRequestBody, withApiErrorHandling } from '@/lib/api';
import {
  parseRouteContext,
  routeWithDeparturesSchema,
} from '@/lib/validation/route';
import { NextResponse } from 'next/server';
import { Prisma } from '@/generated/prisma/client';

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

    try {
      const route = await prisma.route.create({
        data: {
          ...routeData,
          ...context.data, // type + seasonId — только из URL, не из тела запроса
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
        include: { departures: { orderBy: { time: 'asc' } } },
      });

      return NextResponse.json(route);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        return NextResponse.json(
          {
            fieldErrors: {
              number: 'Маршрут с таким номером уже есть в этом сезоне',
            },
          },
          { status: 400 }
        );
      }
      throw error;
    }
  }
);
