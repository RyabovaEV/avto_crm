import { prisma } from '@/lib/db';
import { withApiErrorHandling } from '@/lib/api';
import { buildTsFileContent } from '@/lib/export/toTsFile';
import { parseRouteContext } from '@/lib/validation/route';
import { NextResponse } from 'next/server';

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const GET = withApiErrorHandling(
  'GET routes export',
  'Не удалось выгрузить данные',
  async (request: Request) => {
    const context = parseRouteContext(request.url);
    if (!context.success) {
      return NextResponse.json(
        { error: 'Некорректный сезон или тип маршрута' },
        { status: 400 }
      );
    }

    const season = await prisma.season.findUnique({
      where: { id: context.data.seasonId },
    });
    if (!season) {
      return NextResponse.json({ error: 'Сезон не найден' }, { status: 404 });
    }

    const routes = await prisma.route.findMany({
      where: context.data,
      orderBy: { order: 'asc' },
      include: {
        departures: { orderBy: { time: 'asc' } },
        comments: true,
      },
    });

    const data = routes.map((route) => ({
      id: route.id,
      number: route.number,
      name: route.name,
      isCircular: route.isCircular,
      departuresFromStart: route.departures
        .filter((d) => d.direction === 'FROM_START')
        .map((d) => ({
          time: d.time,
          dayOfWeek: d.dayOfWeek,
          comment: d.comment,
        })),
      departuresFromEnd: route.departures
        .filter((d) => d.direction === 'FROM_END')
        .map((d) => ({
          time: d.time,
          dayOfWeek: d.dayOfWeek,
          comment: d.comment,
        })),
      comments: route.comments.map((c) => ({
        text: c.text,
        times: c.times,
      })),
    }));

    const typeDeclaration = `export type RouteDepartureData = {
  time: string;
  dayOfWeek: ('MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN')[];
  comment: string | null;
};

export type RouteCommentData = {
  text: string;
  times: string[];
};

export type RouteData = {
  id: number;
  number: string;
  name: string;
  isCircular: boolean;
  departuresFromStart: RouteDepartureData[];
  departuresFromEnd: RouteDepartureData[];
  comments: RouteCommentData[];
};`;

    const seasonKey = season.type.toLowerCase();
    const typeKey = context.data.type.toLowerCase();
    const varName = `${seasonKey}${capitalize(typeKey)}Routes`;

    const content = buildTsFileContent({
      varName,
      typeName: 'RouteData[]',
      typeDeclaration,
      data,
    });

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'application/typescript; charset=utf-8',
        'Content-Disposition': `attachment; filename="routes-${seasonKey}-${typeKey}.ts"`,
      },
    });
  }
);
