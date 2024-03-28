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
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

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
      header: 'First Name',
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'preferredJourney',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Preferred Journey
            <ArrowUpDown className='w-4 h-4 ml-2' />
          </Button>
        );
      },
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
    {
      accessorKey: 'actions',
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
      <div>
        {view === 'list' ? (
          <p
            onClick={() => setView('grid')}
            className={cn(
              buttonVariants({ variant: 'link' }),
              'text-right items-end'
            )}
          >
            Grid view of users
          </p>
        ) : (
          <p
            onClick={() => setView('list')}
            className={cn(
              buttonVariants({ variant: 'link' }),
              'text-right items-end'
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
