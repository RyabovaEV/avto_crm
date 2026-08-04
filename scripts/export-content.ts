// Выгружает контент из CMS (Postgres/Prisma) в JSON-файлы,
// которые затем попадают в репозиторий Astro-сайта и пересобираются там.
//
// Запуск:  npx tsx scripts/export-content.ts
// Куда пишет: путь берётся из переменной окружения EXPORT_DIR,
// иначе — папка ./export рядом с проектом.
//
// Совет: если Astro-репозиторий склонирован рядом
// (например ../site-astro), можно сразу указать
// EXPORT_DIR=../site-astro/src/data — тогда файлы
// сразу лягут в нужное место, и останется только
// git add / commit / push в Astro-репозитории.

import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { prisma } from '../src/lib/db';
import type { DayOfWeek, RouteType } from '@/generated/prisma/client';

const OUT_DIR = process.env.EXPORT_DIR ?? path.resolve(__dirname, '../export');

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  await exportCompany();
  await exportNews();
  await exportSchedule();

  console.log(`\n✅ Экспорт завершён → ${OUT_DIR}`);
}

async function exportCompany() {
  const [info, insurance, phones] = await Promise.all([
    prisma.companyInfo.findFirst(),
    prisma.companyInsurance.findFirst(),
    prisma.companyPhone.findMany({ orderBy: { id: 'asc' } }),
  ]);

  writeJson('company.json', {
    name: info?.name ?? '',
    email: info?.email ?? null,
    address: info?.address ?? null,
    workingHours: info?.workingHours ?? null,
    directorName: info?.directorName ?? null,
    deputyName: info?.deputyName ?? null,
    insurance: insurance
      ? {
          insurer: insurance.insurer,
          number: insurance.number,
          dateBegin: insurance.dateBegin.toISOString(),
          dateEnd: insurance.dateEnd.toISOString(),
        }
      : null,
    phones: phones.map((p) => ({
      phone: p.phone,
      label: p.label,
      signature: p.signature,
    })),
  });
}

async function exportNews() {
  const news = await prisma.news.findMany({ orderBy: { date: 'desc' } });

  writeJson(
    'news.json',
    news.map((n) => ({
      id: n.id,
      date: n.date.toISOString(),
      news: n.news, // markdown как есть, рендерится уже в Astro
      isMain: n.isMain,
    }))
  );
}

async function exportSchedule() {
  const seasons = await prisma.season.findMany({
    orderBy: { id: 'asc' },
    include: {
      periods: true,
      routes: {
        orderBy: { number: 'asc' },
        include: { departures: { orderBy: { time: 'asc' } } },
      },
    },
  });

  writeJson(
    'schedule.json',
    seasons.map((season) => ({
      type: season.type,
      periods: season.periods.map((p) => ({
        startMonth: p.startMonth,
        startDay: p.startDay,
        endMonth: p.endMonth,
        endDay: p.endDay,
      })),
      routes: {
        SUBURBAN: buildRoutes(season.routes, 'SUBURBAN'),
        CITY: buildRoutes(season.routes, 'CITY'),
      },
    }))
  );
}

type RouteWithDepartures = Awaited<
  ReturnType<typeof prisma.route.findMany>
>[number] & {
  departures: {
    direction: 'FROM_START' | 'FROM_END';
    time: string;
    dayOfWeek: DayOfWeek[];
    comment: string | null;
  }[];
};

function buildRoutes(routes: RouteWithDepartures[], type: RouteType) {
  return routes
    .filter((r) => r.type === type)
    .map((r) => ({
      number: r.number,
      name: r.name,
      departuresFromStart: r.departures
        .filter((d) => d.direction === 'FROM_START')
        .map(formatDeparture),
      departuresFromEnd: r.departures
        .filter((d) => d.direction === 'FROM_END')
        .map(formatDeparture),
    }));
}

function formatDeparture(d: RouteWithDepartures['departures'][number]) {
  return { time: d.time, dayOfWeek: d.dayOfWeek, comment: d.comment };
}

function writeJson(filename: string, data: unknown) {
  const filePath = path.join(OUT_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`  → ${filename}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
