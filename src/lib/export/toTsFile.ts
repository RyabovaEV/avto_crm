type BuildTsFileOptions = {
  varName: string;
  typeName?: string;
  typeDeclaration?: string;
  data: unknown;
};

export function buildTsFileContent({
  varName,
  typeName,
  typeDeclaration,
  data,
}: BuildTsFileOptions): string {
  const header = `// Файл сгенерирован автоматически ${new Date().toISOString()}\n// Не редактируйте вручную — при повторной выгрузке файл будет перезаписан\n\n`;
  const typePart = typeDeclaration ? `${typeDeclaration}\n\n` : '';
  const typeAnnotation = typeName ? `: ${typeName}` : '';

  return `${header}${typePart}export const ${varName}${typeAnnotation} = ${JSON.stringify(
    data,
    null,
    2
  )} as const;\n`;
}
