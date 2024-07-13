import { useSearchParams } from 'react-router-dom';
import useGetSpecificUser from '../services/users/getSpecificUser';
import LoadingSpinner from './LoadingSpinner';
import { Input } from './ui/input';

import { RiArrowRightDoubleFill } from 'react-icons/ri';
const Conversation = () => {
  const [queryParams] = useSearchParams();

  const { data: user, isLoading: isFetchingUser } = useGetSpecificUser(
    queryParams.get('recipient')
  );
  return (
    <div className='m-3 md:border-r'>
      {!queryParams.get('recipient') && (
        <div className='flex items-center justify-center w-full h-full'>
          Have a conversation with people.
        </div>
      )}

      {queryParams.get('recipient') && !user && (
        <div className='flex items-center justify-center w-full h-full'>
          Select a valid user for having conversation
        </div>
      )}

      {isFetchingUser && <LoadingSpinner />}
      {user && (
        <div>
          <div className='flex items-center gap-3 p-2 m-5 border-y'>
            <div
              className='w-16 h-16 rounded-full'
              style={{
                background: `url(${user.image})`,
                backgroundPosition: 'center',
              }}
            ></div>
            <p className='text-lg font-medium'>{user.firstName}</p>
          </div>
          <div className='h-[60vh] m-5'></div>
          <div className='flex items-center justify-center m-5'>
            <Input className='p-7 rounded-3xl' />
            <span className='text-4xl hover:cursor-pointer'>
              <RiArrowRightDoubleFill />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversation;
