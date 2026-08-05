import { prisma } from '@/lib/db';
import { organizationSchema } from '@/lib/validation/organization';
import { NextResponse } from 'next/server';
import { parseRequestBody, withApiErrorHandling } from '@/lib/api';

export const GET = withApiErrorHandling(
  'GET organization',
  'Не удалось загрузить данные',
  async () => NextResponse.json(await prisma.companyInfo.findFirst())
);

export const PATCH = withApiErrorHandling(
  'PATCH organization',
  'Не удалось сохранить данные',
  async (request: Request) => {
    const parsed = await parseRequestBody(request, organizationSchema);
    if ('response' in parsed) return parsed.response;

    const company = await prisma.companyInfo.upsert({
      where: { id: 1 },
      update: parsed.data,
      create: {
        ...parsed.data,
      },
    });

    return NextResponse.json(company);
  }
);
