import zod from 'zod';

export const insuranceSchema = zod
  .object({
    insurer: zod.string().min(1, 'Укажите страховую компанию'),
    number: zod.string().min(1, 'Укажите номер полиса'),
    dateBegin: zod
      .string()
      .min(1, 'Укажите дату начала')
      .refine((v) => !isNaN(Date.parse(v)), 'Некорректная дата')
      .transform((v) => new Date(v)),
    dateEnd: zod
      .string()
      .min(1, 'Укажите дату окончания')
      .refine((v) => !isNaN(Date.parse(v)), 'Некорректная дата')
      .transform((v) => new Date(v)),
  })
  .refine((data) => data.dateEnd > data.dateBegin, {
    message: 'Дата окончания должна быть позже даты начала',
    path: ['dateEnd'],
  });

export type InsuranceFormInput = zod.input<typeof insuranceSchema>;
export type InsuranceFormData = zod.output<typeof insuranceSchema>;
