import zod from 'zod';
import { dayOfWeekSchema } from './dayOfWeek';

const timeSchema = zod
  .string()
  .min(1, 'Укажите время!')
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Некорректное время, формат ЧЧ:ММ');

export const departureEntrySchema = zod.object({
  time: timeSchema,
  dayOfWeek: zod.array(dayOfWeekSchema).default([]),
  comment: zod
    .string()
    .optional()
    .transform((v) => (v?.trim() ? v.trim() : undefined)),
});

export type DepartureEntryInput = zod.input<typeof departureEntrySchema>;
export type DepartureEntryData = zod.output<typeof departureEntrySchema>;

export const routeDepartureSchema = departureEntrySchema.extend({
  direction: zod.enum(['FROM_START', 'FROM_END']),
});

export type RouteDepartureFormInput = zod.input<typeof routeDepartureSchema>;
export type RouteDepartureFormData = zod.output<typeof routeDepartureSchema>;
