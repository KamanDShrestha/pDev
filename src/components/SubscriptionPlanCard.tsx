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
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { useNavigate } from 'react-router-dom';

interface SubscriptionPlanCardProps {
  subscriptionPlan: SubscriptionPlan;
}

const SubscriptionPlanCard = ({
  subscriptionPlan,
}: SubscriptionPlanCardProps) => {
  const navigate = useNavigate();
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
      </CardContent>
      <CardFooter className='flex justify-center'>
        <Button
          variant={'outline'}
          className='flex items-center gap-1'
          onClick={() => navigate(`/subscribe/${subscriptionPlan._id}`)}
        >
          <span>Get Started</span>
          <FaPlay />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionPlanCard;
