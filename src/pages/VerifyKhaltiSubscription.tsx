import { useNavigate, useSearchParams } from 'react-router-dom';
import useVerifyKhaltiPayment from '../services/payments/verifyKhaltiPayment';

import LoadingSpinner from '../components/LoadingSpinner';
import { useEffect } from 'react';
import setToLocalStorage from '../services/localStorage/setToLocalStorage';
import { useAuthContext } from '../context/AuthProvider';
import useUpdateSubscriptionStatus from '../services/users/updateSubscriptionStatus';

const VerifyKhaltiSubscription = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, setUser } = useAuthContext();

  console.log(
    'http://localhost:5173/verifyKhalti/?status=Completed&t=txn&idx=amNskoAxSn5rLpU6u5u4N2&token=QcYLzSajfrFPnK9wreJPn3&bank_reference=None&amount=33900&mobile=98XXXXX001&transaction_id=amNskoAxSn5rLpU6u5u4N2&tidx=amNskoAxSn5rLpU6u5u4N2&total_amount=33900&purchase_order_id=65ba18628cb85d1ed377857d&purchase_order_name=Premium&pidx=p2bcs2iBzV9KbNhWYYviuP'
  );
  console.log(searchParams.get('pidx'));
  const { mutate: updateSubscriptionStatus } = useUpdateSubscriptionStatus();
  const subscriptionId = searchParams.get('purchase_order_id');
  const { data: verificationStatus, isLoading: isVerifying } =
    useVerifyKhaltiPayment(searchParams.get('pidx') as string);

  const navigate = useNavigate();
  console.log(verificationStatus);

  useEffect(() => {
    if (verificationStatus && verificationStatus.status === 'Completed') {
      setToLocalStorage('authorization', { ...user, hasSubscribed: true });
      setUser && setUser((previous) => ({ ...previous, hasSubscribed: true }));
      updateSubscriptionStatus({
        userId: user?.id as string,
        subscriptionStatus: true,
      });
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    }
  }, [verificationStatus?.status]);

  return (
    <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
      {isVerifying && <LoadingSpinner />}
      {verificationStatus && verificationStatus.status}
    </div>
  );
};

export default VerifyKhaltiSubscription;
