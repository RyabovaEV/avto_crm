import { prisma } from '@/lib/db';
import { organizationSchema } from '@/lib/validation/organization';
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
    const result = organizationSchema.safeParse(body);

    if (!result.success) {
      const flat = result.error.flatten().fieldErrors;
      const fieldErrors = Object.fromEntries(
        Object.entries(flat).map(([key, msgs]) => [key, msgs?.[0]])
      );
      return NextResponse.json({ fieldErrors }, { status: 400 });
    }

    const company = await prisma.companyInfo.update({
      where: { id: 1 },
      data: result.data,
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
