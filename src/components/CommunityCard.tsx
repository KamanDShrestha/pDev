import React from 'react';
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

interface CommunityCardProps {
  community: CommunityData;
}

const CommunityCard = ({ community }: CommunityCardProps) => {
  const { theme } = useTheme();
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
      <CardContent></CardContent>
      <CardFooter>
        <Button>Join the community</Button>
      </CardFooter>
    </Card>
  );
};

export default CommunityCard;
