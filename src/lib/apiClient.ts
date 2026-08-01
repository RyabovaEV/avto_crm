export type SubmitResult<T> =
  | { success: true; data: T }
  | { success: false; fieldErrors: Record<string, string | undefined> };

export async function submitForm<T>(
  endpoint: string,
  method: 'POST' | 'PATCH',
  body: unknown
): Promise<SubmitResult<T>> {
  const response = await fetch(endpoint, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (response.status === 400) {
    const data = await response.json();
    return { success: false, fieldErrors: data.fieldErrors ?? {} };
  }

  if (!response.ok) {
    throw new Error('Ошибка сохранения');
  }

  return { success: true, data: await response.json() };
}

export async function deleteEntity(url: string): Promise<void> {
  const response = await fetch(url, { method: 'DELETE' });
  if (!response.ok) throw new Error('Ошибка удаления');
}
