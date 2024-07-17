import { useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthProvider';
import useUpdatePingRequestStatus from '../services/pingRequests/updatePingRequestStatus';
import { PingRequestItem } from '../types';
import { Button } from './ui/button';

const OutgoingPingRequestAction = ({
  request,
}: {
  request: PingRequestItem;
}) => {
  const { user } = useAuthContext();
  const { mutate: updateStatus } = useUpdatePingRequestStatus();
  const queryClient = useQueryClient();
  function handleCancelSubmit() {
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

  return (
    <div className='flex w-full gap-5 my-5'>
      <div
        style={{ backgroundImage: `url(${request.userProfile})` }}
        className='w-24 h-24 bg-cover rounded-full'
      ></div>
      <div className='flex items-center justify-between w-[80%] gap-2'>
        <p className='font-semibold'>{request.userName}</p>
        <div className='space-y-4 text-sm'>
          <Button
            variant={'destructive'}
            size={'sm'}
            onClick={handleCancelSubmit}
          >
            Cancel?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OutgoingPingRequestAction;
