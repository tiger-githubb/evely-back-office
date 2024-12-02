import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import HeaderAction from './_components/header-action';
import GroupsTable from './_components/group-table';

export const metadata = {
  ...metaObject('Groups'),
};

const pageHeader = {
  title: 'Groups',
  breadcrumb: [
    {
      href: routes.home,
      name: 'Accueil',
    },

    {
      name: 'Groups',
    },
  ],
};

export default function GroupsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <HeaderAction title="Group" />
      </PageHeader>
      <GroupsTable />
    </>
  );
}
