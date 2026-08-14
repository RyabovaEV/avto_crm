import { prisma } from '@/lib/db';
import { withApiErrorHandling } from '@/lib/api';
import { buildTsFileContent } from '@/lib/export/toTsFile';
import { NextResponse } from 'next/server';

export const GET = withApiErrorHandling(
  'GET organization export',
  'Не удалось выгрузить данные',
  async () => {
    const company = await prisma.companyInfo.findFirst();

    const data = {
      name: company?.name ?? '',
      email: company?.email ?? '',
      address: company?.address ?? '',
      workingHours: company?.workingHours ?? '',
      directorName: company?.directorName ?? '',
      deputyName: company?.deputyName ?? '',
    };

    const typeDeclaration = `export type OrganizationData = {
  name: string;
  email: string;
  address: string;
  workingHours: string;
  directorName: string;
  deputyName: string;
};`;

    const content = buildTsFileContent({
      varName: 'organization',
      typeName: 'OrganizationData',
      typeDeclaration,
      data,
    });

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'application/typescript; charset=utf-8',
        'Content-Disposition': 'attachment; filename="organization.ts"',
      },
    });
  }
);
