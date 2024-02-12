import { useNavigate, useParams } from 'react-router-dom';
import useGetSpecificCommunity from '../services/community/getSpecificCommunity';
import useGetPostsByUser from '../services/posts/getPostsByUser';
import Heading from '../components/Heading';

import { Button } from '../components/ui/button';
import LoadingSpinner from '../components/LoadingSpinner';
import useGetQAsByUserInCommunity from '../services/QAs/getQAsByUserInCommunity';
import PostCard from '../components/PostCard';
import useDeletePost from '../services/posts/deletePost';
import QuestionAnswerCard from '../components/QuestionAnswerCard';
import useDocumentTitle from '../services/getTitle';

const SpecificUserPosts = () => {
  const { communityId, userId } = useParams();
  console.log(communityId, userId);

  const { data: community, isLoading } = useGetSpecificCommunity(
    communityId as string
  );
  const { data: posts, isLoading: isPostsLoading } = useGetPostsByUser(
    communityId as string,
    userId as string
  );
  const { data: qas, isLoading: isQAsLoading } = useGetQAsByUserInCommunity(
    communityId as string,
    userId as string
  );
  const { mutate: deletePost } = useDeletePost(
    communityId as string,
    userId as string
  );

  useDocumentTitle(`Posts - ${community?.communityName} SelfSync`);

  const navigate = useNavigate();

  console.log(community);
  console.log(qas);
  console.log(posts);

  function handleDeletePost(postId: string) {
    deletePost(postId);
    console.log(postId);
    console.log(posts);
    posts?.filter((post) => post._id !== postId);
  }

  return (
    <div>
      {(isLoading || isPostsLoading) && <LoadingSpinner />}
      {posts && posts.length > 0 && !isPostsLoading && !isLoading && (
        <>
          <Heading>{`Posts by ${posts[0]?.userName} in ${community?.communityName} community`}</Heading>
          <div>
            <Heading className='text-xl'>Posts of different categories</Heading>
            <div className='flex flex-wrap items-center justify-center gap-5 p-5'>
              {posts.map((post, index) => (
                <div key={index} className='w-[400px] lg:w-[600px]'>
                  <PostCard post={post} onDeletePost={handleDeletePost} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {qas && qas.length > 0 && !isQAsLoading && !isLoading && (
        <>
          <div>
            <Heading className='text-xl'>{`QAs by ${qas[0]?.userName} in ${community?.communityName} community`}</Heading>
            {qas.map((question, index) => (
              <QuestionAnswerCard question={question} key={index} />
            ))}
          </div>
        </>
      )}

      {posts &&
        qas &&
        posts.length === 0 &&
        qas.length === 0 &&
        !isPostsLoading &&
        !isQAsLoading &&
        !isLoading && (
          <>
            <Heading>No posts yet in this community.</Heading>
            <Button onClick={() => navigate(-1)} variant={'link'}>
              Go back
            </Button>
          </>
        )}
    </div>
  );
};

export default SpecificUserPosts;
