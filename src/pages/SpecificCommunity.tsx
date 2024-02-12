import { Dialog, DialogContent, DialogTrigger } from '../components/ui/dialog';
import useGetSpecificCommunity from '../services/community/getSpecificCommunity';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';
import useGetCommunityMembers from '../services/communityMembers/getCommunityMembers';
import Heading from '../components/Heading';
import { BsSignpostSplit } from 'react-icons/bs';
import { Input } from '../components/ui/input';
import AddPostCard from '../components/AddPostCard';
import { useGetPosts } from '../services/posts/getPosts';
import { Separator } from '../components/ui/separator';
import PostCard from '../components/PostCard';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { useState } from 'react';

import QuestionAnswerCard from '../components/QuestionAnswerCard';
import { PostData, QAsData } from '../types';
import useDeletePost from '../services/posts/deletePost';
import useDocumentTitle from '../services/getTitle';

const SpecificCommunity = () => {
  const { communityId } = useParams<{ communityId: string }>();
  const { user } = useAuthContext();
  const { data: communityMembers } = useGetCommunityMembers(
    communityId as string
  );
  console.log(communityMembers);

  const { data: community } = useGetSpecificCommunity(communityId as string);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const { mutate: deletePost } = useDeletePost(
    communityId as string,
    selectedCategory
  );

  const { data: posts } = useGetPosts(communityId as string, {
    category: selectedCategory,
  });

  useDocumentTitle(`${community?.communityName} - SelfSync`);

  console.log(posts);
  console.log(community);

  const navigate = useNavigate();
  const categories = [
    { label: 'Reflection', value: 'reflection' },
    { label: 'Learning', value: 'learning' },
    { label: 'Question', value: 'question' },
  ];

  function handleDeletePost(postId: string) {
    deletePost(postId);
    console.log(postId);
    console.log(posts);
    posts?.filter((post) => post._id !== postId);
  }

  return (
    <>
      <div className='bg-slate-100 w-full h-[90vh]'>
        Placeholder for images and quotes? Some chill, relaxing camp fire art?
      </div>

      <div className='grid lg:grid-cols-[300px_minmax(440px,_1fr)_100px] gap-5 mt-8 grid-cols-1 '>
        <div className='flex items-center justify-center'>
          <div className='flex flex-col items-center justify-center p-4 border-4 rounded-xl border-slate-300'>
            <img
              src='https://picsum.photos/200'
              alt='user'
              className='w-20 h-20 rounded-full'
            />
            <Heading className='text-xl'>
              {user?.firstName} {user?.lastName}
            </Heading>
            <div className='flex items-center gap-2 font-medium hover:underline hover:cursor-pointer'>
              <span style={{ fontSize: '20px' }}>
                <BsSignpostSplit />
              </span>
              <span
                className='hover:underline hover:cursor-pointer'
                onClick={() =>
                  navigate(`/community/${communityId}/posts/${user?.id}`)
                }
              >
                My posts
              </span>
            </div>
          </div>
        </div>
        <div>
          <Heading>{community?.communityName}</Heading>

          <div className='flex items-center justify-center gap-5'>
            <img
              src={community?.communityIcon.light}
              className='w-32'
              alt='community icon'
            />
            <span className='text-lg'>{community?.communityDescription}</span>
          </div>
          <div className='flex justify-center'>
            <Dialog>
              <DialogTrigger className='w-[40vw]'>
                <Input
                  className='py-6 border-2 rounded-full'
                  placeholder="What's on your mind?"
                />
              </DialogTrigger>
              <DialogContent>
                <AddPostCard />
              </DialogContent>
            </Dialog>
          </div>
          <Separator className='my-10' />
          <div className=''>
            <Heading>Our posts</Heading>
            <Select
              defaultValue={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger className='max-w-[300px] my-5'>
                <SelectValue placeholder='Categorized by' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value='all'>All posts</SelectItem>
                  {categories.map((category, index) => (
                    <>
                      <SelectItem key={index} value={category.value}>
                        {category.label}
                      </SelectItem>
                    </>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className='flex flex-col gap-5'>
              {posts &&
                posts.map((post, index) =>
                  selectedCategory === 'question' ? (
                    <QuestionAnswerCard
                      question={post as QAsData}
                      key={index}
                    />
                  ) : (
                    <PostCard
                      post={post as PostData}
                      key={index}
                      onDeletePost={handleDeletePost}
                    />
                  )
                )}

              {posts === null && <p>No posts found</p>}
            </div>
          </div>

          {/* <Button className='absolute right-4'>Create Post</Button> */}
        </div>
        {/* <div>
          <Dialog>
            <DialogTrigger>here</DialogTrigger>
            <DialogContent>hello</DialogContent>
          </Dialog>
          <Heading>Community Members</Heading>
          <div className='flex flex-wrap justify-center gap-5'>
            {communityMembers?.users?.map((member, index) => (
              <div
                className='flex flex-col items-center p-3 cursor-pointer'
                key={index}
              >
                <img
                  src='https://picsum.photos/200'
                  alt='user'
                  className='w-20 h-20 rounded-full'
                />
                <span className='text-lg font-medium'>{member.userId}</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default SpecificCommunity;
