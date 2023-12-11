import { useParams } from 'react-router-dom';

const SpecificCommunity = () => {
  const { communityId } = useParams<{ communityId: string }>();

  //   const {data:community} = useGetCo

  return <div>SpecificCommunity</div>;
};

export default SpecificCommunity;
