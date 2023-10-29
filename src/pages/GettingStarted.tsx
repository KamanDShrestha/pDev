import { Link } from 'react-router-dom';
import { buttonVariants } from '../components/ui/button';
import { ModeToggle } from '../components/ThemeToggleButton';

const GettingStarted = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center w-screen h-screen p-10'>
        <div className='absolute top-5 right-5'>
          <ModeToggle />
        </div>
        <div>
          <div className='flex flex-col'>
            <span className='text-xl font-semibold'>
              Find the community you can thrive with. Find the roadmap through
              which you can be best.
            </span>
            <span className='font-medium text-md'>
              Improve yourself. Be better. Conquer yourself.
            </span>
          </div>
          <div className='flex items-start justify-start mt-2'>
            <Link
              className={buttonVariants({ variant: 'default' })}
              to={'/login'}
            >
              Getting Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default GettingStarted;
