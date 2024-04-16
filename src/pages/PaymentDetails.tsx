import useGetPaymentDetails from '../services/payments/getPaymentDetails';
import { useAuthContext } from '../context/AuthProvider';
import Heading from '../components/Heading';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Separator } from '../components/ui/separator';

const PaymentDetails = () => {
  const { user } = useAuthContext();
  const { data: paymentDetails } = useGetPaymentDetails(user?.id as string);
  console.log(paymentDetails);
  return (
    <>
      <Heading>Payments</Heading>
      <div className='flex items-center justify-center'>
        {paymentDetails && paymentDetails.length === 0 && (
          <p>No payments have been made.</p>
        )}
        {paymentDetails &&
          paymentDetails.length > 0 &&
          paymentDetails.map((payment) => (
            <Card>
              <CardHeader>
                <CardTitle>Payment details</CardTitle>
              </CardHeader>
              <CardContent className='space-y-5'>
                <Separator className='my-1' />
                <CardTitle className='text-xl'>
                  Individual Name : {payment.userName}
                </CardTitle>
                <div>
                  <CardTitle className='text-xl'>Details</CardTitle>
                  <div className='p-3'>
                    <p className='font-medium'>
                      Payment ID: {payment.payment.transactionId}
                    </p>
                    <p className='font-medium'>
                      Amount: Rs. {payment.payment.amount}
                    </p>
                    <p className='font-medium'>
                      Payment Date:{' '}
                      {new Date(payment.payment.lastPaymentDate).toDateString()}
                    </p>
                    <p className='font-medium'>
                      Payment Status: {payment.payment.paymentStatus}
                    </p>
                    <p className='font-medium'>
                      Payment Gateway: {payment.payment.paymentGateway}
                    </p>
                  </div>
                </div>

                <div>
                  <CardTitle className='text-xl'>
                    Subscription Details
                  </CardTitle>
                  <div className='p-3'>
                    <p className='font-medium'>
                      Subscription ID: {payment.subscription.subscriptionId}
                    </p>
                    <p className='font-medium'>
                      Subscription Plan: {payment.subscription.subscriptionPlan}
                    </p>
                    <p className='font-medium'>
                      Subscription Start Date:{' '}
                      {new Date(
                        payment.subscription.subscriptionDate
                      ).toDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
      <div></div>
    </>
  );
};

export default PaymentDetails;
