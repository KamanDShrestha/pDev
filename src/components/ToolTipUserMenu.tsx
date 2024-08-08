import { useAuthContext } from '../context/AuthProvider';
import useAddPingRequest from '../services/pingRequests/addPingRequest';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

const ToolTipUserMenu = ({
  userId,
  userName,
}: {
  userId: string;
  userName: string;
}) => {
  const { user } = useAuthContext();
  const { mutate: addPingRequest } = useAddPingRequest();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{userName}</TooltipTrigger>
        <TooltipContent>
          <Button
            onClick={() =>
              addPingRequest({
                senderId: user?.id as string,
                recipientId: userId,
              })
            }
          >
            Add ping request
          </Button>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTipUserMenu;
