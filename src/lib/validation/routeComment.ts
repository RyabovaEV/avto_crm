import zod from 'zod';

const routeCommentBaseSchema = zod.object({
  text: zod.string().min(1, 'Укажите текст примечания'),
  times: zod.array(zod.string()).default([]),
});

export const createRouteCommentSchema = routeCommentBaseSchema.extend({
  routeId: zod.coerce.number().int().positive('Выберите маршрут'),
});

export const updateRouteCommentSchema = routeCommentBaseSchema;

export type CreateRouteCommentInput = zod.input<
  typeof createRouteCommentSchema
>;
export type CreateRouteCommentData = zod.output<
  typeof createRouteCommentSchema
>;

export type UpdateRouteCommentInput = zod.input<
  typeof updateRouteCommentSchema
>;
export type UpdateRouteCommentData = zod.output<
  typeof updateRouteCommentSchema
>;

export type RouteCommentErrors = Partial<
  Record<'routeId' | 'text' | 'times', string>
>;
