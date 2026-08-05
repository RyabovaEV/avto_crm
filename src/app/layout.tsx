import type { Metadata } from 'next';
import { inter } from '@/lib/fonts';
import './globals.css';
import { Providers } from './providers';
import { Sidebar } from '@/components/layout/Sidebar/Sidebar';

export const metadata: Metadata = {
  title: 'Авто CRM',
  description: 'Управление сайтом',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning className={inter.variable}>
      <body>
        <Providers>
          <div className="h-screen flex overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-hidden">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
