import Heading from '../components/Heading';
import OutgoingPingRequestAction from '../components/OutgoingPingRequestAction';
import PingRequestAction from '../components/PingRequestAction';
import { Separator } from '../components/ui/separator';
import { useAuthContext } from '../context/AuthProvider';
import useGetPingRequests from '../services/pingRequests/getPingRequests';
import useGetPings from '../services/pings/getPings';

const Pings = () => {
  const { user } = useAuthContext();
  const { data: userPingRequests } = useGetPingRequests(user?.id as string);
  const { data: userPings } = useGetPings(user?.id as string);
  return (
    <>
      <Heading>Pings</Heading>
      <div className='grid grid-cols-3'>
        <div className='p-3 border-r'>
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
        <div className='p-3 border-r'>
          <Heading className='text-3xl'>Pings</Heading>
          <Separator />
          <div className='p-3'>
            {userPings && userPings.length === 0 && (
              <span>No pings for now.</span>
            )}
            {userPings &&
              userPings.length > 0 &&
              userPings.map((user, index) => (
                <div className='flex items-center gap-3' key={index}>
                  <div
                    style={{ backgroundImage: `url(${user.userProfile})` }}
                    className='w-20 h-20 bg-cover rounded-full'
                  ></div>
                  <p className='font-semibold'>{user.userName}</p>
                </div>
              ))}
          </div>
        </div>
        <div className='p-3'>
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
