import { IoIosArrowRoundBack } from 'react-icons/io';

import { Link } from 'react-router-dom';

const JourneyNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen gap-10'>
      <div className='flex flex-col items-center'>
        <h1 className='font-semibold text-7xl'>404</h1>{' '}
        <h2 className='text-2xl'> You are not authorized to view this page.</h2>
      </div>
      <Link to={'/login'} className='hover:underline'>
        <span className='flex items-center gap-3'>
          <IoIosArrowRoundBack />
          Login to view this page
        </span>
      </Link>
    </div>
  );
};

export default JourneyNotFound;
