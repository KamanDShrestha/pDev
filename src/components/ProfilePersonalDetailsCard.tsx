import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { format } from 'date-fns';

const ProfilePersonalDetailsCard = () => {
  const { user } = useAuthContext();

  return (
    <>
      {user && (
        <Card className='p-5 lg:w-[600px] flex flex-col gap-2 flex-wrap transition-transform'>
          <div className='flex justify-between'>
            <label className='font-medium'>Name: </label>
            <span>
              {user.firstName} {user.lastName}
            </span>
          </div>
          <div className='flex flex-wrap justify-between'>
            <label className='font-medium'>Email: </label>
            <span>{user.email}</span>
          </div>
          <div className='flex flex-wrap justify-between'>
            <label className='font-medium'>DOB: </label>
            <span>
              {user.dateOfBirth
                ? format(new Date(user.dateOfBirth), 'PPP')
                : 'No birth date provided'}
            </span>
          </div>
          <div className='flex flex-wrap justify-between'>
            <label className='font-medium'>Role: </label>
            <span>{user.role}</span>
          </div>
          {(user.role === 'user' || user.role === 'qhp') && (
            <div className='flex flex-wrap justify-between'>
              <label className='font-medium'>Subscription Status: </label>
              <NavLink to={'/paymentDetails'}>
                {user.hasSubscribed ? (
                  <Badge>Subscribed</Badge>
                ) : (
                  <Badge>Not Subscribed</Badge>
                )}
              </NavLink>
            </div>
          )}
        </Card>
      )}
    </>
  );
};

export default ProfilePersonalDetailsCard;
