import { SeasonPeriod } from '@/generated/prisma/client';

const monthNames = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

function formatDate(month: number, day: number) {
  return `${day} ${monthNames[month - 1]}`;
}

function isYearWrapPair(a: SeasonPeriod, b: SeasonPeriod) {
  return (
    a.endMonth === 12 &&
    a.endDay === 31 &&
    b.startMonth === 1 &&
    b.startDay === 1
  );
}

export function formatSeasonPeriods(periods: SeasonPeriod[]): string {
  if (periods.length === 0) return '';

  const sorted = [...periods].sort(
    (a, b) => a.startMonth - b.startMonth || a.startDay - b.startDay
  );

  // Особый случай: ровно два периода, и они образуют переход через Новый год —
  // показываем как один непрерывный диапазон, а не как два отдельных
  if (sorted.length === 2) {
    const [first, second] = sorted;
    const decPart = sorted.find((p) => p.endMonth === 12 && p.endDay === 31);
    const janPart = sorted.find((p) => p.startMonth === 1 && p.startDay === 1);

    if (decPart && janPart && isYearWrapPair(decPart, janPart)) {
      return `${formatDate(decPart.startMonth, decPart.startDay)} – ${formatDate(janPart.endMonth, janPart.endDay)}`;
    }

    void first;
    void second;
  }

  // Общий случай — просто список диапазонов через запятую
  return sorted
    .map(
      (p) =>
        `${formatDate(p.startMonth, p.startDay)} – ${formatDate(p.endMonth, p.endDay)}`
    )
    .join(', ');
}

export function isCurrentSeason(periods: SeasonPeriod[]): boolean {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  return periods.some((p) => {
    const asNumber = (m: number, d: number) => m * 100 + d;
    const today = asNumber(month, day);
    const start = asNumber(p.startMonth, p.startDay);
    const end = asNumber(p.endMonth, p.endDay);

    // период не переходит через Новый год: обычное сравнение
    if (start <= end) return today >= start && today <= end;

    // период переходит через Новый год (например, 1 нояб. – 31 марта)
    return today >= start || today <= end;
  });
}
