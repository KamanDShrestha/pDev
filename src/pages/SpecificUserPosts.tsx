import { useNavigate, useParams } from 'react-router-dom';
import useGetSpecificCommunity from '../services/community/getSpecificCommunity';
import useGetPostsByUser from '../services/posts/getPostsByUser';
import Heading from '../components/Heading';

import { Button } from '../components/ui/button';

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

  const navigate = useNavigate();

  console.log(community);
  console.log(posts);

  return (
    <div>
      {posts && posts.length > 0 ? (
        <Heading>{`Posts by ${posts[0]?.userName}`}</Heading>
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
