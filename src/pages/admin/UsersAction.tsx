import useGetAllUsers from '../../services/users/getAllUsers';

const UsersAction = () => {
  const { data: users } = useGetAllUsers();
  console.log(users);

  return <div></div>;
};

export default UsersAction;
