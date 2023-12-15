import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { PostData } from '../types';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import PostCardWithComments from './PostCardWithComments';
import { Input } from './ui/input';

interface PostCardProps {
  post: PostData;
}

const PostCard = ({ post }: PostCardProps) => {
  const postCategoriesTheme = {
    reflection: 'bg-blue-300 text-blue-800',
    learning: 'bg-green-300 text-green-800',
    question: 'bg-gray-300 text-gray-800',
  };

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4 mb-5'>
            <img
              src='https://picsum.photos/200'
              alt='user'
              className='w-12 h-12 rounded-full'
            />
            <div className='flex flex-col'>
              <span className='font-medium'>
                {post?.userName || 'username'}
              </span>
              <span className='text-xs'>
                Posted at {post.createdAt.toLocaleString()}
              </span>
            </div>
          </div>
          <div>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                postCategoriesTheme[
                  post.postCategory as keyof typeof postCategoriesTheme
                ]
              }`}
            >
              {post.postCategory}
            </span>
          </div>
        </div>
        <CardTitle>{post.postTitle}</CardTitle>
      </CardHeader>
      <CardContent className='m-5'>
        <p>{post.post}</p>
      </CardContent>
      <CardFooter className='flex flex-col gap-3'>
        <Separator />
        <p className='text-sm font-medium'>
          {post.postComments.length <= 0 ? (
            'No one has commented on this post yet.'
          ) : (
            <Dialog>
              <DialogTrigger>
                <span className='hover:cursor-pointer'>
                  {post.postComments.length} answers
                </span>
              </DialogTrigger>
              <DialogContent>
                <PostCardWithComments post={post} />
              </DialogContent>
            </Dialog>
          )}
        </p>
        <Separator />

        <div>
          <Dialog>
            <DialogTrigger>
              <Input
                placeholder='Comment on the post.'
                className='min-w-[400px]'
              />
            </DialogTrigger>
            <DialogContent>
              <label className='font-medium'>Provide your answer</label>
              <div>
                <textarea
                  placeholder='Your answer...'
                  // {...register('answer')}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
