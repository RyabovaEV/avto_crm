import { prisma } from '@/lib/db';
import { withApiErrorHandling } from '@/lib/api';
import { buildTsFileContent } from '@/lib/export/toTsFile';
import { NextResponse } from 'next/server';
import { buildJsonFileContent } from '@/lib/toJsonFile';

export const GET = withApiErrorHandling(
  'GET insurance export',
  'Не удалось выгрузить данные',
  async () => {
    const insurance = await prisma.companyInsurance.findFirst();

    const data = {
      insurer: insurance?.insurer ?? '',
      number: insurance?.number ?? '',
      dateBegin: insurance ? insurance.dateBegin.toISOString() : '',
      dateEnd: insurance ? insurance.dateEnd.toISOString() : '',
    };

    const content = buildJsonFileContent(data);

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': 'attachment; filename="insurance.json"',
      },
    });
  }
);
