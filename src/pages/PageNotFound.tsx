import { IoIosArrowRoundBack } from 'react-icons/io';

import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen gap-10'>
      <div className='flex flex-col items-center'>
        <h1 className='font-semibold text-7xl'>404</h1>{' '}
        <h2 className='text-2xl'>
          {' '}
          The page you are looking for is not found.
        </h2>
      </div>
      <Link to={'/'} className='hover:underline'>
        <span className='flex items-center gap-3'>
          <IoIosArrowRoundBack />
          Go back to home page
        </span>
      </Link>
    </div>
  );
};

export default PageNotFound;
