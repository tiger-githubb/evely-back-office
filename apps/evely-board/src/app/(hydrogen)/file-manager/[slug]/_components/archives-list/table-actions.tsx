// src/app/(hydrogen)/file-manager/_components/archives-list/table-actions.tsx
'use client';

import DirectoryForm from '@/app/shared/file/manager/directory-form';
import FileForm from '@/app/shared/file/manager/file-form';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { downloadFile } from '@/server/actions/download.action';
import { deleteDirectory } from '@/server/services/directory.service';
import { deleteFile } from '@/server/services/files.service';
import { ArchiveType } from '@/types/archive.type';
import { FileType } from '@/types/file.type';
import PencilIcon from '@core/components/icons/pencil';
import TrashIcon from '@core/components/icons/trash';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { PiDownloadDuotone, PiSpinner, PiWarning } from 'react-icons/pi';
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

export function TableActions({
  row,
  onDelete,
  title,
}: {
  row?: ArchiveType;
  onDelete?: () => void;
  title: string;
}) {
  const { openModal } = useModal();
  const [isDownloading, setIsDownloading] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: row?.fileType === 'dir' ? deleteDirectory : deleteFile,
    onSuccess: () => {
      toast.success(`${title} supprimé avec succès!`);
      queryClient.invalidateQueries({ queryKey: ['archives'] });

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

  const handleEdit = () => {
    if (row) {
      openModal({
        view:
          row.fileType === 'dir' ? (
            <DirectoryForm type="Edit" title={title} FormData={row} />
          ) : (
            <FileForm type="Edit" title={title} FormData={row as FileType} />
          ), // Ensure type compatibility
        customSize: '850px',
      });
    }
  };

  const handleDownload = async () => {
    if (row?.id) {
      setIsDownloading(true);
      try {
        const response = await downloadFile(row.id);

        // Vérifier le type de contenu de la réponse
        const contentType = response.headers['content-type'];

        // Si le serveur renvoie une erreur sous forme de blob, la lire et lancer une exception
        if (contentType && contentType.includes('application/json')) {
          const errorText = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () =>
              reject("Erreur lors de la lecture du blob d'erreur");
            reader.readAsText(response.data);
          });
          const errorJson = JSON.parse(errorText) as { message?: string };
          throw new Error(errorJson.message || "Une erreur s'est produite");
        }

        // Créer un blob avec le type MIME correct
        const blob = new Blob([response.data], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        // Définir le nom du fichier en utilisant row.fileName et row.extension
        let fileName = row.fileName || 'file';
        if (row.extension) {
          if (row.extension.startsWith('.')) {
            fileName += row.extension;
          } else {
            fileName += '.' + row.extension;
          }
        }

        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();

        // Révoquer l'URL du blob pour libérer la mémoire
        window.URL.revokeObjectURL(url);

        toast.success(`${title} téléchargé avec succès !`);
      } catch (error: any) {
        console.error('Erreur lors du téléchargement du fichier :', error);
        toast.error(
          error.message ||
            "Une erreur s'est produite lors du téléchargement du fichier."
        );
      } finally {
        setIsDownloading(false);
      }
    }
  };

  return (
    <Flex align="center" justify="end" gap="3" className="pe-4">
      {row?.fileType !== 'dir' && (
        <Tooltip
          size="sm"
          content={'Télécharger'}
          placement="top"
          color="invert"
        >
          <ActionIcon size="sm" variant="outline" onClick={handleDownload}>
            {isDownloading ? (
              <PiSpinner className="h-4 w-4 animate-spin" />
            ) : (
              <PiDownloadDuotone className="h-4 w-4" />
            )}
          </ActionIcon>
        </Tooltip>
      )}
      <Tooltip size="sm" content={'View/Edit'} placement="top" color="invert">
        <ActionIcon size="sm" variant="outline" onClick={handleEdit}>
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
                  isLoading={mutation.isPending}
                  onClick={() => {
                    handleDelete();
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
