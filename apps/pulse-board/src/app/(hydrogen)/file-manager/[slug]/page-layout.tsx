'use client';

import { useSearchParams } from 'next/navigation';
import ArchivesListTable from './_components/archives-list/table';

export default function PageLayout({ slug }: { slug: string }) {
  const directorySlug = slug;
  const searchParams = useSearchParams();
  const layout = searchParams.get('layout');
  const isGridLayout = layout?.toLowerCase() === 'grid';

  return isGridLayout ? (
    <ArchivesListTable directorySlug={directorySlug} />
  ) : (
    <ArchivesListTable directorySlug={directorySlug} />
  );
}
