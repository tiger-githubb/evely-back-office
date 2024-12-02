'use client';

import { getUsers } from '@/server/services/users.service';
import { User } from '@/types/user.type';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TableFooter from '@core/components/table/footer';
import TablePagination from '@core/components/table/pagination';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { Text } from 'rizzui';
import { usersColumns } from './columns';
import Filters from './filters';

export default function UsersTable() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  const UserData = useMemo(() => data?.data || [], [data]);

  const { table, setData } = useTanStackTable<User>({
    tableData: UserData || [],
    columnConfig: usersColumns,
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
    if (UserData.length > 0) {
      setData(UserData);
    }
  }, [UserData, setData]);

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
