import { useAuthContext } from '../context/AuthProvider';
import { Button } from './ui/button';
import useObtainPingStatus from '../services/pings/obtainPingStatus';
import { useNavigate } from 'react-router-dom';
import useAddPingRequest from '../services/pingRequests/addPingRequest';
import { useQueryClient } from '@tanstack/react-query';

const UserLikesActionItem = ({
  associatedUserId,
}: {
  associatedUserId: string;
}) => {
  const { user } = useAuthContext();
  const { data: pingStatus } = useObtainPingStatus({
    statusForId: user?.id as string,
    statusOfId: associatedUserId,
  });
  const navigate = useNavigate();
  const { mutate: makePingRequest } = useAddPingRequest();

  const queryClient = useQueryClient();

  function handlePingSubmit(recipientId: string) {
    makePingRequest(
      { senderId: user?.id as string, recipientId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['pingStatus', user?.id, recipientId]);
        },
      }
    );
  }
  return (
    <>
      {user?.id === associatedUserId ? (
        <Button
          variant={'link'}
          size={'sm'}
          onClick={() => navigate('/profile')}
        >
          View Profile
        </Button>
      ) : (
        <>
          {((pingStatus && pingStatus === 'No Association') || !pingStatus) && (
            <Button
              variant={'outline'}
              onClick={() => handlePingSubmit(associatedUserId as string)}
            >
              Ping
            </Button>
          )}
          {pingStatus && pingStatus != 'No Association' && (
            <span
              className='text-xs font-semibold cursor-pointer hover:underline'
              onClick={() => navigate('/ping')}
            >
              {pingStatus}
            </span>
          )}
        </>
      )}
    </>
  );
};

export default UserLikesActionItem;
