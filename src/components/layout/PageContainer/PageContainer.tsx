import { ReactNode } from 'react';
import { Header } from '../Header';

type PageContainerProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function PageContainer({
  title,
  description,
  children,
}: PageContainerProps) {
  return (
    <>
      <Header title={title} description={description} />
      <div className="flex-1 overflow-y-auto p-4 sm:p-10 flex flex-col gap-4">
        {children}
      </div>
    </>
  );
}
