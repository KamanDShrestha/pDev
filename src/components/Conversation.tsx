import { useSearchParams } from 'react-router-dom';
import useGetSpecificUser from '../services/users/getSpecificUser';
import LoadingSpinner from './LoadingSpinner';
import { Input } from './ui/input';

import { RiArrowRightDoubleFill } from 'react-icons/ri';
import { useEffect, useRef, useState } from 'react';
import { socket } from '../services/socket';
import { useAuthContext } from '../context/AuthProvider';
import { MessageInteractionData } from '../types';
import useGetConversations from '../services/chatConversations/getConversation';
import { Button } from './ui/button';
import { GoDotFill } from 'react-icons/go';
const Conversation = () => {
  const [queryParams] = useSearchParams();

  const { user } = useAuthContext();
  const [message, setMessage] = useState('');
  const [limit, setLimit] = useState(10);
  const [isOnline, setIsOnline] = useState(false);
  const [messageInteraction, setMessageInteraction] = useState<
    MessageInteractionData[]
  >([]);
  const chatConversationContainer = useRef<HTMLDivElement>(null);

  const { data: recipientUser } = useGetSpecificUser(
    queryParams.get('recipient')
  );
  const { data: conversation, isLoading: isFetchingConversation } =
    useGetConversations({
      senderId: user?.id,
      recipientId: queryParams.get('recipient'),
      limit,
    });

  useEffect(() => {
    if (queryParams.get('recipient')) {
      socket.emit('isOnline', {
        recipientId: queryParams.get('recipient'),
        senderId: user?.id,
      });
    }
    function updateOnlineStatus({ onlineStatus }: { onlineStatus: boolean }) {
      setIsOnline(() => onlineStatus);
    }

    socket.on('provideOnlineStatus', updateOnlineStatus);

    return () => {
      socket.off('provideOnlineStatus', updateOnlineStatus);
    };
  }, [queryParams.get('recipient')]);

  function sendMessage() {
    socket.emit('sendMessage', {
      message,
      senderId: user?.id,
      recipientId: recipientUser?._id,
      senderName: user?.firstName,
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

    // check if the user is at the bottom
    // if the user is at the bottom, then scroll to last of the height
    // if the user is not at the bottom, do nothing

    setTimeout(() => {
      if (
        chatConversationContainer.current?.scrollHeight! -
          Math.ceil(chatConversationContainer.current?.scrollTop!) ===
        chatConversationContainer.current?.clientHeight
      ) {
        chatConversationContainer.current.scroll({
          top: chatConversationContainer.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 1000);
  }

  function obtainMoreMessages() {
    setLimit((value) => value + 10);
    setMessageInteraction(() => []);
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
          Have conversations with people.
        </div>
      )}

      {queryParams.get('recipient') && !recipientUser && (
        <div className='flex items-center justify-center w-full h-full'>
          Select a valid user for having conversation
        </div>
      )}

      {recipientUser && (
        <div>
          <div className='flex items-center gap-3 p-2 m-5 border-y'>
            <div
              className='w-16 h-16 bg-cover rounded-full'
              style={{
                backgroundImage: `url(${recipientUser.image})`,
              }}
            ></div>
            <div className='flex flex-col'>
              <p className='text-lg font-medium'>{recipientUser.firstName}</p>
              <p>
                {isOnline ? (
                  <>
                    <div className='flex items-center text-sm text-green-500'>
                      <GoDotFill />
                      <span>Online</span>
                    </div>
                  </>
                ) : (
                  <div className='flex items-center text-sm text-red-500'>
                    <GoDotFill />
                    <span>Offline</span>
                  </div>
                )}
              </p>
            </div>
          </div>
          <div
            className='h-[60vh] m-5 overflow-y-scroll relative scroll-smooth'
            ref={chatConversationContainer}
          >
            {isFetchingConversation && (
              <div className='flex justify-center w-full'>
                <LoadingSpinner />
              </div>
            )}

            {conversation && !conversation.isAllMessage && (
              <div className='absolute top-0 flex items-center justify-center w-full'>
                <Button variant={'outline'} onClick={obtainMoreMessages}>
                  See more messages
                </Button>
              </div>
            )}
            {conversation &&
              conversation.messages.map((thisMessage) => (
                <>
                  {thisMessage.senderId != user?.id ? (
                    <div className='flex justify-start w-full'>
                      <p
                        className='p-5 my-3 bg-blue-300 rounded-3xl'
                        key={thisMessage._id}
                      >
                        {thisMessage.message}
                      </p>
                    </div>
                  ) : (
                    <div
                      className='flex justify-end w-full'
                      key={thisMessage._id}
                    >
                      <p className='p-5 my-3 bg-gray-300 rounded-3xl'>
                        {thisMessage.message}
                      </p>
                    </div>
                  )}
                </>
              ))}

            {messageInteraction
              .sort((a, b) => a.messagedDate - b.messagedDate)
              .map((thisMessage, index) => (
                <>
                  {thisMessage.senderId != user?.id ? (
                    <div className='flex justify-start w-full' key={index}>
                      <p className='p-5 my-3 bg-blue-300 rounded-3xl'>
                        {thisMessage.message}
                      </p>
                    </div>
                  ) : (
                    <div className='flex justify-end w-full'>
                      <p
                        key={index}
                        className='p-5 my-3 bg-gray-300 rounded-3xl'
                      >
                        {thisMessage.message}
                      </p>
                    </div>
                  )}
                </>
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
