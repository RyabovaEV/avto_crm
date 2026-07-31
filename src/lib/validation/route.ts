import zod from 'zod';
import { departureEntrySchema } from './routeDeparture';

export const routeTypeSchema = zod.enum(['SUBURBAN', 'CITY']);

export const routContextSchema = zod.object({
  type: routeTypeSchema,
  seasonId: zod.coerce.number().int().positive('Некоректный сезон'),
});

export type RouteContext = zod.infer<typeof routContextSchema>;

export function parseRouteContext(url: string) {
  const { searchParams } = new URL(url);
  return routContextSchema.safeParse({
    type: searchParams.get('type'),
    seasonId: searchParams.get('seasonId'),
  });
}

export const routeFormSchema = zod.object({
  number: zod.string().min(1, 'Укажите номер маршрута'),
  name: zod.string().min(1, 'Укажите название маршрута'),
});

export type RouteFormInput = zod.input<typeof routeFormSchema>;
export type RouteFormData = zod.output<typeof routeFormSchema>;

export const routeWithDeparturesSchema = routeFormSchema.extend({
  departuresFromStart: zod.array(departureEntrySchema).default([]),
  departuresFromEnd: zod.array(departureEntrySchema).default([]),
});

export type RouteWithDeparturesInput = zod.input<
  typeof routeWithDeparturesSchema
>;
export type RouteWithDeparturesData = zod.output<
  typeof routeWithDeparturesSchema
>;
