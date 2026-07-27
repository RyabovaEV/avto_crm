import { NextResponse } from 'next/server';
import { ZodSchema } from 'zod';

/**
 * Парсит JSON тела запроса по zod-схеме.
 * Возвращает { data } при успехе или готовый NextResponse с 400 при ошибке валидации.
 */
export async function parseRequestBody<T>(
  request: Request,
  schema: ZodSchema<T>
): Promise<{ data: T } | { response: NextResponse }> {
  const body = await request.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    const flat = result.error.flatten().fieldErrors as Record<
      string,
      string[] | undefined
    >;
    const fieldErrors = Object.fromEntries(
      Object.entries(flat).map(([key, msgs]) => [key, msgs?.[0]])
    );
    return { response: NextResponse.json({ fieldErrors }, { status: 400 }) };
  }

  return { data: result.data };
}

/**
 * Оборачивает хендлер, ловит ошибки и возвращает единообразный 500-ответ.
 */
export function withApiErrorHandling<Args extends unknown[]>(
  label: string,
  errorMessage: string,
  handler: (...args: Args) => Promise<NextResponse>
) {
  return async (...args: Args) => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error(`${label} error:`, error);
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  };
}
