import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import HeaderAction from './_components/header-action';
import PermissionsTable from './_components/permission-table';

export const metadata = {
  ...metaObject('Permissions'),
};

const pageHeader = {
  title: 'Permissions',
  breadcrumb: [
    {
      href: routes.home,
      name: 'Accueil',
    },

    {
      name: 'Permissions',
    },
  ],
};

export default function PermissionsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <HeaderAction title="Permission" />
      </PageHeader>
      <PermissionsTable />
    </>
  );
}
