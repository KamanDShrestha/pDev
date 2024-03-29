import useGetAllUsers from '../services/users/getAllUsers';
import LoadingSpinner from './LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

const UsersCountCard = () => {
  const { data, isLoading: isFetchingUsers } = useGetAllUsers(
    undefined,
    undefined,
    undefined,
    0,
    0,
    undefined,
    undefined
  );

  const { users, totalUsers } = data || {};

  return (
    <div className='flex items-center justify-around'>
      <Card>
        <CardHeader>
          <CardTitle>Total users count</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className='p-5 space-y-5 text-center'>
          {isFetchingUsers && <LoadingSpinner />}
          <CardTitle className='text-xl'>{totalUsers} users</CardTitle>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total subscribed users</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className='p-5 space-y-5 text-center'>
          {isFetchingUsers && <LoadingSpinner />}
          <CardTitle className='text-xl'>
            {users &&
              `${
                users?.filter((user) => user.hasSubscribed === true).length
              } users`}
          </CardTitle>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersCountCard;
