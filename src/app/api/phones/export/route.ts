import { prisma } from '@/lib/db';
import { withApiErrorHandling } from '@/lib/api';
import { buildTsFileContent } from '@/lib/export/toTsFile';
import { NextResponse } from 'next/server';

export const GET = withApiErrorHandling(
  'GET phones export',
  'Не удалось выгрузить данные',
  async () => {
    const phones = await prisma.companyPhone.findMany({
      where: { companyInfoId: 1 },
      orderBy: { id: 'asc' },
    });

    const data = phones.map((p) => ({
      id: p.id,
      phone: p.phone,
      label: p.label,
      signature: p.signature,
    }));

    const typeDeclaration = `export type PhoneData = {
  id: number;
  phone: string;
  label: string | null;
  signature: string | null;
};`;

    const content = buildTsFileContent({
      varName: 'phones',
      typeName: 'PhoneData[]',
      typeDeclaration,
      data,
    });

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'application/typescript; charset=utf-8',
        'Content-Disposition': 'attachment; filename="phones.ts"',
      },
    });
  }
);
