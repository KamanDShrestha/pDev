import { useParams } from 'react-router-dom';

const SubscriptionConfirmation = () => {
  const { subscriptionId } = useParams();
  console.log(subscriptionId);
  return <div>SubscriptionConfirmation</div>;
};

export default SubscriptionConfirmation;
