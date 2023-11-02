import { Outlet } from 'react-router-dom';
import Logo from '../components/Logo';
import NavBar from '../components/NavBar';
import { ModeToggle } from '../components/ThemeToggleButton';

const UserLayout = () => {
  return (
    <div>
      <div className='flex justify-between p-5'>
        <Logo />
        <div className='flex gap-3 px-2'>
          <NavBar />
          <ModeToggle />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default UserLayout;
