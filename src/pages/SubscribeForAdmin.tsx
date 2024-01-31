import { useNavigate } from 'react-router-dom';
import Heading from '../components/Heading';
import SubscriptionPlanAddSection from '../components/SubscriptionPlanAddSection';
import SubscriptionPlanCard from '../components/SubscriptionPlanCard';
import { Button } from '../components/ui/button';
import useGetSubscriptionPlans from '../services/subscriptionPlans/getSubscriptionPlans';

const SubscribeForAdmin = () => {
  const { data: subscriptionPlans } = useGetSubscriptionPlans();
  const navigate = useNavigate();
  return (
    <>
      <div className='flex flex-wrap justify-between'>
        <Heading>Subscription Plans</Heading>
        <Button variant={'link'} onClick={() => navigate('/subscribe')}>
          User view of Subscribe page
        </Button>
      </div>

      <div className='flex gap-5'>
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
