import { useNavigate } from 'react-router-dom';
import Heading from '../components/Heading';
import OutgoingPingRequestAction from '../components/OutgoingPingRequestAction';
import PingRequestAction from '../components/PingRequestAction';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { useAuthContext } from '../context/AuthProvider';
import useGetPingRequests from '../services/pingRequests/getPingRequests';
import useGetPings from '../services/pings/getPings';
import useDocumentTitle from '../services/getTitle';

const Pings = () => {
  const { user } = useAuthContext();
  const { data: userPingRequests } = useGetPingRequests(user?.id as string);
  const { data: userPings } = useGetPings(user?.id as string);
  const navigate = useNavigate();

  useDocumentTitle('SelfSync - Pings');
  return (
    <>
      <Heading>Pings</Heading>
      <div className='grid items-center justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div className='p-3 border-r h-[58dvh] overflow-y-scroll'>
          <Heading className='text-3xl'>Incoming Requests</Heading>
          <Separator />
          <div className='p-3'>
            {userPingRequests &&
              userPingRequests.obtainedRequests.filter(
                (request) => request.status === 'pending'
              ).length === 0 && <span>No incoming requests for now.</span>}
            {userPingRequests &&
              userPingRequests.obtainedRequests.length > 0 &&
              userPingRequests.obtainedRequests
                .filter((request) => request.status === 'pending')
                .map((request, index) => (
                  <PingRequestAction key={index} request={request} />
                ))}
          </div>
        </div>
        <div className='p-3 border-r h-[58dvh] overflow-y-scroll'>
          <Heading className='text-3xl'>Pings</Heading>
          <Separator />
          <div className='p-3'>
            {userPings && userPings.length === 0 && (
              <span>No pings for now.</span>
            )}
            <div className='flex flex-col gap-3'>
              {userPings &&
                userPings.length > 0 &&
                userPings.map((thisUser, index) => (
                  <div className='flex items-center justify-between gap-3 py-3 border-b'>
                    <div className='flex items-center gap-3' key={index}>
                      <div
                        style={{
                          backgroundImage: `url(${thisUser.userProfile})`,
                        }}
                        className='w-20 h-20 bg-cover rounded-full'
                      ></div>
                      <p className='font-semibold'>{thisUser.userName}</p>
                    </div>
                    {user && user.hasSubscribed ? (
                      <Button
                        variant={'outline'}
                        onClick={() =>
                          navigate(`/chat?recipient=${thisUser.userId}`)
                        }
                      >
                        Chat
                      </Button>
                    ) : (
                      <Button
                        variant={'link'}
                        size={'sm'}
                        onClick={() => navigate('/subscribe')}
                      >
                        Subscribe for sending message
                      </Button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className='p-3 h-[58dvh] overflow-y-scroll'>
          <Heading className='text-3xl'>Outgoing Requests</Heading>
          <Separator />
          <div className='p-3'>
            {userPingRequests &&
              userPingRequests.providedRequests.length === 0 && (
                <span>No outgoing requests for now.</span>
              )}
            {userPingRequests &&
              userPingRequests.providedRequests.length > 0 &&
              userPingRequests.providedRequests.map((request, index) => (
                <OutgoingPingRequestAction key={index} request={request} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pings;
