export function buildJsonFileContent(data: unknown): string {
  return JSON.stringify(data, null, 2);
}
