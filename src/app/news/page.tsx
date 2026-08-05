import { PageContainer } from '@/components/layout/PageContainer';
import NewsSection from '@/components/news/NewsSection';
import { prisma } from '@/lib/db';

export default async function NewsPage() {
  const news = await prisma.news.findMany({
    orderBy: { date: 'desc' },
  });
  return (
    <PageContainer title="Новости" description="Последние новости и обновления">
      <NewsSection initialData={news} />
    </PageContainer>
  );
}
