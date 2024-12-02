'use client';

import ModalButton from '@/app/shared/modal-button';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { users } from '@/data/roles-permissions';
import { deleteRole } from '@/server/services/roles.service';
import { RoleType } from '@/types/role.type';
import TrashIcon from '@core/components/icons/trash';
import UserCog from '@core/components/icons/user-cog';
import cn from '@core/utils/class-names';
import { formatDate } from '@core/utils/format-date';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import toast from 'react-hot-toast';
import {
  PiCalendarBlankDuotone,
  PiUserCircleGearDuotone,
  PiWarning,
} from 'react-icons/pi';
import { ActionIcon, Box, Button, Flex, Popover, Text, Title } from 'rizzui';
import RoleForm from './role-form';

interface RoleCardProps {
  role: RoleType;
  className?: string;
}

export default function RoleCard({ role, className }: RoleCardProps) {
  const { openModal } = useModal();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      toast.success(`Rôle supprimé avec succès!`);
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
    onError: (error: Error) => {
      toast.error(`Échec de la suppression: ${error.message}`);
    },
  });

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  };
  return (
    <div className={cn('rounded-lg border border-muted p-6', className)}>
      <header className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span
            className="grid h-10 w-10 place-content-center rounded-lg text-white"
            style={{
              backgroundColor: role.color || '#000000',
            }}
          >
            <PiUserCircleGearDuotone className="h-auto w-6" />
          </span>
          <div>
            <Title as="h4" className="font-medium">
              {role.name}
            </Title>
            <div className="flex gap-1">
              <PiCalendarBlankDuotone className="h-auto w-4" />
              <Text className="text-sm">{formatDate(role.createdAt)}</Text>
            </div>
          </div>
        </div>
      </header>
      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center">
          {users?.slice(0, 4).map((user) => (
            <figure
              key={user.id}
              className="relative z-10 -ml-1.5 h-8 w-8 rounded-full border-2 border-white"
            >
              <Image
                src={user.avatar}
                alt="user avatar"
                fill
                className="rounded-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </figure>
          ))}
        </div>
        <span>{users.length} Utilisateurs</span>
      </div>
      <div className="flex items-center justify-center gap-2 lg:mt-6">
        <ModalButton
          customSize="700px"
          variant="outline"
          label="Modifier le rôle"
          icon={<UserCog className="h-5 w-5" />}
          view={<RoleForm role={role} isUpdateMode />}
          className="items-center gap-1 text-gray-800 @lg:w-full"
        />

        <Popover>
          <Popover.Trigger>
            <ActionIcon
              size="lg"
              variant="outline"
              className="h-full hover:border-red hover:text-red-dark"
            >
              <TrashIcon className="h-5 w-5" />
            </ActionIcon>
          </Popover.Trigger>
          <Popover.Content className="!z-0">
            {({ setOpen }) => (
              <Box className="w-56 pb-2 pt-1 text-left rtl:text-right">
                <Title
                  as="h6"
                  className="mb-0.5 flex items-start text-sm sm:items-center"
                >
                  <PiWarning className="text me-2 size-6" /> Supprimer{' '}
                  {role.name} !
                </Title>
                <Text className="mt-2 leading-relaxed">
                  Êtes-vous sûr de vouloir supprimer ce rôle ?
                </Text>
                <Flex align="center" justify="end" className="mt-2 gap-1.5">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7"
                    onClick={() => setOpen(false)}
                  >
                    Non
                  </Button>
                  <Button
                    size="sm"
                    className="h-7 bg-red hover:bg-red-dark"
                    isLoading={mutation.isPending}
                    onClick={() => {
                      handleDelete(role.id);
                      setOpen(false);
                    }}
                  >
                    Oui
                  </Button>
                </Flex>
              </Box>
            )}
          </Popover.Content>
        </Popover>
      </div>
    </div>
  );
}
