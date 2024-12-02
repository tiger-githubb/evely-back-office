'use client';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { getRoles } from '@/server/services/roles.service';
import { addUser, updateUser } from '@/server/services/users.service';
import { User } from '@/types/user.type';
import {
  CreateUserInput,
  createUserSchema,
} from '@/validators/create-user.schema';
import { Form } from '@core/ui/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Controller } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { PiXBold } from 'react-icons/pi';
import {
  ActionIcon,
  Button,
  Input,
  Loader,
  Select,
  Switch,
  Title,
} from 'rizzui';

interface UserFormProps {
  type?: 'Create' | 'Edit';
  title?: string;
  FormData?: User;
}

export default function UserForm({ type = 'Create', FormData }: UserFormProps) {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();

  const { data: rolesData, isLoading: isLoadingRoles } = useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
  });

  const roleOptions =
    rolesData?.data.map((role) => ({
      value: role.id,
      label: role.name,
    })) || [];

  const mutation = useMutation({
    mutationFn: (data: CreateUserInput) =>
      // Todo : Fix Update User Mutation
      type === 'Create' ? addUser(data) : updateUser(FormData!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(
        `User ${type === 'Create' ? 'created' : 'updated'} successfully`
      );
      closeModal();
    },
    onError: (error: Error) => {
      toast.error(
        error.message ||
          `Error ${type === 'Create' ? 'creating' : 'updating'} user`
      );
    },
  });

  return (
    <Form<CreateUserInput>
      validationSchema={createUserSchema as any}
      useFormProps={{
        defaultValues: {
          firstName: FormData?.firstName || '',
          lastName: FormData?.lastName || '',
          email: FormData?.email || '',
          password: FormData?.password || '',
          roleId: FormData?.roleId || 0,
          active: FormData?.active || false,
          isSuperAdmin: FormData?.isSuperAdmin || false,
        },
      }}
      onSubmit={(data) => mutation.mutate(data)}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2"
    >
      {({ register, control, formState: { errors } }) => (
        <>
          <div className="col-span-full flex items-center justify-between">
            <Title as="h4" className="font-semibold">
              Ajouter un nouvel utilisateur
            </Title>
            <ActionIcon size="sm" variant="text" onClick={closeModal}>
              <PiXBold className="h-auto w-5" />
            </ActionIcon>
          </div>

          <Input
            label="Prénom"
            placeholder="Entrez le prénom"
            {...register('firstName')}
            error={errors.firstName?.message}
          />

          <Input
            label="Nom de famille"
            placeholder="Entrez le nom de famille"
            {...register('lastName')}
            error={errors.lastName?.message}
          />

          <Input
            label="Email"
            placeholder="Entrez l'adresse e-mail"
            aria-autocomplete="none"
            defaultValue={''}
            className="col-span-full"
            autoComplete="off"
            {...register('email')}
            error={errors.email?.message}
          />

          <Input
            label="Mot de passe"
            placeholder="Entrez le mot de passe"
            defaultValue={''}
            className="col-span-full"
            autoComplete="off"
            {...register('password')}
            error={errors.password?.message}
          />

          <Controller
            name="isSuperAdmin"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Switch
                label="Super administrateur"
                checked={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name="active"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Switch label="Activer" checked={value} onChange={onChange} />
            )}
          />

          {isLoadingRoles ? (
            <div className="flex items-center space-x-2">
              <Loader size="sm" />
            </div>
          ) : (
            <Controller
              name="roleId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Role"
                  options={roleOptions}
                  value={value}
                  onChange={onChange}
                  error={errors.roleId?.message}
                  getOptionValue={(option) => option.value}
                  displayValue={(selected) =>
                    roleOptions.find((role) => role.value === selected)
                      ?.label ?? ''
                  }
                />
              )}
            />
          )}

          <div className="col-span-full flex items-center justify-end gap-4">
            <Button
              variant="outline"
              onClick={closeModal}
              className="w-full @xl:w-auto"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              isLoading={mutation.isPending}
              className="w-full @xl:w-auto"
            >
              {type} User
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
