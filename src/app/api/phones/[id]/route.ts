import { prisma } from '@/lib/db';
import { phoneSchema } from '@/lib/validation/phone';
import { NextResponse } from 'next/server';

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = phoneSchema.safeParse(body);

    if (!result.success) {
      const flat = result.error.flatten().fieldErrors;
      const fieldErrors = Object.fromEntries(
        Object.entries(flat).map(([key, msgs]) => [key, msgs?.[0]])
      );
      return NextResponse.json({ fieldErrors }, { status: 400 });
    }

    const phone = await prisma.companyPhone.update({
      where: { id: Number(id) },
      data: result.data,
    });

    return NextResponse.json(phone);
  } catch (error) {
    console.error('GET phone by ID error:', error);
    return NextResponse.json(
      { error: 'Не удалось загрузить данные' },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.companyPhone.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE phone by ID error:', error);
    return NextResponse.json(
      { error: 'Не удалось удалить данные' },
      { status: 500 }
    );
  }
}
