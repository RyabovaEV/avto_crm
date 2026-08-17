import { prisma } from '@/lib/db';
import { withApiErrorHandling } from '@/lib/api';
import { NextResponse } from 'next/server';
import { buildJsonFileContent } from '@/lib/toJsonFile';

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

    const content = buildJsonFileContent(data);

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': 'attachment; filename="phones.json"',
      },
    });
  }
);
