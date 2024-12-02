'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import {
  addDirectory,
  updateDirectory,
} from '@/server/services/directory.service';
import { DirectoryType } from '@/types/directory.type';
import {
  CreateDirectoryInput,
  createDirectorySchema,
} from '@/validators/create-directory.schema';

import { Form } from '@core/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PiXBold } from 'react-icons/pi';
import { ActionIcon, Button, Input, Loader, Text, Title, cn } from 'rizzui';

const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
  loading: () => (
    <div className="grid h-[111px] place-content-center">
      <Loader variant="spinner" />
    </div>
  ),
});

interface EditDirectoryFormProps {
  parentId?: number;
  FormData?: DirectoryType;
  title: TitleType;
  className?: string;
  type?: 'Create' | 'Edit';
}

const initialValues = {
  name: '',
  description: '',
  parentId: undefined,
};

type TitleType = string;

type FormInputType = CreateDirectoryInput;

export default function DirectoryForm({
  parentId,
  FormData,
  type = 'Create',
  title,
  className,
}: EditDirectoryFormProps) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const validationSchema = createDirectorySchema;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (directoryData: CreateDirectoryInput) =>
      type === 'Create'
        ? addDirectory(directoryData)
        : updateDirectory(FormData!.id, directoryData),
  });

  const onSubmit: SubmitHandler<FormInputType> = async (formData) => {
    setLoading(true);
    mutation.mutate(
      { ...formData, parentId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['archives'] });
          setReset(initialValues);
          closeModal();
          toast.success(
            <Text as="b" fontWeight="medium" className="first-letter:uppercase">
              {title} {type === 'Create' ? 'created' : 'updated'} successfully
            </Text>
          );
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
            parentId: parentId || FormData?.parentId || undefined,
          },
        }}
        className="mt-6 grid gap-6"
      >
        {({ register, control, formState: { errors } }) => {
          return (
            <>
              <Input
                label={`Nom du ${title} `}
                placeholder={`Enter your ${title} name...`}
                labelClassName="font-medium text-gray-900 dark:text-white capitalize"
                {...register('name')}
                error={errors.name?.message}
              />
              <Controller
                control={control}
                name={'description'}
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
