import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { PostData } from '../types';

import PostCardWithComments from './PostCardWithComments';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';

import useAddComment from '../services/posts/addComment';
import { useAuthContext } from '../context/AuthProvider';
import useLikePost from '../services/posts/likePost';
import useGetLikedStatus from '../services/posts/getLikedStatus';

import { FieldValues, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import { BsThreeDots } from 'react-icons/bs';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { FaTrashAlt } from 'react-icons/fa';
import { useState } from 'react';
import { Checkbox } from './ui/checkbox';
// import { FaEdit } from 'react-icons/fa';

import { IoBookmarkOutline } from 'react-icons/io5';
import { IoBookmark } from 'react-icons/io5';
import useAddSavedContent from '../services/savedContent/addSavedContent';
import useGetContentSavedStatus from '../services/savedContent/getContentSavedStatus';

import ExpandableText from './ExpandableText';
import { postCategoriesTheme } from '../constants';
import useCheckJoinedStatus from '../services/communityMembers/checkJoinedStatus';
import EditPostDialog from './EditPostDialog';

interface PostCardProps {
  post: PostData;
  onDeletePost: (postId: string) => void;
}

const PostCard = ({ post, onDeletePost }: PostCardProps) => {
  const [isAnonymousComment, setIsAnonymousComment] = useState(false);
  const { user } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { mutate: addComment, isLoading: isCommenting } = useAddComment();
  const { mutate: addLike, isLoading: isLiking } = useLikePost();
  const { mutate: addSavedContent, isLoading: isSaving } = useAddSavedContent();

  const { data: likedStatus, isLoading: gettingLikedStatus } =
    useGetLikedStatus(post._id, user?.id as string);
  const { data: savedContentStatus, isLoading: gettingSavedContentStatus } =
    useGetContentSavedStatus(user?.id as string, 'post', post._id);
  const { data: membershipStatus, isLoading: isFetchingMembershipStatus } =
    useCheckJoinedStatus(post.communityId as string, user?.id as string);

  const queryClient = useQueryClient();
  function handleAddComment(data: FieldValues) {
    addComment(
      {
        comment: data.comment,
        userId: user?.id as string,
        postId: post._id,
        isAnonymous: isAnonymousComment,
      },
      {
        onSuccess: () => {
          post.postComments.push({
            userId: user?.id as string,
            userName: user?.firstName as string,
            comment: data.comment,
            commentDate: new Date(),
            userRole: user?.role as string,
            isAnonymous: isAnonymousComment,
            image: user?.image as string,
          });
          setValue('comment', '');
          setIsAnonymousComment(false);
        },
      }
    );
  }

  function handleLikePost() {
    addLike(
      {
        userId: user?.id as string,
        postId: post._id,
      },
      {
        onSuccess: (response) => {
          queryClient.invalidateQueries([
            'likedStatus',
            post._id,
            user?.id as string,
          ]);

          if (response.message.split(' ').includes('unliked')) {
            post.postLikes.pop();
            return;
          } else {
            post.postLikes.push({
              userId: user?.id as string,
              likedDate: new Date(),
            });
          }
        },
      }
    );
  }

  function handleSavePost() {
    addSavedContent(
      {
        category: post.postCategory,
        contentId: post._id,
        contentType: 'post',
        userId: user?.id as string,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            'contentSavedStatus',
            user?.id as string,
            'post',
            post._id,
          ]);
          queryClient.invalidateQueries(['savedContents', user?.id as string]);
        },
      }
    );
  }

  return (
    <Card className='lg:w-[750px] md:w-[500px] min-w-[400px]'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4 mb-5'>
            <div
              style={{
                backgroundImage: `url(${
                  post.isAnonymous
                    ? 'https://avatar.iran.liara.run/public'
                    : post?.image
                }
                )`,
              }}
              className='w-12 h-12 bg-cover rounded-full'
            ></div>
            <div className='flex flex-col'>
              <div className='flex items-center gap-2'>
                <span className='font-medium'>
                  {post?.userId === user?.id
                    ? 'You'
                    : post.isAnonymous
                    ? 'Anonymous member'
                    : post?.userName}
                </span>
                {(!post.isAnonymous || post?.userId === user?.id) && (
                  <Badge className=''>{post.userRole}</Badge>
                )}
              </div>
              <span className='text-xs'>
                Posted at {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
          <div className='flex flex-col items-end'>
            {((user?.id === post.userId && membershipStatus) ||
              user?.role === 'admin') && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <span className='text-2xl'>
                    <BsThreeDots />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className='flex items-center gap-2'
                      onClick={() => onDeletePost(post._id)}
                    >
                      <FaTrashAlt />
                      <span>Move to Trash</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <div className='flex flex-col items-end gap-2'>
              <div className='flex items-center gap-1'>
                {user?.id === post.userId && membershipStatus && (
                  <EditPostDialog post={post} />
                )}
                <span
                  className='text-xl hover:cursor-pointer'
                  onClick={handleSavePost}
                >
                  {gettingSavedContentStatus || isSaving ? (
                    <LoadingSpinner />
                  ) : savedContentStatus ? (
                    <IoBookmark />
                  ) : (
                    <IoBookmarkOutline />
                  )}
                </span>
              </div>

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
        </div>
        <CardTitle>{post.postTitle}</CardTitle>
      </CardHeader>
      <CardContent className='m-5 whitespace-pre-wrap'>
        <ExpandableText content={post.post} length={300} />
      </CardContent>
      {post.isEdited && (
        <p className='px-3 py-1 text-xs text-right text-gray-500'>(Edited)</p>
      )}
      <CardFooter className='flex flex-col gap-3 text-sm font-medium'>
        <Separator />
        <div className='relative flex items-center gap-10'>
          <div className='flex items-center gap-3'>
            {isFetchingMembershipStatus && <LoadingSpinner />}
            {membershipStatus && (
              <span
                style={{ fontSize: '25px' }}
                onClick={handleLikePost}
                className='hover:cursor-pointer'
              >
                {gettingLikedStatus || isLiking ? (
                  <LoadingSpinner />
                ) : likedStatus ? (
                  <FcLike />
                ) : (
                  <FcLikePlaceholder />
                )}
              </span>
            )}
            <span>
              {post.postLikes.length > 0
                ? post.postLikes.length === 1
                  ? '1 like'
                  : `${post.postLikes.length} likes`
                : 'No likes'}
            </span>
          </div>
          <p>
            {post.postComments.length <= 0 ? (
              'Be the first one to comment.'
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
        </div>
        <Separator />

        {isFetchingMembershipStatus && <LoadingSpinner />}
        {membershipStatus && (
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
                <div className='flex items-center gap-1 text-sm'>
                  <Checkbox
                    placeholder='Make it anonymous'
                    checked={isAnonymousComment}
                    onCheckedChange={() =>
                      setIsAnonymousComment((previous) => !previous)
                    }
                  />
                  <label>Make it anonymous</label>
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
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
