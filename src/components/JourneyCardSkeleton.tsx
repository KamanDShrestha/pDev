import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card';
import { Skeleton } from './ui/skeleton';

const JourneyCardSkeleton = () => {
  return (
    <Card className='w-[350px] sm:w-[400px] h-[500px]'>
      <CardHeader>
        <CardTitle>
          <div className='flex items-center justify-around gap-10'>
            <Skeleton className='h-4 w-[100px]' />
            <Skeleton className='w-20 h-20 rounded-full' />
          </div>
        </CardTitle>
        <CardDescription>
          <Skeleton className='h-4 w-[200px]' />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-5'>
          <Skeleton className='w-[350px] h-[200px]' />
          <Skeleton className='w-[200px] h-4' />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className='w-20 h-10' />
      </CardFooter>
    </Card>
  );
};

export default JourneyCardSkeleton;
