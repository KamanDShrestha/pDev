import { useNavigate, useParams } from 'react-router-dom';
import useGetSpecificCommunity from '../services/community/getSpecificCommunity';
import useGetPostsByUser from '../services/posts/getPostsByUser';
import Heading from '../components/Heading';

import { Button } from '../components/ui/button';
import LoadingSpinner from '../components/LoadingSpinner';

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
  //   const {data: qas, isLoading: isQAsLoading} = useGetQ(communityId as string, userId as string);

  const navigate = useNavigate();

  console.log(community);
  console.log(posts);

  return (
    <div>
      {(isLoading || isPostsLoading) && <LoadingSpinner />}
      {posts && posts.length > 0 && !isPostsLoading && !isLoading ? (
        <Heading>{`Posts by ${posts[0]?.userName} in ${community?.communityName} community`}</Heading>
      ) : (
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
