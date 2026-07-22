import zod from 'zod';

export const phoneSchema = zod.object({
  phone: zod
    .string()
    .min(1, 'Укажите номер телефона')
    .regex(/^[+0-9()\-\s]+$/, 'Некорректный номер телефона'),
  label: zod
    .string()
    .optional()
    .transform((v) => (v?.trim() ? v.trim() : undefined)),
  signature: zod
    .string()
    .optional()
    .transform((v) => (v?.trim() ? v.trim().toUpperCase() : undefined)),
});

export type PhoneFormInput = zod.input<typeof phoneSchema>;
export type PhoneFormData = zod.output<typeof phoneSchema>;
