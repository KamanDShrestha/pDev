import useDocumentTitle from '../../services/getTitle';
import UserProfile from '../../components/UserProfile';
import useGetAllUsers from '../../services/users/getAllUsers';

const UsersAction = () => {
  const { data: users } = useGetAllUsers();

  useDocumentTitle('Users - SelfSync');
  return (
    <>
      <div className='flex flex-wrap justify-center gap-5'>
        {users &&
          users.map((user) => <UserProfile user={user} key={user._id} />)}
      </div>
    </>
  );
};

export default UsersAction;
