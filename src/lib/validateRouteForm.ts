import {
  routeWithDeparturesSchema,
  RouteFormErrors,
  RouteWithDeparturesInput,
  RouteWithDeparturesData,
} from '@/lib/validation/route';

type ValidationResult =
  | { success: true; data: RouteWithDeparturesData }
  | { success: false; fieldErrors: RouteFormErrors };

export function validateRouteForm(
  data: RouteWithDeparturesInput
): ValidationResult {
  const result = routeWithDeparturesSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }

  const fieldErrors: RouteFormErrors = {};

  for (const issue of result.error.issues) {
    const [first, second, third] = issue.path;

    if (first === 'departuresFromStart' || first === 'departuresFromEnd') {
      const index = second as number | undefined;
      const field = third as 'time' | 'dayOfWeek' | 'comment' | undefined;

      // ошибка на самом массиве (например, пустой список), а не на конкретном рейсе
      if (index === undefined) continue;

      if (!fieldErrors[first]) fieldErrors[first] = [];
      const list = fieldErrors[first]!;
      if (!list[index]) list[index] = {};

      if (field && !list[index][field]) {
        list[index][field] = issue.message;
      }
      continue;
    }

    const key = first as 'number' | 'name';
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }

  return { success: false, fieldErrors };
}
