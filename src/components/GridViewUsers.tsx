import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Heading from './Heading';

interface GridViewUsersProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function GridViewUsers<TData, TValue>({
  columns,
  data,
}: GridViewUsersProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      <Heading>Grid view of users</Heading>
      <Card className='m-3 border-gray-600 min-h-fit'>
        <CardHeader className='mb-0'>
          <CardTitle>Filtering users</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-wrap items-center justify-around gap-3 '>
          <div className='flex items-center py-4'>
            <Input
              placeholder='Filter by emails...'
              value={
                (table.getColumn('email')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('email')?.setFilterValue(event.target.value)
              }
              className='lg:w-[600px] xl:w-[650px] md:w-[500px] sm:w-[400px] w-[300px]'
            />
          </div>
          <div className='flex items-center py-4'>
            <Input
              placeholder='Filter by names...'
              value={
                (table.getColumn('firstName')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('firstName')?.setFilterValue(event.target.value)
              }
              className='lg:w-[600px] xl:w-[650px] md:w-[500px] sm:w-[400px] w-[300px]'
            />
          </div>
        </CardContent>
      </Card>

      <div className='mt-10 border rounded-md'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className='flex items-center justify-center py-4 space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default GridViewUsers;
