import { PageContainer } from '@/components/layout/PageContainer';
import { InsuranceForm } from '@/components/settings/InsuranceForm';
import { OrganizationForm } from '@/components/settings/OrganizationForm';
import { PhonesSection } from '@/components/phones/PhoneSection';
import { ExportButton, Section } from '@/components/ui';
import { prisma } from '@/lib/db';

export default async function SettingsPage() {
  const company = await prisma.companyInfo.findFirst();
  const insurance = await prisma.companyInsurance.findFirst();
  const phones = await prisma.companyPhone.findMany({
    where: { companyInfoId: 1 },
    orderBy: { id: 'asc' },
  });
  return (
    <PageContainer
      title="Настройки"
      description="Основная информация о компании"
    >
      <Section title="Основная информация">
        <OrganizationForm initialData={company} />
      </Section>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 items-start">
        <Section title="Страхование">
          <InsuranceForm initialData={insurance} />
        </Section>
        <PhonesSection initialData={phones} />
      </div>
    </PageContainer>
  );
}
