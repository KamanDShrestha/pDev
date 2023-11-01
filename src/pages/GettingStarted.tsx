import { Link } from 'react-router-dom';
import { buttonVariants } from '../components/ui/button';
import { useAuthContext } from '../context/AuthProvider';
// import origami from '../assets/origami-person.png';
const GettingStarted = () => {
  const { user } = useAuthContext();
  const redirectTo = user?.accessToken ? '/home' : '/login';
  return (
    <>
      {/* <div>
        <img src={origami} className='absolute w-screen h-screen' />
      </div> */}
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
            to={redirectTo}
          >
            Getting Started
          </Link>
        </div>
      </div>
    </>
  );
};

export default GettingStarted;
