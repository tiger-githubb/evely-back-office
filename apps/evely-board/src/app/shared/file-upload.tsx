'use client';

import SimpleBar from '@core/ui/simplebar';
import Upload from '@core/ui/upload';
import cn from '@core/utils/class-names';
import Image from 'next/image';
import React, { useRef } from 'react';
import {
  PiFile,
  PiFileCsv,
  PiFileDoc,
  PiFilePdf,
  PiFileXls,
  PiFileZip,
  PiTrashBold,
} from 'react-icons/pi';
import { ActionIcon, Text } from 'rizzui';

type AcceptedFiles = 'img' | 'pdf' | 'csv' | 'imgAndPdf' | 'all';

interface FileInputProps {
  label?: string;
  accept?: AcceptedFiles;
  multiple?: boolean;
  value?: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  className?: string;
}

const fileTypeIcons = {
  'text/csv': <PiFileCsv className="h-5 w-5" />,
  'text/plain': <PiFile className="h-5 w-5" />,
  'application/pdf': <PiFilePdf className="h-5 w-5" />,
  'application/xml': <PiFileXls className="h-5 w-5" />,
  'application/zip': <PiFileZip className="h-5 w-5" />,
  'application/gzip': <PiFileZip className="h-5 w-5" />,
  'application/msword': <PiFileDoc className="h-5 w-5" />,
} as { [key: string]: React.ReactElement };

export const FileUpload: React.FC<FileInputProps> = ({
  label = 'Upload File',
  accept = 'all',
  multiple = false,
  value,
  onChange,
  error,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files.length > 0) {
      onChange(files[0]);
    } else {
      onChange(null);
    }
  }

  function handleFileRemove() {
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
    <div className={cn(className)}>
      <Upload
        label={label}
        ref={inputRef}
        accept={accept}
        multiple={false}
        onChange={handleFileSelect}
        className="mb-6 min-h-[100px] justify-center border-dashed bg-gray-50 dark:bg-transparent"
      />

      {value && (
        <SimpleBar className="max-h-[280px]">
          <div className="flex min-h-[58px] w-full items-center rounded-xl border border-muted px-3 dark:border-gray-300">
            <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-muted bg-gray-50 object-cover px-2 py-1.5 dark:bg-transparent">
              {value.type.includes('image') ? (
                <Image
                  src={URL.createObjectURL(value)}
                  fill
                  className="object-contain"
                  priority
                  alt={value.name}
                  sizes="(max-width: 768px) 100vw"
                />
              ) : (
                <>
                  {fileTypeIcons[value.type] || <PiFile className="h-5 w-5" />}
                </>
              )}
            </div>
            <div className="truncate px-2.5">{value.name}</div>
            <ActionIcon
              onClick={handleFileRemove}
              size="sm"
              variant="flat"
              color="danger"
              className="ms-auto flex-shrink-0 p-0 dark:bg-red-dark/20"
            >
              <PiTrashBold className="w-6" />
            </ActionIcon>
          </div>
        </SimpleBar>
      )}

      {error && <Text className="mt-2 text-red-600">{error}</Text>}
    </div>
  );
};
