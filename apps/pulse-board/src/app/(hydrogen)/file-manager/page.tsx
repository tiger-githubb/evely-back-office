import FileStats from '@/app/shared/file/manager/file-stats';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import HeaderAction from './_components/header-action';
import PageLayout from './page-layout';

export const metadata = {
  ...metaObject('Archives Manager'),
};

const pageHeader = {
  title: 'Archives Manager',
  breadcrumb: [
    {
      href: routes.blank,
      name: 'Home',
    },
    {
      name: 'Archives Manager',
    },
  ],
};

export default function ArchivesListPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <HeaderAction />
      </PageHeader>

      <FileStats className="mb-6 @5xl:mb-8 @7xl:mb-11" />
      <PageLayout />
    </>
  );
}
