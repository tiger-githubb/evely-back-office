'use client';

import DirectoryForm from '@/app/shared/file/manager/directory-form';
import FileForm from '@/app/shared/file/manager/file-form';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiCloudArrowUpDuotone, PiFolderBold } from 'react-icons/pi';
import { Button, cn } from 'rizzui';

interface HeaderActionProps {
  className?: string;
  directoryId?: number;
}

export default function HeaderAction({
  directoryId,
  className,
}: HeaderActionProps) {
  const { openModal } = useModal();
  return (
    <>
      <div className={cn(className, 'mt-4 flex flex-wrap items-center gap-4')}>
        <Button
          variant="outline"
          className="w-full text-xs @lg:w-auto sm:text-sm"
          onClick={() =>
            openModal({
              view: (
                <DirectoryForm
                  parentId={directoryId}
                  type="Create"
                  title="Dossier"
                />
              ),
              customSize: '700px',
            })
          }
        >
          <PiFolderBold className="me-1.5 h-[17px] w-[17px]" />
          Nouveau dossier
        </Button>
        <Button
          className="w-full text-xs capitalize @lg:w-auto sm:text-sm"
          onClick={() =>
            openModal({
              view: (
                <FileForm
                  parentId={directoryId}
                  type="Create"
                  title="Fichier"
                />
              ),
              customSize: '720px',
            })
          }
        >
          <PiCloudArrowUpDuotone className="me-1.5 h-[17px] w-[17px]" />
          Ajouter un Fichier
        </Button>
      </div>
    </>
  );
}
