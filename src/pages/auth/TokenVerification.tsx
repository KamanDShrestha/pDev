import Heading from '@/src/components/Heading';
import { Card, CardFooter } from '../../components/ui/card';
import { Textarea } from '@/src/components/ui/textarea';
import { Button } from '@/src/components/ui/button';
import { useAuthContext } from '@/src/context/AuthProvider';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useVerifyToken from '@/src/services/userAuth/verifyToken';
import useVerifyEmail from '@/src/services/userAuth/verifyEmail';
import CountdownTimer from '@/src/components/CountdownTimer';

const TokenVerification = () => {
  const { user, signUpUser, setSignUpUser } = useAuthContext();
  const [verificationToken, setVerificationToken] = useState('');
  const { mutate: sendVerificationEmail } = useVerifyEmail();

  const [validStatus, setValidStatus] = useState(true);

  const navigate = useNavigate();
  const { mutate: verifyEmail } = useVerifyToken();
  useEffect(() => {
    // for navigation purposes
    if (user && user?.isNewUser) {
      navigate('/newUser');
    } else if (user && user.isNewUser === false) {
      navigate('/home');
    } else if (
      signUpUser &&
      (signUpUser.email === '' || signUpUser.email === undefined)
    ) {
      navigate('/login');
    }

    // setting up for resending the token after some time
    let timeoutValue = setTimeout(() => {
      setValidStatus(false);
    }, 3 * 60 * 1000);

    return () => clearTimeout(timeoutValue);
  }, []);

  function handleVerificationSubmit() {
    verifyEmail(
      {
        email: signUpUser?.email || 'user@example.com',
        verificationToken: verificationToken,
      },
      {
        onSuccess: () => {
          setSignUpUser && setSignUpUser(() => ({ email: '', name: '' }));
          navigate('/home');
        },
      }
    );
  }

  return (
    <Card className='p-3'>
      <Heading className='text-2xl'>Verify your email</Heading>
      <div className='space-y-3'>
        <p>Please provide the token for verifying.</p>
        <Textarea
          className=' min-w-[300px] lg:w-[550px]'
          onChange={(e) => setVerificationToken(() => e.target.value)}
        />
        <Button onClick={handleVerificationSubmit}>Submit</Button>
      </div>
      <CardFooter>
        <div>
          Validity till: <CountdownTimer minutes={3} />
        </div>
        {!validStatus && (
          <p
            className='my-3 text-sm text-grey-300'
            onClick={() =>
              sendVerificationEmail({
                email: signUpUser?.email || 'user@example.com',
                name: signUpUser?.name || 'User Example',
              })
            }
          >
            Resend token
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default TokenVerification;
