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
import { FieldValues, useForm } from 'react-hook-form';
import useAddComment from '../services/posts/addComment';
import { Button } from './ui/button';
import { useAuthContext } from '../context/AuthProvider';
import ErrorMessage from './ErrorMessage';
import { Textarea } from './ui/textarea';
import LoadingSpinner from './LoadingSpinner';

interface PostCardProps {
  post: PostData;
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: addComment, isLoading: isCommenting } = useAddComment();
  const postCategoriesTheme = {
    reflection: 'bg-blue-300 text-blue-800',
    learning: 'bg-green-300 text-green-800',
    question: 'bg-gray-300 text-gray-800',
  };

  function handleAddComment(data: FieldValues) {
    addComment(
      {
        comment: data.comment,
        userId: user?.id as string,
        postId: post._id,
      },
      {
        onSuccess: () => {
          post.postComments.push({
            userId: user?.id as string,
            userName: user?.firstName as string,
            comment: data.comment,
            commentDate: new Date(),
          });
        },
      }
    );
  }

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
                Posted at {new Date(post.createdAt).toLocaleString()}
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
                  {post.postComments.length === 1
                    ? '1 comment'
                    : `${post.postComments.length} comments`}
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
              <label className='font-medium'>Provide your comment</label>
              <div>
                <Textarea
                  placeholder='Your answer...'
                  {...register('comment', {
                    required: 'Please provide your comment before posting.',
                  })}
                />
                {errors.comment && (
                  <ErrorMessage>
                    {errors.comment.message as string}
                  </ErrorMessage>
                )}
              </div>
              <Button
                onClick={handleSubmit(handleAddComment)}
                disabled={isCommenting}
              >
                {isCommenting ? <LoadingSpinner /> : 'Add comment'}
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
