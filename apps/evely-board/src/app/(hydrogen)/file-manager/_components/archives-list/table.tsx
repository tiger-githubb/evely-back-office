'use client';

import FileTableFilters from '@/app/shared/file/manager/file-table-filters';
import { getArchives } from '@/server/services/archives.service';
import { ArchiveType } from '@/types/archive.type';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TableFooter from '@core/components/table/footer';
import TablePagination from '@core/components/table/pagination';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { Box, Text } from 'rizzui';
import { allArchivesColumns } from './columns';

export default function ArchivesListTable({
  className,
}: {
  className?: string;
}) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['archives'],
    queryFn: getArchives,
  });

  const ArchivesData = useMemo(() => data?.data || [], [data]);

  const { table, setData } = useTanStackTable<ArchiveType>({
    tableData: ArchivesData || [],
    columnConfig: allArchivesColumns,
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
    if (ArchivesData.length > 0) {
      setData(ArchivesData);
    }
  }, [ArchivesData, setData]);

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <Text>Error: {error.message}</Text>
      </div>
    );
  }

  return (
    <Box className={className}>
      <FileTableFilters table={table} />
      <Table isLoading={isLoading} table={table} variant="modern" />
      <TableFooter table={table} />
      <TablePagination table={table} className="py-4" />
    </Box>
  );
}
