import zod from 'zod';

export const dayOfWeekSchema = zod.enum([
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN',
]);

export type DayOfWeekValue = zod.infer<typeof dayOfWeekSchema>;
