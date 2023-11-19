import { NavLink } from 'react-router-dom';
import { Button } from '../components/ui/button';

import { useAuthContext } from '../context/AuthProvider';
import useLogoutUser from '../services/userAuth/logoutUser';
import { IoIosArrowRoundForward } from 'react-icons/io';

const Home = () => {
  const { mutate } = useLogoutUser();
  const { user } = useAuthContext();
  console.log(user);
  function handleLogout() {
    mutate(user?.accessToken as string);
  }
  return (
    <div className='p-5 mt-20'>
      <div className='flex flex-col gap-5 mb-3'>
        <h1 className='text-7xl'>Sync yourself.</h1>
        <h2 className='text-4xl'>Let your transformation finds its rhythm.</h2>
        <NavLink to={'/journeys'} className='hover:underline'>
          <span className='flex items-center gap-3'>
            Embark onto your journey
            <IoIosArrowRoundForward />
          </span>
        </NavLink>
      </div>

      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Home;
