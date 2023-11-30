import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import UserProfile from '../../components/UserProfile';
import useGetAllUsers from '../../services/users/getAllUsers';

const UsersAction = () => {
  const { data: users, isLoading } = useGetAllUsers();

  console.log(users);

  const roles = {
    qha: 'Qualified Health Personnel',
    admin: 'Admin',
    user: 'User',
  };

  return (
    <>
      {users &&
        users.map((user) => (
          <Card key={user._id} className='flex flex-wrap'>
            <CardHeader>
              <img
                src='https://picsum.photos/200'
                alt='user'
                className='w-20 h-20'
              />
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
                <div className='m-3'>
                  {/* changing the role of the user */}
                  <p>Select the required option to change the role:</p>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a role' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        {Object.entries(roles).map(
                          (role) =>
                            role[0] !== 'admin' && (
                              <SelectItem value={role[0]}>{role[1]}</SelectItem>
                            )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
          </Card>
        ))}
    </>
  );
};

export default UsersAction;
