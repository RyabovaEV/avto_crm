import { parseRequestBody, withApiErrorHandling } from '@/lib/api';
import { prisma } from '@/lib/db';
import { insuranceSchema } from '@/lib/validation/insurance';
import { NextResponse } from 'next/server';

export const GET = withApiErrorHandling(
  'GET insurance',
  'Не удалось загрузить данные',
  async () => NextResponse.json(await prisma.companyInsurance.findFirst())
);

export const PATCH = withApiErrorHandling(
  'PATCH insurance',
  'Не удалось сохранить данные',
  async (request: Request) => {
    const parsed = await parseRequestBody(request, insuranceSchema);
    if ('response' in parsed) return parsed.response;

    const insurance = await prisma.companyInsurance.upsert({
      where: { companyId: 1 },
      update: parsed.data,
      create: {
        ...parsed.data,
        companyId: 1,
      },
    });

    return NextResponse.json(insurance);
  }
);
