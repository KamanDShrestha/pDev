import { NavLink, useNavigate } from 'react-router-dom';
// import { Button } from '../components/ui/button';

import { useAuthContext } from '../context/AuthProvider';

import { IoIosArrowRoundForward } from 'react-icons/io';
import MoodTracker from '../components/MoodTracker';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
// import LoadingSpinner from '../components/LoadingSpinner';
import useDocumentTitle from '../services/getTitle';
import HomeImage from '../assets/home-icon.png';

const Home = () => {
  // const { mutate, isLoading: isLoggingOut } = useLogoutUser();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [moodTrackerModal, setMoodTrackerModal] = useState(false);

  useDocumentTitle('Home - SelfSync');

  console.log(user);
  useEffect(() => {
    if (user && user.isNewUser) {
      navigate('/newUser');
    }
  }, []);

  useEffect(() => {
    if (user && user.loggedMood === false) {
      setMoodTrackerModal(true);
    }
  }, []);

  console.log(user);

  function handleModalClose() {
    setMoodTrackerModal(false);
  }

  return (
    <>
      {moodTrackerModal &&
        createPortal(
          <div>
            <div
              className='fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
              data-aria-hidden='true'
              aria-hidden='true'
            ></div>
            <div
              role='dialog'
              id='radix-:rij:'
              aria-describedby='radix-:ril:'
              aria-labelledby='radix-:rik:'
              data-state='open'
              className='fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full'
            >
              <MoodTracker handleModalClose={handleModalClose} />
            </div>
          </div>,
          document.body
        )}
      <div className='flex h-[80vh] justify-around items-center flex-wrap'>
        <img src={HomeImage} alt='home-page-image' className='h-[300px]' />

        <div className='flex flex-col gap-5 mb-3'>
          <h1 className='text-7xl'>Sync yourself.</h1>
          <h2 className='text-4xl'>
            Let your transformation finds its rhythm.
          </h2>
          <NavLink to={'/journeys'} className='hover:underline'>
            <span className='flex items-center gap-3'>
              Embark onto your journey
              <IoIosArrowRoundForward />
            </span>
          </NavLink>
        </div>

        {/* <Button onClick={handleLogout}>
          {isLoggingOut ? <LoadingSpinner /> : 'Logout'}
        </Button> */}
      </div>

      {/* {createPortal(
        <MoodTracker open={open} setOpen={setOpen} />,
        document.body
      )} */}
    </>
  );
};

export default Home;
