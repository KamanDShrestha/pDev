import { Outlet } from 'react-router-dom';
import Logo from '../components/Logo';
import { ModeToggle } from '../components/ThemeToggleButton';

const AuthLayout = () => {
  return (
    <div>
      <div className='absolute hidden top-5 left-5 sm:block'>
        <Logo />
      </div>
      <div className='absolute top-5 right-5'>
        <ModeToggle />
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
