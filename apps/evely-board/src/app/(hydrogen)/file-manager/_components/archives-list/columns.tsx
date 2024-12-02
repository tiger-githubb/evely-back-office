// src/app/(hydrogen)/file-manager/_components/archives-list/columns.tsx
'use client';

import Favorite from '@/app/shared/file/manager/favorite';
import ColorBadge from '@/app/shared/table/colors-badge';
import DisplayCell, { FileCell } from '@/app/shared/table/display-cell';
import { ArchiveType } from '@/types/archive.type';
import { bytesToMegabytes } from '@/utils/coverter';
import { getFileIcon } from '@/utils/file-icons';
import { getRandomAvatar } from '@/utils/user-profile-image';
import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { Flex, Text } from 'rizzui';
import { TableActions } from './table-actions';

const columnHelper = createColumnHelper<ArchiveType>();

export const allArchivesColumns = [
  columnHelper.accessor('name', {
    id: 'name',
    size: 400,
    header: 'Nom du fichier',
    enableResizing: true,
    cell: ({ row }) =>
      row.original.fileType === 'dir' ? (
        <Link
          href={`/file-manager/${row.original.id}`}
          className="hover:underline hover:underline-offset-2"
        >
          <FileCell
            src={getFileIcon(row.original.extension)}
            alt={row.original.extension ?? ''}
            name={row.original.name}
            description={row.original.description}
          />
        </Link>
      ) : (
        <FileCell
          src={getFileIcon(row.original.extension)}
          alt={row.original.extension ?? ''}
          name={row.original.name}
          description={row.original.description}
        />
      ),
  }),

  columnHelper.accessor('owner', {
    id: 'firstName',
    size: 300,
    header: 'Propriétaire',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={getRandomAvatar(row.original.owner.id)}
        name={`${row.original.owner.firstName} ${row.original.owner.lastName}`}
        description={row.original.owner.email}
      />
    ),
  }),
  columnHelper.accessor('group.name', {
    id: 'group.name',
    size: 100,
    header: 'Groupe',
    enableSorting: true,

    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <ColorBadge color={row.original.group.color ?? ''} />
        <Text className="text-nowrap text-gray-500">
          {row.original.group.name}
        </Text>
      </div>
    ),
  }),

  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Created',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.accessor('fileType', {
    id: 'type',
    size: 130,
    header: 'Type',
    enableSorting: false,
    cell: ({ row }) => (
      <DisplayCell
        valueOne={row.original.fileType}
        valueTwo={bytesToMegabytes(row.original.size)}
      />
    ),
  }),
  columnHelper.display({
    id: 'action',
    size: 120,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <TableActions
        title={row.original.fileType === 'dir' ? 'directory' : 'file'}
        row={row.original}
        onDelete={() => meta?.handleDeleteRow?.(row.original)}
      />
    ),
  }),
  columnHelper.display({
    id: 'more-action',
    size: 100,
    header: '',
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="end">
        <Favorite />
        {/* <MoreActions /> */}
      </Flex>
    ),
  }),
];
