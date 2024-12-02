import ModalButton from '@/app/shared/modal-button';
import PageHeader from '@/app/shared/page-header';
import CreateRole from './_components/role-form';
import RolesGrid from './_components/roles-grid';

const pageHeader = {
  title: 'Roles',
  breadcrumb: [
    {
      href: '/',
      name: 'Dashboard',
    },
    {
      name: 'Gestion des rôles et autorisation',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton
          label="Ajouter un nouveau rôle"
          customSize="700px"
          view={<CreateRole />}
        />
      </PageHeader>
      <RolesGrid />
    </>
  );
}
