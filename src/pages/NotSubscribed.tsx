import { IoIosArrowRoundBack } from 'react-icons/io';

import { Link } from 'react-router-dom';
import useDocumentTitle from '../services/getTitle';

const NotSubscribed = () => {
  useDocumentTitle('Not Subscribed - SelfSync');
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen gap-10'>
      <div className='flex flex-col items-center'>
        <h1 className='font-semibold text-7xl'>404</h1>{' '}
        <h2 className='text-2xl'>
          Subscribe to browse and embark onto the journey !
        </h2>
      </div>
      <Link to={'/home'} className='hover:underline'>
        <span className='flex items-center gap-3'>
          <IoIosArrowRoundBack />
          Back to home
        </span>
      </Link>
    </div>
  );
};

export default NotSubscribed;
