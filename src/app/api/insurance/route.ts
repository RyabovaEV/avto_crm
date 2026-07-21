import { prisma } from '@/lib/db';
import { insuranceSchema } from '@/lib/validation/insurance';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const insurances = await prisma.companyInsurance.findFirst();
    return NextResponse.json(insurances);
  } catch (error) {
    console.error('GET insurance error:', error);
    return NextResponse.json(
      { error: 'Не удалось загрузить данные' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const result = insuranceSchema.safeParse(body);

    if (!result.success) {
      const flat = result.error.flatten().fieldErrors;
      const fieldErrors = Object.fromEntries(
        Object.entries(flat).map(([key, msgs]) => [key, msgs?.[0]])
      );
      return NextResponse.json({ fieldErrors }, { status: 400 });
    }

    const insurance = await prisma.companyInsurance.upsert({
      where: { companyId: 1 },
      update: result.data,
      create: {
        ...result.data,
        companyId: 1,
      },
    });

    return NextResponse.json(insurance);
  } catch (error) {
    console.error('PATCH insurance error:', error);
    return NextResponse.json(
      { error: 'Не удалось сохранить данные' },
      { status: 500 }
    );
  }
}
