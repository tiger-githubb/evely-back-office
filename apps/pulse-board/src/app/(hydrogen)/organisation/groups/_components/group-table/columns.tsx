'use client';

import ColorBadge from '@/app/shared/table/colors-badge';
import { GroupType } from '@/types/group.type';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import { TableActions } from './table-actions';

const columnHelper = createColumnHelper<GroupType>();

export const GetDataColumns = [
  // columnHelper.display({
  //   id: 'select',
  //   size: 50,
  //   header: ({ table }) => (
  //     <Checkbox
  //       className="ps-3.5"
  //       aria-label="Sélectionnez toutes les lignes"
  //       checked={table.getIsAllPageRowsSelected()}
  //       onChange={() => table.toggleAllPageRowsSelected()}
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       className="ps-3.5"
  //       aria-label="Sélectionner la ligne"
  //       checked={row.getIsSelected()}
  //       onChange={row.getToggleSelectedHandler()}
  //     />
  //   ),
  // }),
  columnHelper.display({
    id: 'id',
    size: 100,
    header: 'ID',
    cell: ({ row }) => <>#{row.original.id}</>,
  }),
  columnHelper.display({
    id: 'parentId',
    size: 50,
    header: 'Parent',
    cell: ({ row }) => <>#{row.original.parentId}</>,
  }),

  columnHelper.accessor('name', {
    id: 'name',
    size: 200,
    header: 'Nom du groupe',
    cell: ({ row }) => row.original.name,
  }),
  columnHelper.display({
    id: 'color',
    size: 50,
    header: 'Couleur',

    cell: ({ row }) => <ColorBadge color={row.original.color ?? ''} />,
  }),

  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Date de création',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
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
        title="groupe"
        row={row.original}
        onDelete={() => meta?.handleDeleteRow?.(row.original)}
      />
    ),
  }),
];
