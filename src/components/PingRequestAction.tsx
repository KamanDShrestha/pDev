import { Button } from './ui/button';
import { PingRequestItem } from '../types';
import useUpdatePingRequestStatus from '../services/pingRequests/updatePingRequestStatus';
import { useAuthContext } from '../context/AuthProvider';
import { useQueryClient } from '@tanstack/react-query';
import useAddPing from '../services/pings/addPing';

const PingRequestAction = ({ request }: { request: PingRequestItem }) => {
  const { user } = useAuthContext();
  const { mutate: updateStatus } = useUpdatePingRequestStatus();
  const { mutate: addPing } = useAddPing();
  const queryClient = useQueryClient();
  function handleIgnoreSubmit() {
    updateStatus(
      {
        senderId: user?.id as string,
        recipientId: request.userId,
        status: 'ignored',
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['pingRequests', user?.id]);
        },
      }
    );
  }
  function handleAcceptSubmit() {
    updateStatus(
      {
        senderId: user?.id as string,
        recipientId: request.userId,
        status: 'accepted',
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['pingRequests', user?.id]);
          addPing(
            {
              acceptingUser: user?.id as string,
              acceptedUser: request.userId,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries(['pings', user?.id]);
              },
            }
          );
        },
      }
    );
  }
  return (
    <div className='flex gap-5 my-5'>
      <div
        style={{ backgroundImage: `url(${request.userProfile})` }}
        className='w-24 h-24 bg-cover rounded-full'
      ></div>
      <div className='flex flex-col gap-2'>
        <p className='font-semibold'>{request.userName}</p>
        <div className='space-y-4 text-sm'>
          <p>Would you like to accept the ping?</p>
          <div className='flex justify-between'>
            <Button
              variant={'destructive'}
              size={'sm'}
              onClick={handleIgnoreSubmit}
            >
              Ignore
            </Button>
            <Button variant={'default'} onClick={handleAcceptSubmit}>
              Accept?
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PingRequestAction;
