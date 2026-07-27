import { parseRequestBody, withApiErrorHandling } from '@/lib/api';
import { prisma } from '@/lib/db';
import { phoneSchema } from '@/lib/validation/phone';
import { NextResponse } from 'next/server';

export const GET = withApiErrorHandling(
  'GET phones',
  'Не удалось загрузить данные',
  async () => {
    const phones = await prisma.companyPhone.findMany({
      where: { companyInfoId: 1 },
      orderBy: { id: 'asc' },
    });
    return NextResponse.json(phones);
  }
);

export const POST = withApiErrorHandling(
  'POST phones',
  'Не удалось сохранить данные',
  async (request: Request) => {
    const parsed = await parseRequestBody(request, phoneSchema);
    if ('response' in parsed) return parsed.response;

    const phone = await prisma.companyPhone.create({
      data: {
        ...parsed.data,
        companyInfoId: 1,
      },
    });

    return NextResponse.json(phone);
  }
);
