import { useParams } from 'react-router-dom';
import useGetCommunityMembers from '../services/communityMembers/getCommunityMembers';

const SpecificCommunity = () => {
  const { communityId } = useParams<{ communityId: string }>();

  const { data: communityMembers } = useGetCommunityMembers(
    communityId as string
  );

  //   const {data:community} = useGetCo

  return <div>SpecificCommunity</div>;
};

export default SpecificCommunity;
