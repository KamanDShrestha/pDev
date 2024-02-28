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
import { Card, CardContent } from '../components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../components/ui/pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import useGetRandomQuote from '../services/quotes/getRandomQuote';

const SpecificCommunity = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [sortDirection, setSortDirection] = useState<string | undefined>();
  const [limit, setLimit] = useState<number>(5);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const skip = (pageNumber - 1) * limit;

  const { communityId } = useParams<{ communityId: string }>();
  const { user } = useAuthContext();
  const { data: communityMembers } = useGetCommunityMembers(
    communityId as string
  );
  console.log(communityMembers);

  const { data: community } = useGetSpecificCommunity(communityId as string);
  const { data: randomQuote, isLoading: isFetchingRandomQuote } =
    useGetRandomQuote(community?.communityName as string);

  const { mutate: deletePost } = useDeletePost(
    communityId as string,
    selectedCategory
  );

  const { data, isLoading: isFetchingPosts } = useGetPosts(
    communityId as string,
    {
      category: selectedCategory,
      sortBy: sortBy,
      sortDirection: sortDirection,
      limit: limit,
      skip: skip,
    }
  );

  const { posts, total } = data || {};

  const numberOfPages = Math.ceil((total && total / limit) || 1);
  useDocumentTitle(`${community?.communityName} - Community - SelfSync`);

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
      <div className='w-[full] h-[80vh] bg-gray-200 flex items-center '>
        <div className='flex items-center justify-center w-full h-full p-10'>
          {isFetchingRandomQuote && <LoadingSpinner />}
          {randomQuote && (
            <div className='space-y-5'>
              <p className='text-2xl'>{randomQuote.quote}</p>
              <p className='text-lg text-right'> - {randomQuote.author}</p>
            </div>
          )}
        </div>
      </div>

      <div className='grid lg:grid-cols-[300px_minmax(440px,_1fr)_100px] gap-5 mt-8 grid-cols-1 '>
        <div className='flex items-center justify-center'>
          <div className='flex flex-col items-center justify-center p-4 border-4 rounded-xl border-slate-300'>
            <img
              src={user?.image}
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
            <Card className='my-10'>
              <CardContent className='flex flex-wrap justify-around p-3'>
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
                <Select onValueChange={(value) => setSortBy(value)}>
                  <SelectTrigger className='max-w-[300px] my-5'>
                    <SelectValue placeholder='Sort by' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort by</SelectLabel>
                      <SelectItem value='createdAt'>Sort by Date</SelectItem>
                      <SelectItem value='likeCount'>Sort by Likes</SelectItem>
                      <SelectItem value='commentCount'>
                        Sort by Comments
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => setSortDirection(value)}>
                  <SelectTrigger className='max-w-[300px] my-5'>
                    <SelectValue placeholder='Sort Direction' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort Direction</SelectLabel>
                      <SelectItem value='asc'>Ascending Order</SelectItem>
                      <SelectItem value='desc'>Descending Order</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardContent>
              <CardContent className='flex flex-col items-center justify-center p-3'>
                <Select onValueChange={(value) => setLimit(parseInt(value))}>
                  <SelectTrigger className='max-w-[300px] my-5'>
                    <SelectValue placeholder='Number of posts' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Number of posts</SelectLabel>
                      {Array.from({ length: 10 }, (_, index) => (
                        <SelectItem key={index} value={(index + 1).toString()}>
                          {index + 1}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center justify-center'>
                {isFetchingPosts && <LoadingSpinner />}
              </div>

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

              {posts && (posts === null || posts.length === 0) && (
                <p>No posts found</p>
              )}
            </div>
          </div>

          <Pagination className='flex flex-col items-center justify-center gap-3 my-10'>
            <p>
              Showing {1 + skip} to {skip + ((posts && posts.length) || 0)} of{' '}
              {total && total} posts
            </p>
            <PaginationContent>
              {pageNumber > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPageNumber(pageNumber - 1)}
                  />
                </PaginationItem>
              )}

              {Array.from({ length: numberOfPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    key={index}
                    isActive={index + 1 === pageNumber}
                    onClick={() => setPageNumber(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {pageNumber !== numberOfPages && (
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPageNumber(pageNumber + 1)}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
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
