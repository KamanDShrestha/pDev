import Conversation from '@/src/components/Conversation';
import Heading from '@/src/components/Heading';
import LoadingSpinner from '@/src/components/LoadingSpinner';
import { Separator } from '@/src/components/ui/separator';
import useGetQHPForConversations from '@/src/services/chatConversations/getQHPForConversations';
import { useSearchParams } from 'react-router-dom';

const ChatConversation = () => {
  const { data: QHPs, isLoading: isFetchingQHPs } = useGetQHPForConversations();
  const [queryParams, setQueryParams] = useSearchParams();

  return (
    <div className='grid grid-cols-3'>
      <div className='m-3 md:border-r'>
        <Heading>Conversations</Heading>
      </div>
      <Conversation />
      <div className='m-3'>
        <Heading>Suggestions</Heading>
        <Separator className='mb-5' />

        <div className=''>
          <Heading className='text-3xl'>Our QHPs</Heading>
          <Separator />
          <div className='flex flex-wrap justify-around my-1'>
            {isFetchingQHPs && <LoadingSpinner />}
            {QHPs &&
              QHPs.map((qhp, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center gap-3 p-5 rounded-lg hover:cursor-pointer hover:bg-gray-300 hover:dark:bg-slate-800 ${
                    queryParams.get('recipient') === qhp._id
                      ? ' bg-gray-300 dark:bg-slate-800'
                      : ''
                  }`}
                  onClick={() => {
                    setQueryParams(() => ({ recipient: qhp._id }));
                  }}
                >
                  <div
                    className={`rounded-full lg:h-20 lg:w-20 h-10 w-10`}
                    style={{
                      background: `url(${qhp.image})`,
                      backgroundPosition: 'center',
                    }}
                  ></div>
                  <p>{qhp.firstName}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatConversation;
