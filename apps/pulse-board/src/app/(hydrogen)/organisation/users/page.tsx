import ModalButton from '@/app/shared/modal-button';
import PageHeader from '@/app/shared/page-header';
import UserForm from './_components/user-form';
import UsersTable from './_components/users-table';

const pageHeader = {
  title: 'Utilisateurs',
  breadcrumb: [
    {
      href: '/',
      name: 'Dashboard',
    },
    {
      name: 'Utilisateurs',
    },
  ],
};

export default async function UserPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton
          label="Ajouter un utilisateur"
          view={<UserForm title="Utilisateur" />}
        />
      </PageHeader>
      <UsersTable />
    </>
  );
}
