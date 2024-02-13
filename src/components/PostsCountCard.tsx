import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';
import { buttonVariants } from './ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card';
import { PostCountData } from '../types';
import { useAuthContext } from '../context/AuthProvider';
import LoadingSpinner from './LoadingSpinner';

interface PostsCountCardProps {
  postsCount: PostCountData | null | undefined;
  isFetchingPostsCount: boolean;
}

const PostsCountCard = ({
  postsCount,
  isFetchingPostsCount,
}: PostsCountCardProps) => {
  const { user } = useAuthContext();
  return (
    <Card className='max-w-[400px]'>
      <CardHeader>
        <CardTitle>Posts</CardTitle>
        <CardDescription>
          Finding the number of posts in different communities
        </CardDescription>
        <CardContent>
          {isFetchingPostsCount && <LoadingSpinner />}
          {postsCount && postsCount !== null ? (
            <div className='flex flex-col gap-3'>
              {Object.keys(postsCount).map((communityId, index) => (
                <Card
                  key={index}
                  className='flex items-center justify-around gap-3 p-3'
                >
                  <div className=''>
                    <p className='text-2xl font-semibold'>
                      {postsCount[communityId].communityName}
                    </p>
                    <p className='text-xl font-medium text-right'>
                      {postsCount[communityId].count}
                    </p>
                  </div>

                  <NavLink
                    to={`/community/${communityId}/posts/${user?.id}`}
                    className={cn(buttonVariants({ variant: 'link' }))}
                  >
                    See my posts
                  </NavLink>
                </Card>
              ))}
            </div>
          ) : (
            <p>No posts in any community</p>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default PostsCountCard;
