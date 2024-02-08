import { FieldValues, useForm } from 'react-hook-form';
import useGetSpecificSubscriptionPlan from '../../services/subscriptionPlans/getSpecificSubscriptionPlan';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Heading from '../../components/Heading';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Input } from '../../components/ui/input';
import ErrorMessage from '../../components/ErrorMessage';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import useUpdateSubscriptionPlan from '../../services/subscriptionPlans/updateSubscriptionPlan';

import { MdOutlineArrowLeft } from 'react-icons/md';
const EditSubscriptionPlanPage = () => {
  const { id } = useParams();
  console.log(id);
  const { data: subscriptionPlan, isLoading } = useGetSpecificSubscriptionPlan(
    id as string
  );
  const { mutate: updateSubscriptionPlan, isLoading: isUpdating } =
    useUpdateSubscriptionPlan();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      subscriptionPlan: subscriptionPlan?.subscriptionPlan,
      subscriptionPrice: subscriptionPlan?.subscriptionPrice,
      subscriptionDuration: subscriptionPlan?.subscriptionDuration,
      subscriptionDescription: subscriptionPlan?.subscriptionDescription,
      subscriptionFeatures: subscriptionPlan?.subscriptionFeatures,
    },
  });

  useEffect(() => {
    reset({
      subscriptionPlan: subscriptionPlan?.subscriptionPlan,
      subscriptionPrice: subscriptionPlan?.subscriptionPrice,
      subscriptionDuration: subscriptionPlan?.subscriptionDuration,
      subscriptionDescription: subscriptionPlan?.subscriptionDescription,
      subscriptionFeatures: subscriptionPlan?.subscriptionFeatures,
    });
  }, [subscriptionPlan?._id]);

  const navigate = useNavigate();

  console.log(subscriptionPlan);
  console.log(errors);

  function handleSubscriptionPlanUpdate(data: FieldValues) {
    console.log('field values', data);
    updateSubscriptionPlan({
      planId: id as string,
      newSubscriptionPlan: {
        subscriptionPlan: data.subscriptionPlan,
        subscriptionDescription: data.subscriptionDescription,
        subscriptionPrice: data.subscriptionPrice,
        subscriptionDuration: data.subscriptionDuration,
        subscriptionFeatures: data.subscriptionFeatures,
      },
    });
  }
  return (
    <>
      <Button variant={'link'} onClick={() => navigate(-1)}>
        {' '}
        <span className='text-3xl'>
          <MdOutlineArrowLeft />
        </span>
        Go back
      </Button>
      <Heading>Edit the subscription plan</Heading>
      <div>{isLoading && <LoadingSpinner />}</div>
      <div>
        {subscriptionPlan && (
          <>
            <div className='flex flex-col items-center w-[100vw] h-full m-auto gap-10'>
              <div className='flex flex-wrap justify-around gap-10'>
                <div>
                  <div>
                    <Heading className='mb-2 text-2xl'>
                      Subscription Plan
                    </Heading>
                    <Input
                      type='text'
                      {...register('subscriptionPlan', {
                        required: 'Subscription Plan is required',
                        min: {
                          value: 3,
                          message:
                            'Subscription Plan should be atleast 3 characters',
                        },
                      })}
                      className='text-lg w-[300px]'
                    />
                    {errors.subscriptionPlan && (
                      <ErrorMessage>
                        {errors.subscriptionPlan.message as string}
                      </ErrorMessage>
                    )}
                  </div>
                  <div>
                    <Heading className='mb-2 text-2xl'>Description</Heading>
                    <Textarea
                      {...register('subscriptionDescription', {
                        required: 'Description is required',
                        min: {
                          value: 10,
                          message: 'Description must be 10 characters long',
                        },
                      })}
                      className='text-lg h-[200px] w-[450px]'
                    />
                    {errors.subscriptionDescription && (
                      <ErrorMessage>
                        {errors.subscriptionDescription.message as string}
                      </ErrorMessage>
                    )}
                  </div>
                </div>
                <div>
                  <div>
                    <Heading className='mb-2 text-2xl'>
                      Subscription Price
                    </Heading>
                    <Input
                      type='text'
                      {...register('subscriptionPrice', {
                        required: 'Subscription Price is required',
                        min: {
                          value: 3,
                          message:
                            'Subscription Price should be atleast 3 characters',
                        },
                      })}
                      className='text-lg w-[300px]'
                    />
                    {errors.subscriptionPrice && (
                      <ErrorMessage>
                        {errors.subscriptionPrice.message as string}
                      </ErrorMessage>
                    )}
                  </div>
                  <div>
                    <Heading className='mb-2 text-2xl'>
                      Subscription Duration
                    </Heading>
                    <Input
                      type='text'
                      {...register('subscriptionDuration', {
                        required: 'Subscription Duration is required',
                        min: {
                          value: 3,
                          message:
                            'Subscription Duration should be atleast 3 characters',
                        },
                      })}
                      className='text-lg w-[300px]'
                    />
                    {errors.subscriptionDuration && (
                      <ErrorMessage>
                        {errors.subscriptionDuration.message as string}
                      </ErrorMessage>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <Heading className='mb-2 text-2xl'>Features</Heading>
                {subscriptionPlan.subscriptionFeatures.map(
                  (_feature, index) => (
                    <>
                      <Input
                        {...register(`subscriptionFeatures.${index}`, {
                          required: 'Subscription feature is required',
                          min: {
                            value: 3,
                            message:
                              'Subscription feature should be atleast 3 characters',
                          },
                        })}
                        key={index + 1}
                        className='text-md w-[300px] lg:w-[500px]'
                      />
                      {/* {errors.`subscriptionFeatures${[index]}` && (
                        <ErrorMessage>
                          {errors.subscriptionFeatures.message as string}
                        </ErrorMessage>
                      )} */}
                    </>
                  )
                )}
              </div>
              <Button
                onClick={handleSubmit(handleSubscriptionPlanUpdate)}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <LoadingSpinner />
                ) : (
                  'Update the subscription plan'
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EditSubscriptionPlanPage;
