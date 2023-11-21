import { Outlet } from 'react-router-dom';
import Logo from '../../components/Logo';
import NavBar from '../..//components/NavBar';
import { ModeToggle } from '../../components/ThemeToggleButton';

const UserLayout = () => {
  return (
    <div>
      <div className='flex justify-between p-5'>
        <div className='hidden lg:block'>
          <Logo />
        </div>
        <div className='flex justify-between w-screen gap-3 px-2'>
          <NavBar />
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className='p-5'>
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
