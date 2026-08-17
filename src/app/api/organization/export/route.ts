import { prisma } from '@/lib/db';
import { withApiErrorHandling } from '@/lib/api';
import { NextResponse } from 'next/server';
import { buildJsonFileContent } from '@/lib/toJsonFile';

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

    const content = buildJsonFileContent(data);

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': 'attachment; filename="organization.json"',
      },
    });
  }
);
