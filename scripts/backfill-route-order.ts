//файл нужен был что бы заполнить поле order в таблице route,
// так как оно было добавлено после того как уже были созданы маршруты

import { prisma } from '@/lib/db';

async function main() {
  const groups = await prisma.route.findMany({
    select: { seasonId: true, type: true },
    distinct: ['seasonId', 'type'],
  });

  for (const group of groups) {
    const routes = await prisma.route.findMany({
      where: { seasonId: group.seasonId, type: group.type },
      orderBy: { id: 'asc' },
    });

    await prisma.$transaction(
      routes.map((route, i) =>
        prisma.route.update({ where: { id: route.id }, data: { order: i } })
      )
    );

    console.log(
      `Season ${group.seasonId}/${group.type}: ${routes.length} routes reordered`
    );
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
