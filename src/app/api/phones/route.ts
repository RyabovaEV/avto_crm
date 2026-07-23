import { prisma } from '@/lib/db';
import { phoneSchema } from '@/lib/validation/phone';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const phones = await prisma.companyPhone.findMany({
      where: { companyInfoId: 1 },
      orderBy: { id: 'asc' },
    });
    return NextResponse.json(phones);
  } catch (error) {
    console.error('GET phones error:', error);
    return NextResponse.json(
      { error: 'Не удалось загрузить данные' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = phoneSchema.safeParse(body);

    if (!result.success) {
      const flat = result.error.flatten().fieldErrors;
      const fieldErrors = Object.fromEntries(
        Object.entries(flat).map(([key, msgs]) => [key, msgs?.[0]])
      );
      return NextResponse.json({ fieldErrors }, { status: 400 });
    }

    const phone = await prisma.companyPhone.create({
      data: {
        ...result.data,
        companyInfoId: 1,
      },
    });

    return NextResponse.json(phone);
  } catch (error) {
    console.error('POST phones error:', error);
    return NextResponse.json(
      { error: 'Не удалось сохранить данные' },
      { status: 500 }
    );
  }
}
