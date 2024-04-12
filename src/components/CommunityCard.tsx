import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { CommunityData } from '../types';
import { useTheme } from './ThemeProvider';
import { Button, buttonVariants } from './ui/button';
import useGetCommunityMembers from '../services/communityMembers/getCommunityMembers';
import useAddMembers from '../services/communityMembers/addMembers';
import { useAuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import useCheckJoinedStatus from '../services/communityMembers/checkJoinedStatus';
import useDeleteCommunity from '../services/community/deleteCommunity';
import LoadingSpinner from './LoadingSpinner';
import ExpandableText from './ExpandableText';

import EditCommunityDialog from './EditCommunityDialog';
import UpdateCommunityIconDialog from './UpdateCommunityIconDialog';
import useLeaveCommunity from '../services/communityMembers/leaveCommunity';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface CommunityCardProps {
  community: CommunityData;
}

const CommunityCard = ({ community }: CommunityCardProps) => {
  const { theme } = useTheme();
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const { data: communityMembers } = useGetCommunityMembers(community._id);
  const { data: joinedStatus, isLoading: isChecking } = useCheckJoinedStatus(
    community._id,
    user?.id as string
  );
  const { mutate: addMember } = useAddMembers();
  const { mutate: deleteCommunity, isLoading: isDeleting } =
    useDeleteCommunity();
  const { mutate: leaveCommunity, isLoading: isLeaving } = useLeaveCommunity();

  console.log(joinedStatus);
  console.log(communityMembers);

  const queryClient = useQueryClient();

  function handleUserJoinCommunity() {
    console.log({ userId: user?.id, communityId: community._id });
    addMember(
      { userId: user?.id as string, communityId: community._id },
      {
        onSuccess: () => {
          navigate(`/community/${community._id}`);
          queryClient.invalidateQueries(['communityMembers', community._id]);
        },
      }
    );
  }

  function handleDeleteCommunity(communityId: string) {
    deleteCommunity(communityId);
  }

  function handleLeaveCommunity(communityId: string) {
    leaveCommunity(
      { communityId: communityId, userId: user?.id as string },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            'joinedStatus',
            communityId,
            user?.id,
          ]);
          queryClient.invalidateQueries(['communityMembers', communityId]);
        },
      }
    );
  }

  return (
    <Card className='max-w-[400px]'>
      <CardHeader>
        <div className='flex items-center justify-around gap-10'>
          <CardTitle>{community.communityName}</CardTitle>
          <img
            src={
              theme === 'dark'
                ? community.communityIcon.dark
                : community.communityIcon.light
            }
            className='w-32'
          />
        </div>
        <CardDescription>
          <ExpandableText
            content={community.communityDescription}
            length={100}
          />
        </CardDescription>
      </CardHeader>
      <CardContent className='text-xs'>
        {!communityMembers ? (
          <p>No one has joined till now in this community</p>
        ) : (
          <p>
            {communityMembers?.users?.length} members have joined this community
          </p>
        )}
      </CardContent>
      <CardFooter className='flex flex-col gap-3'>
        {isChecking ? (
          <LoadingSpinner />
        ) : !joinedStatus ? (
          <div className='flex gap-3'>
            <Button onClick={handleUserJoinCommunity}>
              Join the community
            </Button>
            <Button onClick={() => navigate(`/community/${community._id}`)}>
              Browse
            </Button>
          </div>
        ) : (
          <>
            <Button
              onClick={() => navigate(`/community/${community._id}`)}
              disabled={isLeaving || isDeleting}
            >
              Checkout this community
            </Button>
            <Button
              onClick={() => handleLeaveCommunity(community._id)}
              variant={'destructive'}
              disabled={isLeaving || isDeleting}
            >
              Leave this community
            </Button>
          </>
        )}

        {user?.role === 'admin' && (
          <div className='flex flex-wrap items-center justify-center gap-3'>
            <Dialog>
              <DialogTrigger
                className={buttonVariants({
                  variant: 'destructive',
                  size: 'sm',
                })}
                disabled={isDeleting}
              >
                Delete this community
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>
                  Are you sure you want to delete this community?
                </DialogTitle>
                <DialogFooter>
                  <DialogClose
                    name='Cancel'
                    className={buttonVariants({ variant: 'secondary' })}
                  >
                    Cancel
                  </DialogClose>
                  <DialogClose
                    name='Delete'
                    className={buttonVariants({ variant: 'destructive' })}
                    onClick={() => handleDeleteCommunity(community._id)}
                  >
                    {isDeleting ? <LoadingSpinner /> : 'Delete'}
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <EditCommunityDialog community={community} />
            <UpdateCommunityIconDialog community={community} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CommunityCard;
