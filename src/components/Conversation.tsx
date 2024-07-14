import { useSearchParams } from 'react-router-dom';
import useGetSpecificUser from '../services/users/getSpecificUser';
import LoadingSpinner from './LoadingSpinner';
import { Input } from './ui/input';

import { RiArrowRightDoubleFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { socket } from '../services/socket';
import { useAuthContext } from '../context/AuthProvider';
import { MessageInteractionData } from '../types';
import useGetConversations from '../services/chatConversations/getConversation';
import { Button } from './ui/button';
const Conversation = () => {
  const [queryParams] = useSearchParams();

  const { user } = useAuthContext();
  const [message, setMessage] = useState('');
  const [limit, setLimit] = useState(10);
  const [messageInteraction, setMessageInteraction] = useState<
    MessageInteractionData[]
  >([]);

  const { data: recipientUser, isLoading: isFetchingUser } = useGetSpecificUser(
    queryParams.get('recipient')
  );
  const { data: conversation, isLoading: isFetchingConversation } =
    useGetConversations({
      senderId: user?.id,
      recipientId: queryParams.get('recipient'),
      limit,
    });
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
              className='w-16 h-16 bg-cover rounded-full'
              style={{
                background: `url(${recipientUser.image})`,
              }}
            ></div>
            <p className='text-lg font-medium'>{recipientUser.firstName}</p>
          </div>
          <div className='h-[60vh] m-5 overflow-scroll relative'>
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
