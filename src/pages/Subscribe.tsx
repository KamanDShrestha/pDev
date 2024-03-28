import Heading from '../components/Heading';
import useGetSubscriptionPlans from '../services/subscriptionPlans/getSubscriptionPlans';
import SubscriptionPlanCard from '../components/SubscriptionPlanCard';
import useDocumentTitle from '../services/getTitle';

const Subscribe = () => {
  const { data: subscriptionPlans } = useGetSubscriptionPlans();

  useDocumentTitle('Subscribe - SelfSync');
  return (
    <>
      <div className='flex flex-wrap justify-between'>
        <Heading>Subscription Plans</Heading>
      </div>
      <div className='flex justify-center gap-5'>
        {subscriptionPlans?.length === 0 && (
          <p> No subscription plans are present currently.</p>
        )}
        {subscriptionPlans &&
          subscriptionPlans.map((subscriptionPlan, index) => (
            <SubscriptionPlanCard
              subscriptionPlan={subscriptionPlan}
              key={index}
            />
          ))}
      </div>
    </>
  );
};

export default Subscribe;
