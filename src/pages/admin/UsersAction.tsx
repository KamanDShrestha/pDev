import { cn } from '../../lib/utils';
import ListViewUsers from '../../components/ListViewUsers';
import useDocumentTitle from '../../services/getTitle';
import { Button, buttonVariants } from '../../components/ui/button';
import { useState } from 'react';
import GridViewUsers from '../../components/GridViewUsers';
import useGetAllUsers from '../../services/users/getAllUsers';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '../../types';
import useDeleteUser from '../../services/users/deleteUser';
import { ArrowUpDown } from 'lucide-react';

const UsersAction = () => {
  const [view, setView] = useState('list');

  const { mutate: deleteUser } = useDeleteUser();
  const { data } = useGetAllUsers(
    undefined,
    undefined,
    undefined,
    0,
    0,
    undefined,
    undefined
  );
  const { users } = data || {};
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: '_id',
      header: 'ID',
    },
    {
      accessorKey: 'firstName',
      header: ({ column }) => {
        return (
          <span
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='flex items-center cursor-pointer'
          >
            First Name
            <ArrowUpDown className='w-4 h-4 ml-2' />
          </span>
        );
      },
    },
    {
      accessorKey: 'lastName',
      header: ({ column }) => {
        return (
          <span
            className='flex items-center cursor-pointer'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Last Name
            <ArrowUpDown className='w-4 h-4 ml-2' />
          </span>
        );
      },
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <span
            className='flex items-center cursor-pointer'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown className='w-4 h-4 ml-2' />
          </span>
        );
      },
    },
    {
      accessorKey: 'preferredJourney',
      header: ({ column }) => {
        return (
          <p
            className='flex items-center cursor-pointer'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Preferred Journey
            <ArrowUpDown className='w-4 h-4 ml-2' />
          </p>
        );
      },
    },
    {
      accessorKey: 'role',
      header: ({ column }) => {
        return (
          <span
            className='flex items-center cursor-pointer'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Role
            <ArrowUpDown className='w-4 h-4 ml-2' />
          </span>
        );
      },
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: ({ row }) => {
        const user = row.original;
        function handleUserDelete(userId: string) {
          deleteUser({ id: userId });
        }
        return (
          <div>
            <Button
              className={cn(buttonVariants({ variant: 'destructive' }))}
              onClick={() => handleUserDelete(user._id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  useDocumentTitle('Users - SelfSync');
  return (
    <>
      <div className='text-right'>
        {view === 'list' ? (
          <p
            onClick={() => setView('grid')}
            className={cn(
              buttonVariants({ variant: 'link' }),
              'cursor-pointer'
            )}
          >
            Grid view of users
          </p>
        ) : (
          <p
            onClick={() => setView('list')}
            className={cn(
              buttonVariants({ variant: 'link' }),
              'cursor-pointer'
            )}
          >
            View as list
          </p>
        )}
      </div>
      {view === 'list' ? (
        <ListViewUsers />
      ) : (
        users && <GridViewUsers columns={columns} data={users} />
      )}
    </>
  );
};

export default UsersAction;
