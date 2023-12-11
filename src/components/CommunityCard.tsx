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

interface CommunityCardProps {
  community: CommunityData;
}

const CommunityCard = ({ community }: CommunityCardProps) => {
  const { theme } = useTheme();

  const { data: communityMembers } = useGetCommunityMembers(community._id);

  function handleUserJoinCommunity() {
    console.log('Joining community');
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
      <CardContent>
        {communityMembers && communityMembers.users.length <= 0 ? (
          <p>No one has joined till now in this community</p>
        ) : (
          <p>
            {communityMembers?.users.length} members have joined this community
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleUserJoinCommunity}>Join the community</Button>
      </CardFooter>
    </Card>
  );
};

export default CommunityCard;
