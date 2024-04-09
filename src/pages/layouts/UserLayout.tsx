import { Outlet } from 'react-router-dom';
import Logo from '../../components/Logo';
import NavBar from '../..//components/NavBar';
import { ModeToggle } from '../../components/ThemeToggleButton';
import Footer from '../../components/Footer';

const UserLayout = () => {
  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>
      <div className='flex justify-between p-5 '>
        <div className='hidden lg:block'>
          <Logo />
        </div>
        <div className='flex justify-between gap-3 px-2'>
          <NavBar />

          <ModeToggle />
        </div>
      </div>
      <div className='relative flex-grow p-5'>
        <Outlet />
      </div>
      {window.location.pathname === '/home' ? null : <Footer />}
    </div>
  );
};

export default UserLayout;
