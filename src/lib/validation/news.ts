import zod from 'zod';

export const newsSchema = {
  date: zod
    .string()
    .min(1, 'Укажите дату')
    .refine((v) => !isNaN(Date.parse(v)), 'Некорректная дата')
    .transform((v) => new Date(v)),
  news: zod.string().min(1, 'Укажите текст новости'),
};
