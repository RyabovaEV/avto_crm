import 'dotenv/config';
import { prisma } from '../src/lib/db';

const seasonPeriods: Record<
  string,
  { startMonth: number; startDay: number; endMonth: number; endDay: number }[]
> = {
  SPRING: [{ startMonth: 4, startDay: 1, endMonth: 4, endDay: 30 }],
  SUMMER: [{ startMonth: 5, startDay: 1, endMonth: 9, endDay: 30 }],
  AUTUMN: [{ startMonth: 10, startDay: 1, endMonth: 10, endDay: 31 }],
  WINTER: [
    { startMonth: 11, startDay: 1, endMonth: 12, endDay: 31 },
    { startMonth: 1, startDay: 1, endMonth: 3, endDay: 31 },
  ],
};

async function main() {
  for (const [type, periods] of Object.entries(seasonPeriods)) {
    const season = await prisma.season.upsert({
      where: { type: type as keyof typeof seasonPeriods },
      update: {},
      create: { type: type as keyof typeof seasonPeriods },
    });

    await prisma.seasonPeriod.deleteMany({ where: { seasonId: season.id } });
    await prisma.seasonPeriod.createMany({
      data: periods.map((p) => ({ ...p, seasonId: season.id })),
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
