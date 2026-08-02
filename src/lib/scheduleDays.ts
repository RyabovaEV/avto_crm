// src/lib/scheduleDays.ts
import { DayOfWeekValue } from '@/lib/validation/dayOfWeek';

const ALL_DAYS: DayOfWeekValue[] = [
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN',
];

const dayAbbr: Record<DayOfWeekValue, string> = {
  MON: 'пн.',
  TUE: 'вт.',
  WED: 'ср.',
  THU: 'чт.',
  FRI: 'пт.',
  SAT: 'сб.',
  SUN: 'вс.',
};

export function formatDaysOfWeek(days: DayOfWeekValue[]): string {
  if (days.length === 0) return '';

  return ALL_DAYS.filter((d) => days.includes(d))
    .map((d) => dayAbbr[d])
    .join(', ');
}
