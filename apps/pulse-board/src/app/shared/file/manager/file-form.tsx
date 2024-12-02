// src/app/shared/file/manager/file-form.tsx
'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import { addFile, updateFile } from '@/server/services/files.service';
import { FileType } from '@/types/file.type';
import {
  CreateFileInput,
  createFileSchema,
} from '@/validators/create-file.schema';

import { Form } from '@core/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PiXBold } from 'react-icons/pi';

import { ActionIcon, Button, Input, Loader, Text, Title, cn } from 'rizzui';
import { FileUpload } from '../../file-upload';

const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
  loading: () => (
    <div className="grid h-[111px] place-content-center">
      <Loader variant="spinner" />
    </div>
  ),
});

interface EditFileFormProps {
  parentId?: number;
  FormData?: FileType;
  title: TitleType;
  className?: string;
  type?: 'Create' | 'Edit';
}

const initialValues = {
  name: '',
  description: '',
  file: null,
  parentId: undefined,
};

type TitleType = string;

type FormInputType = CreateFileInput;

export default function FileForm({
  parentId,
  FormData,
  type = 'Create',
  title,
  className,
}: EditFileFormProps) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const validationSchema = createFileSchema(type === 'Edit');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (fileData: CreateFileInput) =>
      type === 'Create'
        ? addFile(fileData)
        : updateFile(FormData!.id, fileData),
  });

  const onSubmit: SubmitHandler<FormInputType> = async (formData) => {
    console.log('Form Data:', formData);
    setLoading(true);
    mutation.mutate(
      { ...formData, parentId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['archives'] });
          setReset(initialValues);
          toast.success(
            <Text as="b" fontWeight="medium" className="first-letter:uppercase">
              {title} {type === 'Create' ? 'created' : 'updated'} successfully
            </Text>
          );
          closeModal();
        },
        onError: (error: any) => {
          toast.error(error.message || `Failed to save ${title}`);
          console.error(error);
        },
        onSettled: () => {
          setLoading(false);
        },
      }
    );
  };

  return (
    <div className={cn('max-w-full rounded-md p-6', className)}>
      <div className="flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          {title}
        </Title>
        <ActionIcon variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-5 w-5" />
        </ActionIcon>
      </div>

      <Form<FormInputType>
        onSubmit={onSubmit}
        resetValues={reset}
        validationSchema={validationSchema}
        useFormProps={{
          defaultValues: {
            name: FormData?.name,
            description: FormData?.description,
            parentId: parentId || FormData?.parentId,
          },
        }}
        className="mt-6 grid gap-6"
      >
        {({ register, control, formState: { errors } }) => {
          return (
            <>
              <Input
                label={`Nom du ${title}`}
                placeholder={`Enter your ${title} name...`}
                labelClassName="font-medium text-gray-900 dark:text-white capitalize"
                {...register('name')}
                error={errors.name?.message}
              />

              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <QuillEditor
                    value={value}
                    onChange={onChange}
                    label={`${title} description`}
                    className="[&>.ql-container_.ql-editor]:min-h-[100px]"
                    labelClassName="font-medium text-gray-900 dark:text-white capitalize"
                  />
                )}
              />

              {type === 'Create' && (
                <Controller
                  control={control}
                  name="file"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FileUpload
                      label={`${title} file`}
                      className="col-span-full"
                      accept="all" // or specify accepted file types
                      multiple={false}
                      value={value}
                      onChange={onChange}
                      error={error?.message}
                    />
                  )}
                />
              )}

              <div className="col-span-full mt-2 flex items-center justify-end">
                <Button
                  type="submit"
                  className="capitalize"
                  isLoading={isLoading}
                >
                  {type} {title}
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
}
