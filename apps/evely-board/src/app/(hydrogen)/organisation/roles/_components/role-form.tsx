'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import { getModules } from '@/server/services/modules.service';
import { getPermissions } from '@/server/services/permissions.service';
import { addRole, updateRole } from '@/server/services/roles.service';
import { RoleType } from '@/types/role.type';
import {
  CreateRoleInput,
  createRoleSchema,
} from '@/validators/create-role.schema';
import { useCopyToClipboard } from '@core/hooks/use-copy-to-clipboard';
import { Form } from '@core/ui/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  PiCheckBold,
  PiChecksBold,
  PiFilesBold,
  PiXBold,
} from 'react-icons/pi';
import {
  ActionIcon,
  AdvancedCheckbox,
  Button,
  CheckboxGroup,
  Input,
  Title,
  Tooltip,
} from 'rizzui';

interface RoleFormProps {
  role?: RoleType;
  isUpdateMode?: boolean;
}

export default function RoleForm({
  role,
  isUpdateMode = false,
}: RoleFormProps) {
  const { closeModal } = useModal();
  const [isCopied, setIsCopied] = useState(false);
  const [state, copyToClipboard] = useCopyToClipboard();
  const queryClient = useQueryClient();

  const { data: modulesData } = useQuery({
    queryKey: ['modules'],
    queryFn: getModules,
  });
  const Modules = modulesData?.data || [];

  const { data: permissionsData } = useQuery({
    queryKey: ['permissions'],
    queryFn: getPermissions,
  });
  const Permissions = permissionsData?.data || [];

  const { mutate: createRole, isPending: isCreatePending } = useMutation({
    mutationFn: addRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success('Role created successfully');
      closeModal();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create role');
    },
  });

  const { mutate: mutateUpdate, isPending: isUpdatePending } = useMutation({
    mutationFn: (data: CreateRoleInput) => updateRole(role!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success('Role updated successfully');
      closeModal();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update role');
    },
  });

  const onSubmit: SubmitHandler<CreateRoleInput> = (data) => {
    if (isUpdateMode) {
      // Todo: Fix Role Color Update.
      mutateUpdate(data);
    } else {
      createRole(data);
    }
  };

  const handleCopyToClipboard = (rgba: string) => {
    copyToClipboard(rgba);
    setIsCopied(() => true);
    setTimeout(() => {
      setIsCopied(() => false);
    }, 3000);
  };

  return (
    <Form<CreateRoleInput>
      resetValues={
        role
          ? {
              name: role.name,
              color: role.color,
              permissionsPerModule: role.permissionsPerModule.map((item) => ({
                moduleId: item.module.id,
                permissionId: item.permission.id,
              })),
            }
          : {
              color: '#000000', // Default color for new roles
              permissionsPerModule: [],
              name: '',
            }
      }
      useFormProps={{
        defaultValues: {
          name: '',
          color: role?.color || '#000000', // Default color for new roles
          permissionsPerModule: [],
        },
      }}
      onSubmit={onSubmit}
      validationSchema={createRoleSchema}
      className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        const getColor = watch('color');
        const colorCode = `${getColor ?? role?.color}`;
        return (
          <>
            <div className="flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {isUpdateMode ? 'Modifier le rôle' : 'Ajouter un nouveau rôle'}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="Nom de rôle"
              placeholder="Nom de rôle"
              {...register('name')}
              error={errors.name?.message}
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
                <HexColorPicker
                  color={value ?? undefined}
                  onChange={onChange}
                />
              )}
            />

            <div className="grid gap-4 divide-y divide-y-reverse divide-gray-200">
              <Title as="h5" className="mb-2 text-base font-semibold">
                Accès aux rôles
              </Title>
              {Modules.map(({ name: moduleName, id: moduleId }) => (
                <div
                  key={moduleId}
                  className="flex flex-col gap-3 pb-4 md:flex-row md:items-center md:justify-between"
                >
                  <Title
                    as="h6"
                    className="font-medium text-gray-700 2xl:text-sm"
                  >
                    {moduleName}
                  </Title>
                  <Controller
                    name={`permissionsPerModule`}
                    control={control}
                    defaultValue={[]}
                    render={({ field: { onChange, value = [] } }) => {
                      const modulePermissions = value
                        .filter((item: any) => item.moduleId === moduleId)
                        .map((item: any) => item.permissionId.toString());

                      const handlePermissionChange: React.Dispatch<
                        React.SetStateAction<string[]>
                      > = (newValue) => {
                        const selectedPermissions = Array.isArray(newValue)
                          ? newValue
                          : newValue(modulePermissions);

                        const otherModulesPermissions = value.filter(
                          (item: any) => item.moduleId !== moduleId
                        );

                        const newPermissions = selectedPermissions.map(
                          (permId) => ({
                            moduleId: moduleId,
                            permissionId: parseInt(permId),
                          })
                        );

                        onChange([
                          ...otherModulesPermissions,
                          ...newPermissions,
                        ]);
                      };

                      return (
                        <CheckboxGroup
                          values={modulePermissions}
                          setValues={handlePermissionChange}
                          className="grid grid-cols-3 gap-4 md:flex"
                        >
                          {Permissions.map(
                            ({ id: permissionId, name: permissionName }) => (
                              <AdvancedCheckbox
                                key={permissionId}
                                name={`${moduleId}.${permissionId}`}
                                value={permissionId.toString()}
                                inputClassName="[&:checked~span>.icon]:block"
                                contentClassName="flex items-center justify-center"
                              >
                                <PiCheckBold className="icon me-1 hidden h-[14px] w-[14px] md:h-4 md:w-4" />
                                <span className="font-medium">
                                  {permissionName}
                                </span>
                              </AdvancedCheckbox>
                            )
                          )}
                        </CheckboxGroup>
                      );
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-4">
              <Button
                variant="outline"
                onClick={closeModal}
                className="w-full @xl:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isUpdateMode ? isUpdatePending : isCreatePending}
                className="w-full @xl:w-auto"
              >
                {isUpdateMode ? 'Update Role' : 'Create Role'}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
