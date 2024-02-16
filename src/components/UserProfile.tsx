import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import { UpdateUserRoleData, User } from '../types';
import useUpdateUserRole from '../services/users/updateUserRole';
import { useState } from 'react';
import useDeleteUser from '../services/users/deleteUser';
import LoadingSpinner from './LoadingSpinner';
import { format } from 'date-fns';
import { LucideDot } from 'lucide-react';
import { Badge } from './ui/badge';

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const { mutate: updateRole, isLoading: isUpdatingRole } = useUpdateUserRole();
  const { mutate: deleteUser, isLoading: isDeletingUser } = useDeleteUser();
  const roles = {
    qha: 'Qualified Health Personnel',
    admin: 'Admin',
    user: 'User',
  };

  const [userRoleUpdate, setUserRoleUpdate] = useState({
    userId: user._id,
    role: '',
  } as UpdateUserRoleData);

  return (
    <Card key={user._id} className='flex flex-wrap max-w-[500px]'>
      <CardHeader>
        <img src='https://picsum.photos/200' alt='user' className='w-20 h-20' />
        <CardTitle>
          {user.firstName} {user.lastName}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-2 p-5'>
        <div className='space-x-3'>
          <span className='font-medium'>Email:</span>
          <span>{user.email}</span>
        </div>
        <div className='space-x-3'>
          <span className='font-medium'>DOB:</span>
          <span className=''>{format(user.dateOfBirth, 'PPP')}</span>
        </div>
        <div className='space-x-3'>
          <span className='font-medium'>Preferred Journey:</span>
          <span className=''>{user.preferredJourney}</span>
        </div>
        <div className='space-x-3'>
          <span className='font-medium'>Joined Date:</span>
          <span>{format(user.createdAt, 'PPP')}</span>
        </div>
        <div>
          <div>
            The user is currently acknowledged as
            <strong> {roles[user.role as keyof typeof roles]}.</strong>
          </div>
          <div className='m-3 space-y-2'>
            <p>Select the required option to change the role:</p>
            <Select
              onValueChange={(chosenRole) => {
                setUserRoleUpdate({ userId: user._id, role: chosenRole });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select a role' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  {Object.entries(roles).map(
                    (role) =>
                      role[0] !== 'admin' && (
                        <SelectItem value={role[0]} key={role[0]}>
                          {role[1]}
                        </SelectItem>
                      )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            {userRoleUpdate.role && (
              <Button
                onClick={() => {
                  updateRole(userRoleUpdate);
                }}
              >
                {isUpdatingRole ? <LoadingSpinner /> : 'Update Role'}
              </Button>
            )}
          </div>
        </div>
        <div>
          {user.completedJourney.length !== 0 ? (
            <p>
              The user have completed following journeys:
              {user.completedJourney.map((journey, index) => (
                <span className='flex' key={index}>
                  <LucideDot className='' />
                  <span>{journey}</span>
                </span>
              ))}
            </p>
          ) : (
            <p>The user has not completed any journey yet.</p>
          )}
        </div>
        <div className='text-sm'>
          {user.hasSubscribed ? (
            <Badge variant={'default'}> Subscribed</Badge>
          ) : (
            <Badge variant={'default'}> Not Subscribed</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => deleteUser({ id: user._id })}
          variant={'destructive'}
        >
          {isDeletingUser ? <LoadingSpinner /> : 'Delete User'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
