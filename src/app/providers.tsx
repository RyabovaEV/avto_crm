// app/providers.tsx
'use client'
import { ThemeProvider } from 'next-themes'

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"        // вешает класс .dark на <html>
      defaultTheme="system"    // по умолчанию читает ОС
      enableSystem             // следит за prefers-color-scheme
    >
      {children}
    </ThemeProvider>
  )
}