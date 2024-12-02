'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import dynamic from 'next/dynamic';
import { PiPlusBold } from 'react-icons/pi';
import { Button, cn } from 'rizzui';

const ModuleForm = dynamic(() => import('./module-form'), {
  ssr: false,
});

interface HeaderActionProps {
  title: string;
  className?: string;
}

export default function HeaderAction({ title, className }: HeaderActionProps) {
  const { openModal } = useModal();
  return (
    <>
      <div className={cn(className, 'mt-4 flex flex-wrap items-center gap-4')}>
        <Button
          className="w-full text-xs @lg:w-auto sm:text-sm"
          onClick={() =>
            openModal({
              view: <ModuleForm title={title} />,
              customSize: '720px',
            })
          }
        >
          <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
          Ajouter {title}
        </Button>
      </div>
    </>
  );
}
