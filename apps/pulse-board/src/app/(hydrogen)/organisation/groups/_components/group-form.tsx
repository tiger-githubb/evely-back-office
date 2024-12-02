'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import { useCopyToClipboard } from '@core/hooks/use-copy-to-clipboard';
import { Form } from '@core/ui/form';
import { useMemo, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Controller, SubmitHandler } from 'react-hook-form';
import { PiChecksBold, PiFilesBold, PiXBold } from 'react-icons/pi';
import {
  ActionIcon,
  Button,
  Input,
  Select,
  Text,
  Title,
  Tooltip,
  cn,
} from 'rizzui';

import {
  addGroup,
  getGroups,
  updateGroup,
} from '@/server/services/groups.service';
import { GroupType } from '@/types/group.type';
import {
  CreateGroupInput,
  createGroupSchema,
} from '@/validators/create-group.schema';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface EditProfileFormProps {
  FormData?: GroupType;
  title: TitleType;
  className?: string;
  type?: 'Create' | 'Edit';
}

const initialValues = {
  name: '',
  parentId: null,
  color: null,
};

type TitleType = string;

type FormInputType = CreateGroupInput;

export default function GroupForm({
  FormData,
  type = 'Create',
  title,
  className,
}: EditProfileFormProps) {
  console.log('GroupForm rendered');
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const validationSchema = createGroupSchema;
  const queryClient = useQueryClient();
  const [isCopied, setIsCopied] = useState(false);
  const [state, copyToClipboard] = useCopyToClipboard();
  console.log('state', state);

  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: () => getGroups(),
  });
  const GroupData = useMemo(() => groups?.data || [], [groups]);

  const mutation = useMutation({
    mutationFn: (groupData: CreateGroupInput) =>
      type === 'Create'
        ? addGroup(groupData)
        : updateGroup(FormData!.id, groupData),
  });

  const onSubmit: SubmitHandler<FormInputType> = async (formData) => {
    console.log(formData);

    setLoading(true);
    mutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['groups'] });
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
  const handleCopyToClipboard = (rgba: string) => {
    copyToClipboard(rgba);
    setIsCopied(() => true);
    setTimeout(() => {
      setIsCopied(() => false);
    }, 3000);
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
            name: FormData?.name || '',
            parentId: FormData?.parentId || undefined,
            color: FormData?.color || '#000000', // Initialize with existing color or default
          },
        }}
        className="mt-6 grid gap-6"
      >
        {({ register, control, watch, formState: { errors } }) => {
          console.log(errors);
          const getColor = watch('color');
          const colorCode = `${getColor ?? FormData?.color}`;
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
                name="parentId"
                control={control}
                render={({ field: { name, onChange, value } }) => (
                  <Select
                    options={GroupData.map((group) => ({
                      value: group.id.toString(),
                      label: group.name,
                    }))}
                    value={value ?? ''}
                    onChange={(selectedValue) =>
                      onChange(Number(selectedValue))
                    }
                    name={name}
                    label="Parent"
                    className="col-span-full"
                    error={errors.parentId?.message}
                    getOptionValue={(option) => option.value}
                    displayValue={(selected: string) =>
                      GroupData.find(
                        (option) => option.id.toString() === selected
                      )?.name ?? selected
                    }
                    dropdownClassName="!z-[1]"
                    inPortal={false}
                  />
                )}
              />

              <Input
                label="Color"
                placeholder="Color"
                readOnly
                inputClassName="hover:border-muted"
                suffix={
                  <Tooltip
                    size="sm"
                    content={isCopied ? 'Copied to Clipboard' : 'Click to Copy'}
                    placement="top"
                    className="z-[1000]"
                  >
                    <ActionIcon
                      variant="text"
                      title="Click to Copy"
                      onClick={() => handleCopyToClipboard(colorCode)}
                      className="-mr-3"
                    >
                      {isCopied ? (
                        <PiChecksBold className="h-[18px] w-[18px]" />
                      ) : (
                        <PiFilesBold className="h-4 w-4" />
                      )}
                    </ActionIcon>
                  </Tooltip>
                }
                value={colorCode}
              />
              <Controller
                control={control}
                name="color"
                render={({ field: { onChange, value } }) => (
                  <HexColorPicker color={value} onChange={onChange} />
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
