import { Header } from '@/components/layout/Header';
import { InsuranceForm } from '@/components/settings/InsuranceForm';
import { OrganizationForm } from '@/components/settings/OrganizationForm';
import { PhonesSection } from '@/components/settings/phones/PhoneSection';
import { Section } from '@/components/ui';
import { prisma } from '@/lib/db';

export default async function SettingsPage() {
  const company = await prisma.companyInfo.findFirst();
  const insurance = await prisma.companyInsurance.findFirst();
  const phones = await prisma.companyPhone.findMany({
    where: { companyInfoId: 1 },
    orderBy: { id: 'asc' },
  });
  return (
    <>
      <Header title="Настройки" description="Основная информация о компании" />
      <div className="flex-1 overflow-y-auto p-4 sm:p-10 grid grid-cols- gap-4 xl:grid-cols-2">
        <Section title="Основная информация">
          <OrganizationForm initialData={company} />
        </Section>
        <Section title="Страхование">
          <InsuranceForm initialData={insurance} />
        </Section>
        <PhonesSection initialData={phones} />
      </div>
    </>
  );
}
