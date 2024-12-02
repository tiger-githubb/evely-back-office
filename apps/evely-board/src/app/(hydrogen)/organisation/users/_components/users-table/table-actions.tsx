'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import { deleteUser } from '@/server/services/users.service';
import { User } from '@/types/user.type';
import PencilIcon from '@core/components/icons/pencil';
import TrashIcon from '@core/components/icons/trash';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { PiWarning } from 'react-icons/pi';
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Popover,
  Text,
  Title,
  Tooltip,
} from 'rizzui';
import UserForm from '../user-form';

export function TableActions({
  row,
  onDelete,
  title,
}: {
  row?: User;
  onDelete?: () => void;
  title: string;
}) {
  const { openModal } = useModal();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success(`${title} supprimé avec succès!`);
      queryClient.invalidateQueries({ queryKey: ['users'] });
      onDelete?.();
    },
    onError: (error: Error) => {
      toast.error(`Échec de la suppression du ${title}: ${error.message}`);
    },
  });

  const handleDelete = () => {
    if (row?.id) {
      mutation.mutate(row.id);
    }
  };
  return (
    <Flex align="center" justify="end" gap="3" className="pe-4">
      <Tooltip size="sm" content={'View/Edit'} placement="top" color="invert">
        <ActionIcon
          size="sm"
          variant="outline"
          onClick={() =>
            openModal({
              view: <UserForm type="Edit" title="User" FormData={row} />,
              customSize: '850px',
            })
          }
        >
          <PencilIcon className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
      <Popover placement="left">
        <Popover.Trigger>
          <ActionIcon
            size="sm"
            variant="outline"
            className="hover:border-red hover:text-red-dark"
          >
            <TrashIcon className="h-4 w-4" />
          </ActionIcon>
        </Popover.Trigger>
        <Popover.Content className="!z-0">
          {({ setOpen }) => (
            <Box className="w-56 pb-2 pt-1 text-left rtl:text-right">
              <Title
                as="h6"
                className="mb-0.5 flex items-start text-sm sm:items-center"
              >
                <PiWarning className="text me-2 size-6" /> Supprimer {title} !
              </Title>
              <Text className="mt-2 leading-relaxed">
                Êtes-vous sûr de vouloir supprimer ce {title}?
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
                  onClick={() => {
                    handleDelete();
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
    </Flex>
  );
}
