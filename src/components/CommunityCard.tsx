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

interface CommunityCardProps {
  community: CommunityData;
}

const CommunityCard = ({ community }: CommunityCardProps) => {
  const { theme } = useTheme();
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const { data: communityMembers } = useGetCommunityMembers(community._id);
  const { mutate: addMember } = useAddMembers();
  console.log(communityMembers);

  function handleUserJoinCommunity() {
    console.log({ userId: user?.id, communityId: community._id });
    addMember({ userId: user?.id as string, communityId: community._id });
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
        <CardDescription>{community.communityDescription}</CardDescription>
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
      <CardFooter className='space-x-3'>
        <Button onClick={handleUserJoinCommunity}>Join the community</Button>

        <Button onClick={() => navigate(`/community/${community._id}`)}>
          Browse
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommunityCard;
