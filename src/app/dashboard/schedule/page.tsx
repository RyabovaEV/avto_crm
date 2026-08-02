import { PageContainer } from '@/components/layout/PageContainer';
import { RouteTypeTabs, SeasonScheduleSection } from '@/components/routes';
import { RouteType } from '@/generated/prisma/client';
import { getSeasonsWithRoutes } from '@/lib/queries/getSeasonsWithRoutes';

const seasonLabels: Record<string, string> = {
  SUMMER: 'Летнее',
  AUTUMN: 'Осеннее',
  WINTER: 'Зимнее',
  SPRING: 'Весеннее',
};

type Props = {
  searchParams: Promise<{ type?: string }>;
};

export default async function SchedulePage({ searchParams }: Props) {
  const { type } = await searchParams;
  const activeType: RouteType = type === 'CITY' ? 'CITY' : 'SUBURBAN';

  const seasons = await getSeasonsWithRoutes(activeType);

  return (
    <PageContainer
      title="Расписание"
      description="Управление расписанием маршрутов"
    >
      <RouteTypeTabs active={activeType} />

      <div className="flex flex-col gap-4">
        {seasons.map((season) => (
          <SeasonScheduleSection
            key={`${activeType}-${season.id}`}
            seasonId={season.id}
            seasonType={season.type}
            seasonTitle={seasonLabels[season.type] ?? season.type}
            periods={season.periods}
            routeType={activeType}
            initialData={season.routes}
          />
        ))}
      </div>
    </PageContainer>
  );
}
