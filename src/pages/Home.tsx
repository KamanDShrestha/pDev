import { Button } from '../components/ui/button';
import { useAuthContext } from '../context/AuthProvider';
import useLogoutUser from '../services/userAuth/logoutUser';

const Home = () => {
  const { mutate } = useLogoutUser();
  const { user } = useAuthContext();
  console.log(user);
  function handleLogout() {
    mutate(user?.accessToken as string);
  }
  return (
    <div>
      Home
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Home;
