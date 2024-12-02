'use client';

import StatusBadge from '@/app/shared/table/status-badge';
import { User } from '@/types/user.type';
import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import { Badge, Button, Checkbox, Flex, Popover } from 'rizzui';
import { TableActions } from './table-actions';
import { getRandomAvatar } from '@/utils/user-profile-image';

const columnHelper = createColumnHelper<User>();

export const usersColumns = [
  columnHelper.display({
    id: 'select',
    size: 50,
    header: ({ table }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Sélectionnez toutes les lignes"
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Sélectionner la ligne"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  }),
  columnHelper.display({
    id: 'id',
    size: 100,
    header: 'User ID',
    cell: ({ row }) => <>#{row.original.id}</>,
  }),
  columnHelper.accessor('firstName', {
    id: 'firstName',
    size: 300,
    header: 'Name',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={getRandomAvatar(row.original.id)}
        name={`${row.original.firstName} ${row.original.lastName}`}
        description={row.original.email}
      />
    ),
  }),
  columnHelper.accessor('role.name', {
    id: 'role',
    size: 150,
    header: 'Role',
    cell: ({ row }) => row.original.role.name,
  }),
  columnHelper.display({
    id: 'permissions',
    size: 400,
    header: 'Permissions',
    cell: ({ row }) => (
      <Flex align="center" gap="2">
        {row.original.role.permissionsPerModule.map((module, index) => (
          <Popover size="sm" key={index}>
            <Popover.Trigger>
              <Button variant="outline">{module.moduleName}</Button>
            </Popover.Trigger>
            <Popover.Content>
              <div className="flex flex-col gap-2">
                {module.permissions.map((permission, permIndex) => (
                  <Badge
                    rounded="lg"
                    key={permIndex}
                    variant="outline"
                    className="border-muted font-normal text-gray-500"
                  >
                    {permission}
                  </Badge>
                ))}
              </div>
            </Popover.Content>
          </Popover>
        ))}
      </Flex>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Created',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('active', {
    id: 'status',
    size: 150,
    header: 'Status',
    enableSorting: false,
    cell: ({ row }) => StatusBadge({ isActive: row.original.active }),
  }),
  columnHelper.display({
    id: 'action',
    size: 140,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <TableActions
        title="Utilisateur"
        row={row.original}
        onDelete={() => meta?.handleDeleteRow?.(row.original)}
      />
    ),
  }),
];
