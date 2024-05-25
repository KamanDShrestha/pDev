import { Separator } from './ui/separator';
import Logo from './Logo';
import { NavLink } from 'react-router-dom';
const Footer = () => {
  return (
    <div className='mt-20'>
      <Separator />
      <footer>
        <div className='flex flex-wrap items-center justify-center gap-10 p-5 '>
          <p className='text-sm text-gray-400'>
            &copy; 2024{' '}
            <span className='font-medium text-gray-500'>SelfSync</span>
          </p>
          <NavLink to='mailto:kaman.shrestha@gmail.com'>
            <Logo />
          </NavLink>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
