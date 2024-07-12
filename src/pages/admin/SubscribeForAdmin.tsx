import React from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../../components/Heading';
import SubscriptionPlanAddSection from '../../components/SubscriptionPlanAddSection';
import SubscriptionPlanCard from '../../components/SubscriptionPlanCard';
import { Button } from '../../components/ui/button';
import useGetSubscriptionPlans from '../../services/subscriptionPlans/getSubscriptionPlans';
import useDocumentTitle from '../../services/getTitle';
import { Separator } from '../../components/ui/separator';

const SubscribeForAdmin = () => {
  const { data: subscriptionPlans } = useGetSubscriptionPlans();
  const navigate = useNavigate();

  useDocumentTitle('Subscribe - Admin - SelfSync');
  return (
    <>
      <div className='flex flex-wrap justify-between'>
        <Heading>Subscription Plans</Heading>
        <Button variant={'link'} onClick={() => navigate('/subscribe')}>
          User view of Subscribe page
        </Button>
      </div>

      <div className='flex items-center justify-center gap-5'>
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
      <Separator className='my-10' />
      <div>
        <SubscriptionPlanAddSection />
      </div>
    </>
  );
};

export default SubscribeForAdmin;
