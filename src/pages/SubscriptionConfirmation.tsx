import { useParams } from 'react-router-dom';
import Heading from '../components/Heading';
import { useAuthContext } from '../context/AuthProvider';
import useGetSpecificSubscriptionPlan from '../services/subscriptionPlans/getSpecificSubscriptionPlan';
import LoadingSpinner from '../components/LoadingSpinner';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Button } from '../components/ui/button';
import khaltiLogo from '../assets/paymentsGateway/khalti-logo.png';
import eSewaLogo from '../assets/paymentsGateway/esewa-icon.png';
import usePayViaKhalti from '../services/payments/payViaKhalti';
import usePayViaEsewa from '../services/payments/payViaEsewa';
import useDocumentTitle from '../services/getTitle';
const SubscriptionConfirmation = () => {
  const { subscriptionId } = useParams();
  const { user } = useAuthContext();

  const { data: subscriptionPlan, isLoading } = useGetSpecificSubscriptionPlan(
    subscriptionId as string
  );

  const { mutate: payViaKhalti, isLoading: isSubmittingForKhalti } =
    usePayViaKhalti();
  const { mutate: payViaESewa } = usePayViaEsewa();

  console.log(subscriptionPlan);
  console.log(subscriptionId);

  console.log('Payment via Khalti', isSubmittingForKhalti);

  const totalAmount =
    subscriptionPlan &&
    subscriptionPlan.subscriptionPrice +
      parseFloat((subscriptionPlan.subscriptionPrice * 0.13).toFixed(2));

  useDocumentTitle('Checkout - SelfSync');

  async function handlePaymentViaKhalti() {
    console.log('Payment via Khalti');

    const subscriptionDetails = {
      return_url: 'http://localhost:5173/verifyKhalti',
      website_url: 'http://localhost:5173/',
      amount: totalAmount! * 100, // in paisa
      purchase_order_id: subscriptionId || '',
      purchase_order_name:
        (subscriptionPlan && subscriptionPlan.subscriptionPlan) || '',
      customer_info: {
        name: user?.firstName + ' ' + user?.lastName,
        email: user?.email,
      },
      // amount_breakdown: [
      //   {
      //     label: 'Mark Price',
      //     amount: subscriptionPlan?.subscriptionPrice || 0 * 100,
      //   },
      //   {
      //     label: 'VAT',
      //     amount:
      //       (subscriptionPlan &&
      //         parseFloat(
      //           (subscriptionPlan?.subscriptionPrice * 0.13).toFixed(2)
      //         ) * 100) ||
      //       0,
      //   },
      // ],
    };

    payViaKhalti(subscriptionDetails, {
      onSuccess: (data) => {
        console.log(data);
        window.location.href = data.payment_url;
      },
    });
  }

  function handlePaymentViaEsewa() {
    const subscriptionDetails = {
      amount: '100',
      failure_url: 'https://google.com',
      product_delivery_charge: '0',
      product_service_charge: '0',
      product_code: 'EPAYTEST',
      signature: 'YVweM7CgAtZW5tRKica/BIeYFvpSj09AaInsulqNKHk=',
      signed_field_names: 'total_amount,transaction_uuid,product_code',
      success_url: 'https://esewa.com.np',
      tax_amount: '10',
      total_amount: '110',
      transaction_uuid: 'ab14a8f2b02c3',
    };

    payViaESewa(subscriptionDetails, {
      onSuccess: (data) => {
        console.log(data);
      },
    });
  }

  return (
    <>
      <Heading>Checkout</Heading>
      <div className='flex flex-wrap justify-around gap-5'>
        <div className='flex flex-wrap items-center justify-center gap-3'>
          <Card className='p-5 shadow-md'>
            <Heading className='mb-1 text-2xl'>Contact information</Heading>
            <Separator />
            <div className='flex flex-col px-3'>
              <div className='flex flex-wrap justify-between'>
                <div>
                  <Heading className='mb-0 text-lg'>First Name</Heading>
                  <p className='px-2'>{user?.firstName}</p>
                </div>
                <div>
                  <Heading className='mb-0 text-lg'>Last Name</Heading>
                  <p className='px-2'>{user?.lastName}</p>
                </div>
              </div>
              <div>
                <Heading className='mb-0 text-lg'>Email</Heading>
                <p className='px-2'>{user?.email}</p>
              </div>
            </div>
          </Card>
          <Card className='p-5 shadow-md'>
            <Heading className='mb-1 text-2xl'>Subscription Details</Heading>
            <Separator />
            <div className='flex flex-col px-3'>
              <div className='flex flex-col'>
                <div>
                  <Heading className='mb-0 text-lg'>Subscription Plan</Heading>
                  <p className='px-2'>
                    {isLoading && <LoadingSpinner />}
                    {subscriptionPlan && subscriptionPlan.subscriptionPlan}
                  </p>
                </div>
                <div>
                  <Heading className='mb-0 text-lg'>
                    Subscription Duration
                  </Heading>
                  <p className='px-2'>
                    {isLoading && <LoadingSpinner />}
                    {subscriptionPlan && subscriptionPlan.subscriptionDuration}
                  </p>
                </div>
                <div>
                  <Heading className='mb-0 text-lg'>Subscription Price</Heading>
                  <p className='px-2'>
                    {isLoading && <LoadingSpinner />}
                    {subscriptionPlan &&
                      `Rs. ${subscriptionPlan.subscriptionPrice}`}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Heading className='text-3xl'>Payment details</Heading>
          <Separator />
          <div className='px-3 py-2'>
            <div className='flex items-center justify-between'>
              <span className='mb-0 text-lg text-md'>Subtotal:</span>
              <span className='px-2'>
                {isLoading && <LoadingSpinner />}
                {subscriptionPlan &&
                  `Rs. ${subscriptionPlan.subscriptionPrice}`}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='mb-0 text-lg text-md'>VAT:</span>
              <span className='px-2'>
                {isLoading && <LoadingSpinner />}
                {subscriptionPlan &&
                  `Rs. ${(subscriptionPlan.subscriptionPrice * 0.13).toFixed(
                    2
                  )}`}
              </span>
            </div>
            <Separator className='my-2' />
            <div className='flex items-center justify-between'>
              <span className='mb-0 text-lg text-md'>Total amount:</span>
              <span className='px-2'>
                {isLoading && <LoadingSpinner />}
                {subscriptionPlan &&
                  `Rs. ${
                    subscriptionPlan.subscriptionPrice +
                    parseFloat(
                      (subscriptionPlan.subscriptionPrice * 0.13).toFixed(2)
                    )
                  }`}
              </span>
            </div>
          </div>
          <Separator className='my-3' />
          <div className='px-3'>
            <Heading className='mb-1 text-2xl'>Pay via</Heading>
            <div className='flex flex-col gap-2 px-2'>
              <Button
                variant={'outline'}
                className='space-x-1'
                onClick={handlePaymentViaKhalti}
                disabled={isSubmittingForKhalti}
              >
                {isSubmittingForKhalti ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <span>Pay via Khalti</span>
                    <img src={khaltiLogo} className='h-[30px]' />
                  </>
                )}
              </Button>
              <Button
                variant={'outline'}
                className='space-x-1'
                onClick={handlePaymentViaEsewa}
                disabled
              >
                <span>Pay via eSewa</span>
                <img src={eSewaLogo} className='h-[25px]' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionConfirmation;
