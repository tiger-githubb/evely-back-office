'use client';

import { getGroups } from '@/server/services/groups.service';
import { GroupType } from '@/types/group.type';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TableFooter from '@core/components/table/footer';
import TablePagination from '@core/components/table/pagination';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { Text } from 'rizzui';
import { GetDataColumns } from './columns';
import Filters from './filters';

export default function GroupsTable() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups,
  });
  const GetData = useMemo(() => data?.data || [], [data]);

  const { table, setData } = useTanStackTable<GroupType>({
    tableData: GetData || [],
    columnConfig: GetDataColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
          table.resetRowSelection();
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
          table.resetRowSelection();
        },
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    if (GetData.length > 0) {
      setData(GetData);
    }
  }, [GetData, setData]);

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <Text>Error: {error.message}</Text>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <Filters table={table} />
      <Table
        isLoading={isLoading}
        table={table}
        variant="modern"
        classNames={{
          container: 'border border-muted rounded-md',
          rowClassName: 'last:border-0',
        }}
      />
      <TableFooter table={table} />
      <TablePagination table={table} className="py-4" />
    </div>
  );
}
