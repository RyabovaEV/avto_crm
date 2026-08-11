// src/lib/flattenIssues.ts
import zod from 'zod';

export function flattenIssues<T extends Record<string, unknown>>(
  error: zod.ZodError
): Partial<Record<keyof T, string>> {
  const result: Partial<Record<keyof T, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof T;
    if (!result[key]) result[key] = issue.message;
  }
  return result;
}
