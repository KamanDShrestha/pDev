import { Outlet, useLocation } from 'react-router-dom';
import Logo from '../../components/Logo';
import NavBar from '../..//components/NavBar';
import { ModeToggle } from '../../components/ThemeToggleButton';
import Footer from '../../components/Footer';
import { socket } from '@/src/services/socket';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuthContext } from '@/src/context/AuthProvider';
import NoConnection from '@/src/components/NoConnection';

const UserLayout = () => {
  const { user } = useAuthContext();
  useEffect(() => {
    // connect to the socket
    socket.io.opts.query = { userId: user?.id };
    socket.connect();

    const handlePostInteraction = ({
      recipientId,
      message,
    }: {
      recipientId: string;
      senderId: string;
      senderName: string;
      communityId: string;
      postId: string;
      message: string;
    }) => {
      if (recipientId === user?.id) {
        toast.success(message, {
          position: 'bottom-right',
        });
      }
    };

    const handleQuestionedInteraction = ({
      recipientRole,
      message,
    }: {
      recipientRole: string;
      senderId: string;
      senderName: string;
      communityId: string;
      message: string;
    }) => {
      if (recipientRole === user?.role) {
        toast.success(message, {
          position: 'bottom-right',
        });
      }
    };

    const handleReceivedMessage = ({
      message,
      recipientId,
    }: {
      message: string;
      senderId: string;
      recipientId: string;
    }) => {
      console.log(message, recipientId);
      if (recipientId === user?.id) {
        toast.success(message, {
          position: 'bottom-right',
        });
      }
    };

    socket.on('provideInteractionNotification', handlePostInteraction);
    socket.on('provideQuestionedNotification', handleQuestionedInteraction);
    socket.on('receiveMessageNotification', handleReceivedMessage);
    socket.on(
      'provideJourneyFeedbackNotification',
      handleQuestionedInteraction
    );

    // Clean up the event listener on component unmount
    return () => {
      socket.off('provideInteractionNotification', handlePostInteraction);
      socket.off('provideQuestionedNotification', handleQuestionedInteraction);
      socket.off('receiveMessageNotification', handleReceivedMessage);
      socket.off(
        'provideJourneyFeedbackNotification',
        handleQuestionedInteraction
      );
    };
  }, []);

  const location = useLocation();
  return (
    <>
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
      <NoConnection />
    </>
  );
};

export default UserLayout;
