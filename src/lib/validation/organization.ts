import zod from 'zod';

export const organizationSchema = zod.object({
  name: zod.string().min(1, 'Название организации обязательно'),
  email: zod.string().email('Неверный формат email'),
  address: zod.string().min(1, 'Адрес обязателен'),
  workingHours: zod.string().min(1, 'Часы работы обязательны'),
  directorName: zod.string().min(1, 'Имя директора обязательно'),
  deputyName: zod.string().min(1, 'Имя заместителя директора обязательно'),
});

export type OrganizationFormData = zod.infer<typeof organizationSchema>;
