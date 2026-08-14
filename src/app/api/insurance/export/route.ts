import { prisma } from '@/lib/db';
import { withApiErrorHandling } from '@/lib/api';
import { buildTsFileContent } from '@/lib/export/toTsFile';
import { NextResponse } from 'next/server';

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

    const typeDeclaration = `export type InsuranceData = {
  insurer: string;
  number: string;
  /** ISO 8601 */
  dateBegin: string;
  /** ISO 8601 */
  dateEnd: string;
};`;

    const content = buildTsFileContent({
      varName: 'insurance',
      typeName: 'InsuranceData',
      typeDeclaration,
      data,
    });

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'application/typescript; charset=utf-8',
        'Content-Disposition': 'attachment; filename="insurance.ts"',
      },
    });
  }
);
