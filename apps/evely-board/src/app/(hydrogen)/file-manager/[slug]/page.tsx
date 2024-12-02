import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import { getArchiveDirectory } from '@/server/services/archives.service';
import HeaderAction from './_components/header-action';
import PageLayout from './page-layout';

export const metadata = {
  ...metaObject('File Manager'),
};

export default async function DirectoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const directoryData = await getArchiveDirectory(params.slug);
  const pageHeader = {
    title: directoryData.data.name,
    breadcrumb: [
      {
        href: routes.blank,
        name: 'Home',
      },
      {
        href: routes.file.manager,
        name: 'Archives Manager',
      },
      {
        name: directoryData.data.name,
      },
    ],
  };
  return (
    <>
      <PageHeader
        directoryData={directoryData}
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      >
        <HeaderAction directoryId={directoryData.data.id} />
      </PageHeader>

      <PageLayout slug={params.slug} />
    </>
  );
}
