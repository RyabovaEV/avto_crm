import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const company = await prisma.companyInfo.findFirst();
    return NextResponse.json(company);
  } catch (error) {
    console.error('GET organization error:', error);
    return NextResponse.json(
      { error: 'Не удалось загрузить данные' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const company = await prisma.companyInfo.update({
      where: { id: 1 },
      data: {
        name: body.name,
        email: body.email,
        address: body.address,
        workingHours: body.workingHours,
        directorName: body.directorName,
        deputyName: body.deputyName,
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.error('PATCH organization error:', error);
    return NextResponse.json(
      { error: 'Не удалось сохранить данные' },
      { status: 500 }
    );
  }
}
