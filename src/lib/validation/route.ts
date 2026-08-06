import zod from 'zod';
import { departureEntrySchema, DepartureEntryErrors } from './routeDeparture';

export const routeTypeSchema = zod.enum(['SUBURBAN', 'CITY']);

export const routContextSchema = zod.object({
  type: routeTypeSchema,
  seasonId: zod.coerce.number().int().positive('Некоректный сезон'),
});

export type RouteContext = zod.infer<typeof routContextSchema>;

export type RouteFormErrors = {
  number?: string;
  name?: string;
  departuresFromStart?: DepartureEntryErrors[];
  departuresFromEnd?: DepartureEntryErrors[];
};

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
  isCircular: zod.boolean().default(false),
});

export type RouteFormInput = zod.input<typeof routeFormSchema>;
export type RouteFormData = zod.output<typeof routeFormSchema>;

export const routeWithDeparturesSchema = routeFormSchema
  .extend({
    departuresFromStart: zod.array(departureEntrySchema).default([]),
    departuresFromEnd: zod.array(departureEntrySchema).default([]),
  })
  .transform((data) => ({
    ...data,
    departuresFromEnd: data.isCircular ? [] : data.departuresFromEnd,
  }));

export type RouteWithDeparturesInput = zod.input<
  typeof routeWithDeparturesSchema
>;
export type RouteWithDeparturesData = zod.output<
  typeof routeWithDeparturesSchema
>;
