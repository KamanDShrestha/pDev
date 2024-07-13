import { useSearchParams } from 'react-router-dom';
import useGetSpecificUser from '../services/users/getSpecificUser';
import LoadingSpinner from './LoadingSpinner';
import { Input } from './ui/input';

import { RiArrowRightDoubleFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { socket } from '../services/socket';
import { useAuthContext } from '../context/AuthProvider';
import { MessageInteractionData } from '../types';
const Conversation = () => {
  const [queryParams] = useSearchParams();
  const { data: recipientUser, isLoading: isFetchingUser } = useGetSpecificUser(
    queryParams.get('recipient')
  );
  const { user } = useAuthContext();
  const [message, setMessage] = useState('');
  const [messageInteraction, setMessageInteraction] = useState<
    MessageInteractionData[]
  >([]);

  function sendMessage() {
    socket.emit('sendMessage', {
      message,
      senderId: user?.id,
      recipientId: recipientUser?._id,
    });
    setMessageInteraction((value) => [
      ...value,
      {
        senderId: user?.id!,
        recipientId: recipientUser?._id!,
        message: message,
        messagedDate: Date.now(),
      },
    ]);
  }

  useEffect(() => {
    const handleReceiveMessage = ({
      message,
      senderId,
      recipientId,
    }: {
      message: string;
      senderId: string;
      recipientId: string;
    }) => {
      console.log('received message');
      setMessageInteraction((prevMessages) => [
        ...prevMessages,
        {
          senderId: senderId,
          recipientId: recipientId,
          message: message,
          messagedDate: Date.now(),
        },
      ]);
    };

    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, []);

  return (
    <div className='m-3 md:border-r'>
      {!queryParams.get('recipient') && (
        <div className='flex items-center justify-center w-full h-full'>
          Have a conversation with people.
        </div>
      )}

      {queryParams.get('recipient') && !recipientUser && (
        <div className='flex items-center justify-center w-full h-full'>
          Select a valid user for having conversation
        </div>
      )}

      {isFetchingUser && <LoadingSpinner />}
      {recipientUser && (
        <div>
          <div className='flex items-center gap-3 p-2 m-5 border-y'>
            <div
              className='w-16 h-16 rounded-full'
              style={{
                background: `url(${recipientUser.image})`,
                backgroundPosition: 'center',
              }}
            ></div>
            <p className='text-lg font-medium'>{recipientUser.firstName}</p>
          </div>
          <div className='h-[60vh] m-5'>
            {messageInteraction.map((thisMessage, index) => (
              <p key={index}>{thisMessage.message}</p>
            ))}
          </div>
          <div className='flex items-center justify-center m-5'>
            <Input
              className='p-7 rounded-3xl'
              onChange={(e) => setMessage(e.target.value)}
            />
            <span
              className='text-4xl hover:cursor-pointer'
              onClick={sendMessage}
            >
              <RiArrowRightDoubleFill />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversation;
