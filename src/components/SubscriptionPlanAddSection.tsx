import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

import ErrorMessage from './ErrorMessage';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import Heading from './Heading';
import { FieldValues, useForm } from 'react-hook-form';
import { Separator } from './ui/separator';
import { FaCircle, FaPlay } from 'react-icons/fa';
import useAddSubscriptionPlan from '../services/subscriptionPlans/addSubscriptionPlan';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from './ui/select';

const SubscriptionPlanAddSection = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { mutate: addSubscriptionPlan } = useAddSubscriptionPlan();

  const providedPlan = watch('subscriptionPlan');
  const providedDescription = watch('subscriptionDescription');
  const providedPrice = watch('subscriptionPrice');
  const providedDuration = watch('subscriptionDuration');
  const providedFeatures = [
    watch('feature1'),
    watch('feature2'),
    watch('feature3'),
  ];

  function handleSubscriptionPlanSubmit(data: FieldValues) {
    console.log(data);
    const addedFeatures = [data.feature1, data.feature2, data.feature3];
    addSubscriptionPlan({
      subscriptionPlan: data.subscriptionPlan,
      subscriptionDescription: data.subscriptionDescription,
      subscriptionPrice: data.subscriptionPrice,
      subscriptionDuration: data.subscriptionDuration,
      subscriptionFeatures: addedFeatures,
    });
  }

  return (
    <div className='flex flex-wrap items-center justify-center gap-5 p-5'>
      <Card className='lg:w-[550px] w-[400px]'>
        <CardHeader>
          <CardTitle className='text-3xl'>Preview</CardTitle>
          <CardDescription>
            You can preview the subscription plan here.
          </CardDescription>
        </CardHeader>
        <CardContent className='text-center'>
          <div>
            <Heading className='mb-1 text-3xl'>Subscription Tier</Heading>
            <CardTitle>{providedPlan}</CardTitle>
          </div>
          <Separator className='my-2' />
          <CardDescription>{providedDescription}</CardDescription>
          <div className='mt-4'>
            <CardTitle className='text-xl'>Features</CardTitle>
            <div className='flex flex-col gap-3'>
              {providedFeatures.map((feature, index) => (
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
            <p className='text-lg'>Rs. {providedPrice}</p>
          </div>
          <div className='mt-4'>
            <p className='text-sm font-light'>
              Subscription for {providedDuration}*
            </p>
          </div>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button variant={'outline'} className='flex items-center gap-1'>
            <span>Get Started</span>
            <FaPlay />
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Add new question prompts</CardTitle>
          <CardDescription>
            You can add new question prompts here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            <div>
              <Heading className='mb-0 text-lg font-medium'>
                Subscription Plan
              </Heading>
              <Input
                placeholder='Provide name for this subscription plan.'
                {...register('subscriptionPlan', {
                  required: {
                    value: true,
                    message: 'Please provide name for this subscription plan.',
                  },
                })}
              />
              {errors.subscriptionPlan && (
                <ErrorMessage>
                  {errors.subscriptionPlan.message as string}
                </ErrorMessage>
              )}
            </div>
            <div>
              <Heading className='mb-0 text-lg font-medium'>
                Description
              </Heading>
              <Textarea
                placeholder='Provide description for this subscription plan.'
                {...register('subscriptionDescription', {
                  required: {
                    value: true,
                    message:
                      'Please provide description for this subscription plan.',
                  },
                })}
              />
              {errors.description && (
                <ErrorMessage>
                  {errors.description.message as string}
                </ErrorMessage>
              )}
            </div>
            <div>
              <Heading className='mb-0 text-lg font-medium'>
                Subscription Price
              </Heading>
              <Input
                placeholder='Provide price for this subscription plan.'
                {...register('subscriptionPrice', {
                  required: {
                    value: true,
                    message: 'Please provide price for this subscription plan.',
                  },
                })}
                type='number'
              />
              {errors.subscriptionPrice && (
                <ErrorMessage>
                  {errors.subscriptionPrice.message as string}
                </ErrorMessage>
              )}
            </div>
            <div>
              <Heading className='mb-0 text-lg font-medium'>
                Subscription Duration
              </Heading>
              <Input
                placeholder='Provide duration for this subscription plan.'
                {...register('subscriptionDuration', {
                  required: {
                    value: true,
                    message:
                      'Please provide duration for this subscription plan.',
                  },
                })}
              />
              {errors.subscriptionDuration && (
                <ErrorMessage>
                  {errors.subscriptionDuration.message as string}
                </ErrorMessage>
              )}
            </div>

            <div>
              {/* <Select
                defaultValue={selectedNoOfQuestions.toString()}
                onValueChange={(value) =>
                  setSelectedNoOfQuestions(parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select no. of questions' />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(Array(8).keys()).map((value, index) => (
                    <SelectItem value={(value + 3).toString()} key={index}>
                      {value + 3}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
            </div>
            <div>
              <Heading className='mb-0 text-lg font-medium'>Features</Heading>
              <div className='p-3 overflow-scroll h-[250px] flex flex-col gap-3'>
                {Array.from(Array(3).keys()).map((_value, index) => (
                  <div key={index}>
                    <div>
                      <Heading className='mb-0 font-medium text-md'>
                        Feature {index + 1}
                      </Heading>
                      <Input
                        placeholder={`Feature ${index + 1}`}
                        {...register(`feature${index + 1}`, {
                          required: {
                            value: true,
                            message: `Please provide this feature.`,
                          },
                        })}
                      />
                      {errors[`feature${index + 1}`] && (
                        <ErrorMessage>
                          {errors[`feature${index + 1}`]?.message as string}
                        </ErrorMessage>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit(handleSubscriptionPlanSubmit)}>
            Add subscription plan
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubscriptionPlanAddSection;
