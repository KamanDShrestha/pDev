import Heading from '../components/Heading';
import SubscriptionPlanAddSection from '../components/SubscriptionPlanAddSection';
import SubscriptionPlanCard from '../components/SubscriptionPlanCard';
import useGetSubscriptionPlans from '../services/subscriptionPlans/getSubscriptionPlans';

const SubscribeForAdmin = () => {
  const { data: subscriptionPlans } = useGetSubscriptionPlans();
  return (
    <>
      <Heading>Subscription Plans</Heading>
      <div>
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
      <div>
        <SubscriptionPlanAddSection />
      </div>
    </>
  );
};

export default SubscribeForAdmin;
