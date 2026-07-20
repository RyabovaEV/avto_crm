import { prisma } from '@/lib/db';
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

    const insurance = await prisma.companyInsurance.upsert({
      where: { companyId: 1 },
      update: {
        insurer: body.insurer,
        number: body.number,
        dateBegin: new Date(body.dateBegin),
        dateEnd: new Date(body.dateEnd),
      },
      create: {
        insurer: body.insurer,
        number: body.number,
        dateBegin: new Date(body.dateBegin),
        dateEnd: new Date(body.dateEnd),
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
