import { Header } from '@/components/layout/Header';
import { OrganizationForm } from '@/components/settings/OrganizationForm';
import { Section } from '@/components/ui';
import { prisma } from '@/lib/db';

export default async function SettingsPage() {
  const company = await prisma.companyInfo.findFirst();
  return (
    <>
      <Header title="Настройки" description="Основная информация о компании" />
      <div className="flex-1 overflow-y-auto p-4 sm:p-10 grid grid-cols- gap-4 xl:grid-cols-2">
        <Section title="Основная информация">
          <OrganizationForm initialData={company} />
        </Section>
        <Section title="Страхование">Страхование</Section>
        <Section title="Телефоны">Телефоны</Section>
      </div>
    </>
  );
}
