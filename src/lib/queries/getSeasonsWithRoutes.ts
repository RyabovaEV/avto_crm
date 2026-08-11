import { prisma } from '@/lib/db';
import { RouteType } from '@/generated/prisma/client';

export async function getSeasonsWithRoutes(type: RouteType) {
  return prisma.season.findMany({
    orderBy: { id: 'asc' },
    include: {
      periods: true,
      routes: {
        where: { type },
        orderBy: { order: 'asc' },
        include: {
          departures: { orderBy: { time: 'asc' } },
          comments: true,
        },
      },
    },
  });
}
