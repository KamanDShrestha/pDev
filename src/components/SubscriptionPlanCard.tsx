import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from './ui/card';
import { SubscriptionPlan } from '../types';
import Heading from './Heading';

import { FaCircle, FaPlay } from 'react-icons/fa';
import { Button, buttonVariants } from './ui/button';
import { Separator } from './ui/separator';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';
import useDeleteSubscriptionPlan from '../services/subscriptionPlans/deleteSubscriptionPlan';
import LoadingSpinner from './LoadingSpinner';
import useUpdateSubscriptionPlanStatus from '../services/subscriptionPlans/updateSubscriptionPlanStatus';
import { cn } from '../lib/utils';
import { statusColoring } from '../constants';

interface SubscriptionPlanCardProps {
  subscriptionPlan: SubscriptionPlan;
}

const SubscriptionPlanCard = ({
  subscriptionPlan,
}: SubscriptionPlanCardProps) => {
  const { user } = useAuthContext();

  const { mutate: deleteSubscriptionPlan, isLoading: isDeleting } =
    useDeleteSubscriptionPlan();
  const { mutate: activateSubscriptionPlan, isLoading: isActivating } =
    useUpdateSubscriptionPlanStatus();

  const navigate = useNavigate();

  function handleSubscriptionPlanDelete() {
    deleteSubscriptionPlan({ planId: subscriptionPlan._id });
  }

  function handleSubscriptionPlanActivation() {
    activateSubscriptionPlan({
      planId: subscriptionPlan._id,
      activeStatus: true,
    });
  }

  function handleSubscriptionPlanDeactivation() {
    activateSubscriptionPlan({
      planId: subscriptionPlan._id,
      activeStatus: false,
    });
  }

  return (
    <Card className='lg:w-[550px] w-[400px] py-3'>
      <CardContent className='text-center'>
        <div>
          <Heading className='mb-1 text-3xl'>Subscription Tier</Heading>
          <CardTitle>{subscriptionPlan.subscriptionPlan}</CardTitle>
        </div>
        <Separator className='my-2' />
        <CardDescription>
          {subscriptionPlan.subscriptionDescription}
        </CardDescription>
        <div className='mt-4'>
          <CardTitle className='text-xl'>Features</CardTitle>
          <div className='flex flex-col gap-3'>
            {subscriptionPlan.subscriptionFeatures.map((feature, index) => (
              <div className='flex flex-col gap-1 text-sm' key={index}>
                <span className='flex items-center justify-center gap-3'>
                  <span className='text-[5px]'>
                    <FaCircle />
                  </span>
                  <span>{feature}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-4'>
          <CardTitle className='text-xl'>Price:</CardTitle>
          <p className='text-lg'>Rs. {subscriptionPlan.subscriptionPrice}</p>
        </div>
        <div className='mt-4'>
          <p className='text-sm font-light'>
            Subscription for {subscriptionPlan.subscriptionDuration}*
          </p>
        </div>
        <Separator className='mt-3' />
      </CardContent>
      {user?.role === 'admin' ? (
        <CardFooter className='flex flex-col gap-3'>
          <div
            className={cn(
              `px-3 py-2 rounded-full text-xs`,
              subscriptionPlan.isActive
                ? statusColoring.resolved
                : statusColoring.rejected
            )}
          >
            {subscriptionPlan.isActive ? 'Activate plan' : 'Deactivated plan'}
          </div>
          <div className='flex justify-center gap-5'>
            <NavLink
              to={`/subscriptionPlans/edit/${subscriptionPlan._id}`}
              className={buttonVariants({ variant: 'default' })}
            >
              Edit
            </NavLink>
            <Button
              variant={'destructive'}
              onClick={handleSubscriptionPlanDelete}
              disabled={isDeleting}
            >
              {isDeleting ? <LoadingSpinner /> : 'Delete'}
            </Button>

            {subscriptionPlan.isActive !== true ? (
              <Button
                onClick={handleSubscriptionPlanActivation}
                disabled={isActivating}
              >
                {isActivating ? <LoadingSpinner /> : 'Activate this plan'}
              </Button>
            ) : (
              <Button
                onClick={handleSubscriptionPlanDeactivation}
                disabled={isActivating}
              >
                {isActivating ? <LoadingSpinner /> : 'Deactivate the plan'}
              </Button>
            )}
          </div>
        </CardFooter>
      ) : (
        <CardFooter className='flex items-center justify-center'>
          {user?.hasSubscribed ? (
            <NavLink
              to={'/home'}
              className='text-sm text-center hover:underline'
            >
              You have already subscribed to this plan. <br />
              <span className='text-xs'>Navigate to Home page</span>
            </NavLink>
          ) : (
            <Button
              variant={'outline'}
              className='flex items-center gap-1'
              onClick={() => navigate(`/subscribe/${subscriptionPlan._id}`)}
            >
              <span>Get Started</span>
              <FaPlay />
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default SubscriptionPlanCard;
