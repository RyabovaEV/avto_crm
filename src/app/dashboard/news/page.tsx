import { PageContainer } from '@/components/layout/PageContainer';
import NewsSection from '@/components/news/NewsSection';

export default function NewsPage() {
  return (
    <PageContainer title="Новости" description="Последние новости и обновления">
      <NewsSection />
    </PageContainer>
  );
}
