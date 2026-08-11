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

    for (let i = 0; i < routes.length; i++) {
      await prisma.route.update({
        where: { id: routes[i].id },
        data: { order: i },
      });
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
