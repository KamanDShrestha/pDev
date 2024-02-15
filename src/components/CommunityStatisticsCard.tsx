import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';
import LoadingSpinner from './LoadingSpinner';
import { buttonVariants } from './ui/button';
import { MembersCount } from '../types';

import { Separator } from './ui/separator';
import StatisticsPieChart from './StatisticsPieChart';

interface CommunityStatisticsCardProps {
  membersCount: MembersCount | null | undefined;
  isFetchingCount: boolean;
}

const CommunityStatisticsCard = ({
  membersCount,
  isFetchingCount,
}: CommunityStatisticsCardProps) => {
  const usersCount =
    membersCount &&
    Object.keys(membersCount).map((communityId) => ({
      name: membersCount[communityId].communityName,
      count: membersCount[communityId].memberCount,
    }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Statistics</CardTitle>
        <CardDescription>
          Finding the number of members in each community
        </CardDescription>
      </CardHeader>
      <div className='flex flex-col items-center justify-center gap-5 lg:flex-row '>
        {membersCount && usersCount && (
          <StatisticsPieChart countStats={usersCount} />
        )}

        <CardContent className='flex flex-wrap justify-around gap-5'>
          {isFetchingCount && <LoadingSpinner />}
          {!isFetchingCount && !membersCount && (
            <p>No statistics can be provided at the moment.</p>
          )}
          {membersCount &&
            Object.keys(membersCount).map((community, index) => (
              <Card key={index}>
                <CardContent className='p-5 space-y-5 text-center'>
                  <CardTitle className='text-2xl'>
                    {membersCount[community].communityName}
                  </CardTitle>
                  <Separator />
                  <CardTitle className='text-xl'>
                    {membersCount[community].memberCount} users
                  </CardTitle>
                </CardContent>
              </Card>
            ))}
        </CardContent>
      </div>

      <CardFooter>
        <NavLink
          to={'/community'}
          className={cn(buttonVariants({ variant: 'link' }))}
        >
          View all communities
        </NavLink>
      </CardFooter>
    </Card>
  );
};

export default CommunityStatisticsCard;
