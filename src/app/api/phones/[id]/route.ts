import { parseRequestBody, withApiErrorHandling } from '@/lib/api';
import { prisma } from '@/lib/db';
import { phoneSchema } from '@/lib/validation/phone';
import { NextResponse } from 'next/server';

type Params = { params: Promise<{ id: string }> };

export const PATCH = withApiErrorHandling(
  'PATCH phone',
  'Не удалось обновить данные',
  async (request: Request, { params }: Params) => {
    const { id } = await params;
    const parsed = await parseRequestBody(request, phoneSchema);
    if ('response' in parsed) return parsed.response;

    const phone = await prisma.companyPhone.update({
      where: { id: Number(id) },
      data: parsed.data,
    });

    return NextResponse.json(phone);
  }
);

export const DELETE = withApiErrorHandling(
  'DELETE phone',
  'Не удалось удалить данные',
  async (_request: Request, { params }: Params) => {
    const { id } = await params;
    await prisma.companyPhone.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  }
);
