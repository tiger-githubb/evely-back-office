'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import { addModule, updateModule } from '@/server/services/modules.service';
import { ModuleType } from '@/types/module.type';
import {
  CreateModuleInput,
  createModuleSchema,
} from '@/validators/create-module.schema';

import { Form } from '@core/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PiXBold } from 'react-icons/pi';
import { ActionIcon, Button, Input, Text, Title, cn } from 'rizzui';

interface EditProfileFormProps {
  FormData?: ModuleType;
  title: TitleType;
  className?: string;
  type?: 'Create' | 'Edit';
}

const initialValues = {
  name: '',
};

type TitleType = string;

type FormInputType = CreateModuleInput;

export default function ModuleForm({
  FormData,
  type = 'Create',
  title,
  className,
}: EditProfileFormProps) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const validationSchema = createModuleSchema;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (moduleData: CreateModuleInput) =>
      type === 'Create'
        ? addModule(moduleData)
        : updateModule(FormData!.id, moduleData),
  });

  const onSubmit: SubmitHandler<FormInputType> = async (formData) => {
    setLoading(true);
    mutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['modules'] });
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
    });
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
