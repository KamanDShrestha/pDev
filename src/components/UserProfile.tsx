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
      <CardContent className='flex flex-col p-5'>
        <div>Email: {user.email}</div>
        <div>DOB: {user.dateOfBirth.split('T')[0]}</div>
        <div>Preferred Journey: {user.preferredJourney}</div>
        <div>Joined Date: {user.createdAt.split('T')[0]}</div>
        <div>
          <div>
            The user is currently listed as{' '}
            {roles[user.role as keyof typeof roles]}
          </div>
          <div className='m-3 space-y-1'>
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
              {user.completedJourney.map((journey) => (
                <span>{journey}</span>
              ))}
            </p>
          ) : (
            <p>The user has not completed any journey yet.</p>
          )}
        </div>
        <div className='text-sm'>
          {user.hasSubscribed
            ? 'The user has subscribed to the service.'
            : 'The user has not subscribed yet.'}
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
