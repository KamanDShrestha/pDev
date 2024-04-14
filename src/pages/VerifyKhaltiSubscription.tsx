import { useNavigate, useSearchParams } from 'react-router-dom';
import useVerifyKhaltiPayment from '../services/payments/verifyKhaltiPayment';

import LoadingSpinner from '../components/LoadingSpinner';
import { useEffect, useState } from 'react';
import setToLocalStorage from '../services/localStorage/setToLocalStorage';
import { useAuthContext } from '../context/AuthProvider';
import useUpdateSubscriptionStatus from '../services/users/updateSubscriptionStatus';
import useAddPaymentForSubscription from '../services/payments/addPaymentForSubscription';
import Heading from '../components/Heading';

import subscriptionConfirmation from '../assets/tick.png';
import subscriptionError from '../assets/cross.png';
import useDocumentTitle from '../services/getTitle';
const VerifyKhaltiSubscription = () => {
  const [isNavigating, setIsNavigating] = useState(false);

  const [searchParams] = useSearchParams();
  const { user, setUser } = useAuthContext();

  console.log(
    'http://localhost:5173/verifyKhalti/?status=Completed&t=txn&idx=amNskoAxSn5rLpU6u5u4N2&token=QcYLzSajfrFPnK9wreJPn3&bank_reference=None&amount=33900&mobile=98XXXXX001&transaction_id=amNskoAxSn5rLpU6u5u4N2&tidx=amNskoAxSn5rLpU6u5u4N2&total_amount=33900&purchase_order_id=65ba18628cb85d1ed377857d&purchase_order_name=Premium&pidx=p2bcs2iBzV9KbNhWYYviuP'
  );
  console.log(searchParams.get('pidx'));
  const { mutate: updateSubscriptionStatus } = useUpdateSubscriptionStatus();
  const subscriptionId = searchParams.get('purchase_order_id');
  const totalAmount = searchParams.get('total_amount');
  const subscriptionPlan = searchParams.get('purchase_order_name');

  const { data: verificationStatus, isLoading: isVerifying } =
    useVerifyKhaltiPayment(searchParams.get('pidx') as string);

  const { mutate: addPayment } = useAddPaymentForSubscription();

  const navigate = useNavigate();
  console.log(verificationStatus);
  console.log(subscriptionId);

  useDocumentTitle('Subscription Verification - SelfSync');

  useEffect(() => {
    if (searchParams.get('status') === 'Canceled') {
      setIsNavigating(() => true);
      setTimeout(() => {
        setIsNavigating(() => false);
        navigate('/home');
      }, 2000);
    } else if (
      verificationStatus &&
      verificationStatus.status === 'Completed'
    ) {
      setToLocalStorage('authorization', { ...user, hasSubscribed: true });
      setUser && setUser((previous) => ({ ...previous, hasSubscribed: true }));
      updateSubscriptionStatus({
        userId: user?.id as string,
        subscriptionStatus: true,
      });

      addPayment(
        {
          userId: user?.id as string,
          userName: user?.firstName + ' ' + user?.lastName,
          subscription: {
            subscriptionId: subscriptionId as string,
            subscriptionPlan: subscriptionPlan as string,
            subscriptionDate: new Date(),
            isActive: true,
          },
          payment: {
            transactionId: searchParams.get('transaction_id') as string,
            paymentGateway: 'Khalti',
            currency: 'NPR',
            amount: parseFloat(totalAmount as string) / 100,
            paymentStatus: 'Completed',
            lastPaymentDate: new Date(),
          },
        },
        {
          onSuccess: () => {
            setIsNavigating(() => true);
            setTimeout(() => {
              setIsNavigating(() => false);
              navigate('/home');
            }, 2000);
          },
        }
      );
    }
  }, [verificationStatus?.status]);

  if (!verificationStatus && searchParams.get('status') === 'Canceled') {
    return (
      <div className='h-[100vh] w-[100vw] flex justify-center items-center p-5'>
        <div className='flex flex-col items-center justify-center'>
          <img
            src={subscriptionError}
            alt='Subscription Confirmed'
            className='h-[300px] w-[300px]'
          />
          <Heading className='mt-0'>
            Your subscription cannot be proceed right now.
          </Heading>
          {isNavigating && (
            <span className='flex gap-3 text-sm'>
              <span>Redirecting to Home page</span>
              <LoadingSpinner />
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='h-[100vh] w-[100vw] flex justify-center items-center p-5'>
      {isVerifying && <LoadingSpinner />}
      {verificationStatus && verificationStatus.status === 'Completed' && (
        <div className='flex flex-col items-center justify-center'>
          <img
            src={subscriptionConfirmation}
            alt='Subscription Confirmed'
            className='h-[300px] w-[300px]'
          />
          <Heading className='mt-0'>
            Yay! Your subscription has been activated.
          </Heading>
          {isNavigating && (
            <span className='flex gap-3 text-sm'>
              <span>Redirecting to Home page</span>
              <LoadingSpinner />
            </span>
          )}
        </div>
      )}

      {verificationStatus &&
        (verificationStatus.status === 'Pending' ||
          verificationStatus.status === 'Refunded' ||
          verificationStatus.status === 'Expired') && (
          <div className='flex flex-col items-center justify-center'>
            <img
              src={subscriptionError}
              alt='Subscription Confirmed'
              className='h-[300px] w-[300px]'
            />
            <Heading className='mt-0'>
              Your subscription cannot be proceed right now.
            </Heading>
            {isNavigating && (
              <p className='flex gap-3 text-sm'>
                <span>Redirecting to Home page</span>
                <span>
                  <LoadingSpinner />
                </span>
              </p>
            )}
          </div>
        )}
    </div>
  );
};

export default VerifyKhaltiSubscription;
