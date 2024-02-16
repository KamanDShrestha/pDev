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
import { Button } from './ui/button';
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
  const { mutate: deleteCommunity } = useDeleteCommunity();

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
            length={150}
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
          <Button onClick={() => navigate(`/community/${community._id}`)}>
            Checkout this community
          </Button>
        )}

        {user?.role === 'admin' && (
          <div className='flex items-center justify-center gap-3'>
            <Button
              variant={'destructive'}
              onClick={() => handleDeleteCommunity(community._id)}
            >
              Delete this community
            </Button>
            <EditCommunityDialog community={community} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CommunityCard;
