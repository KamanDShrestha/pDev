import { Outlet, useLocation } from 'react-router-dom';
import Logo from '../../components/Logo';
import NavBar from '../..//components/NavBar';
import { ModeToggle } from '../../components/ThemeToggleButton';
import Footer from '../../components/Footer';
import { socket } from '@/src/services/socket';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuthContext } from '@/src/context/AuthProvider';

const UserLayout = () => {
  const { user } = useAuthContext();
  useEffect(() => {
    const handlePostLiked = ({
      recipientId,
      // senderId,
      // senderName,
      // communityId,
      // postId,
      message,
    }: {
      recipientId: string;
      senderId: string;
      senderName: string;
      communityId: string;
      postId: string;
      message: string;
    }) => {
      console.log('signal received');

      if (recipientId === user?.id) {
        toast.success(message, {
          position: 'bottom-right',
        });
      }
    };

    socket.on('provideLikedNotification', handlePostLiked);

    // Clean up the event listener on component unmount
    return () => {
      socket.off('provideLikedNotification', handlePostLiked);
    };
  }, []);

  const location = useLocation();
  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>
      <div className='flex justify-between p-5'>
        <div className='hidden lg:block'>
          <Logo />
        </div>
        <div className='flex justify-between w-full gap-3 px-2 lg:w-auto'>
          <NavBar />

          <ModeToggle />
        </div>
      </div>
      <div className='relative flex-grow p-5'>
        <Outlet />
      </div>
      {location.pathname === '/home' ? null : <Footer />}
    </div>
  );
};

export default UserLayout;
