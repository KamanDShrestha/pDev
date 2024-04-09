import Heading from '../components/Heading';
import { useAuthContext } from '../context/AuthProvider';
import { Button } from '../components/ui/button';
import useGetCommunities from '../services/community/getCommunities';
import { useNavigate } from 'react-router-dom';
import CommunityCard from '../components/CommunityCard';
import LoadingSpinner from '../components/LoadingSpinner';
import useDocumentTitle from '../services/getTitle';

const Community = () => {
  const { user } = useAuthContext();
  const { data: communities, isLoading } = useGetCommunities();

  const navigate = useNavigate();

  useDocumentTitle('Communities - SelfSync');

  return (
    <>
      <div className='flex flex-wrap items-center justify-between mb-3'>
        <Heading>Our communities</Heading>
        {user?.role === 'admin' && (
          <Button onClick={() => navigate('/addCommunity')}>
            Create a community
          </Button>
        )}
      </div>
      <div className='flex flex-wrap items-center justify-center gap-10'>
        <div>{isLoading && <LoadingSpinner />}</div>
        {communities && communities.length === 0 ? (
          <p>No communities found</p>
        ) : (
          communities?.map((community, index) => (
            <CommunityCard community={community} key={index} />
          ))
        )}
      </div>
    </>
  );
};

export default Community;
