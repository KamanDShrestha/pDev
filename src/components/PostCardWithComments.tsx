import { PostData } from '../types';
import { Separator } from './ui/separator';
import Heading from './Heading';
import { useAuthContext } from '../context/AuthProvider';
import { Badge } from './ui/badge';
import TruncatedText from './TruncatedText';

interface PostCardWithCommentsProps {
  post: PostData;
}

const PostCardWithComments = ({ post }: PostCardWithCommentsProps) => {
  const { user } = useAuthContext();
  console.log(post);
  return (
    <div>
      <div className='flex items-center gap-4'>
        <img
          src={
            post.isAnonymous
              ? 'https://avatar.iran.liara.run/public'
              : post?.image
          }
          alt='user'
          className='w-12 h-12 rounded-full'
        />
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
      <div className='m-4 whitespace-pre-wrap'>
        <Heading className='mb-2 text-xl'>{post.postTitle}</Heading>
        <TruncatedText content={post.post} limit={250} />
      </div>

      <Separator className='my-4' />
      <div>
        {post.postComments.length > 0 ? (
          <>
            <Heading className='mb-2 text-lg'>Comments</Heading>
            <div className='flex flex-col gap-3 max-h-[400px] overflow-scroll'>
              {post.postComments.map((comment) => (
                <div className='p-3 border rounded-lg'>
                  <div className='flex items-center gap-4'>
                    <img
                      src={
                        comment.isAnonymous
                          ? 'https://avatar.iran.liara.run/public'
                          : comment?.image
                      }
                      alt='user-image'
                      className='w-8 h-8 rounded-full'
                    />
                    <div className='flex flex-col'>
                      <div className='flex items-center gap-2'>
                        <span className='font-medium'>
                          {comment?.userId === user?.id
                            ? 'You'
                            : comment.isAnonymous
                            ? 'Anonymous member'
                            : comment?.userName}
                        </span>
                        {(!comment.isAnonymous ||
                          comment?.userId === user?.id) && (
                          <Badge className=''>{comment.userRole}</Badge>
                        )}
                      </div>
                      <span className='text-xs'>
                        Commented at{' '}
                        {new Date(comment.commentDate).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className='mt-3 text-sm'>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className='text-sm'>No comments</p>
        )}
      </div>
    </div>
  );
};

export default PostCardWithComments;
