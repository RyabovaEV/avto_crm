import zod from 'zod';

type FieldErrors<Input> = Partial<Record<keyof Input, string>>;

type ValidationResult<Schema extends zod.ZodTypeAny> =
  | { success: true; data: zod.infer<Schema> }
  | { success: false; fieldErrors: FieldErrors<zod.input<Schema>> };

export function validateWithSchema<Schema extends zod.ZodTypeAny>(
  schema: Schema,
  date: zod.input<Schema>
): ValidationResult<Schema> {
  const result = schema.safeParse(date);

  if (!result.success) {
    const fieldErrors: FieldErrors<zod.input<Schema>> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof zod.input<Schema>;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { success: false, fieldErrors };
  }

  return { success: true, data: result.data };
}
