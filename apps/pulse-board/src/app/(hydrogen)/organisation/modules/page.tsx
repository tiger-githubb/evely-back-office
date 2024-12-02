import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import HeaderAction from './_components/header-action';
import ModulesTable from './_components/module-table';

export const metadata = {
  ...metaObject('Modules'),
};

const pageHeader = {
  title: 'Modules',
  breadcrumb: [
    {
      href: routes.home,
      name: 'Accueil',
    },

    {
      name: 'Modules',
    },
  ],
};

export default function ModulesPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <HeaderAction title="Module" />
      </PageHeader>
      <ModulesTable />
    </>
  );
}
