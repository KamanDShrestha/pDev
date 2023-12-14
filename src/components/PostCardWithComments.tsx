import React from 'react';
import { PostData } from '../types';
import { Separator } from './ui/separator';
import Heading from './Heading';

interface PostCardWithCommentsProps {
  post: PostData;
}

const PostCardWithComments = ({ post }: PostCardWithCommentsProps) => {
  return (
    <div>
      <div className='flex items-center gap-4'>
        <img
          src='https://picsum.photos/200'
          alt='user'
          className='w-12 h-12 rounded-full'
        />
        <div className='flex flex-col'>
          <span className='font-medium'>{post.userName}</span>
          <span className='text-xs'>
            Questioned at {post.createdAt.toLocaleString()}
          </span>
        </div>
      </div>
      <div className='m-4'>
        <Heading className='mb-2 text-xl'>{post.postTitle}</Heading>
        <p>{post.post}</p>
      </div>

      <Separator className='my-4' />
      <div>
        {post.postComments.length > 0 ? (
          <>
            <Heading className='mb-2 text-lg'>Answers</Heading>
            {post.postComments.map((comment) => (
              <div className='p-3 border'>
                <div className='flex items-center gap-4'>
                  <img
                    src='https://picsum.photos/200'
                    alt='user'
                    className='w-8 h-8 rounded-full'
                  />
                  <div className='flex flex-col'>
                    <span className='text-sm font-medium'>
                      {comment.userName}
                    </span>
                    <span className='text-xs'>
                      Answered at {comment.commentDate.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className='mt-3 text-sm'>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className='text-sm'>No comments</p>
        )}
      </div>
      {/* <label className='font-medium'>Provide your answer</label>
      <div>
        <Textarea placeholder='Your answer...' {...register('answer')} />
      </div>
      <Button onClick={handleSubmit(handleSubmitAnswer)}>
        Submit your answer
      </Button> */}
    </div>
  );
};

export default PostCardWithComments;
