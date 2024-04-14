import { Outlet, useLocation } from 'react-router-dom';
import Logo from '../../components/Logo';
import NavBar from '../..//components/NavBar';
import { ModeToggle } from '../../components/ThemeToggleButton';
import Footer from '../../components/Footer';

const UserLayout = () => {
  const location = useLocation();
  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>
      <div className='flex justify-between p-5'>
        <div className='hidden lg:block'>
          <Logo />
        </div>
        <div className='flex justify-between w-full gap-3 px-2 lg:w-auto'>
          <NavBar />

          <ModeToggle />
        </div>
      </div>
      <div className='relative flex-grow p-5'>
        <Outlet />
      </div>
      {location.pathname === '/home' ? null : <Footer />}
    </div>
  );
};

export default UserLayout;
