import { Dialog, DialogContent, DialogTrigger } from '../components/ui/dialog';
import useGetSpecificCommunity from '../services/community/getSpecificCommunity';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';
import useGetCommunityMembers from '../services/communityMembers/getCommunityMembers';
import Heading from '../components/Heading';
import { BsSignpostSplit } from 'react-icons/bs';
import { Input } from '../components/ui/input';
import AddPostCard from '../components/AddPostCard';
import { useGetPosts } from '../services/posts/getPosts';
import { Separator } from '../components/ui/separator';
import PostCard from '../components/PostCard';

const SpecificCommunity = () => {
  const { communityId } = useParams<{ communityId: string }>();
  const { user } = useAuthContext();
  const { data: communityMembers } = useGetCommunityMembers(
    communityId as string
  );

  console.log(communityMembers);

  const { data: community } = useGetSpecificCommunity(communityId as string);
  const { data: posts } = useGetPosts(communityId as string);
  console.log(posts);
  console.log(community);

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
              <span className='hover:underline hover:cursor-pointer'>
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
            <div className='flex flex-col gap-5'>
              {posts &&
                posts.map((post, index) => (
                  <PostCard post={post} key={index} />
                ))}
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
