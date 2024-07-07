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
import ErrorMessage from '@/src/components/ErrorMessage';

const TokenVerification = () => {
  const { user, signUpUser, setSignUpUser } = useAuthContext();
  const [verificationToken, setVerificationToken] = useState('');
  const [validStatus, setValidStatus] = useState(true);

  const navigate = useNavigate();

  const { mutate: verifyEmail } = useVerifyToken();
  const { mutate: sendVerificationEmail } = useVerifyEmail();

  //error message
  const [errorMessage, setErrorMessage] = useState('');

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
    // validation before submission
    if (
      verificationToken.trim().length === 0 ||
      verificationToken === '' ||
      verificationToken === null ||
      verificationToken === undefined
    ) {
      setErrorMessage(() => 'Please provide value before proceeding.');
      return;
    }

    // sending the request to verify the provided token for the email
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
        <div>
          <Textarea
            className=' min-w-[300px] lg:w-[550px]'
            onChange={(e) => {
              setErrorMessage(() => '');
              setVerificationToken(() => e.target.value);
            }}
          />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </div>
        <div className='flex gap-2 text-sm'>
          <span>Validity till:</span>
          <CountdownTimer minutes={1} />
        </div>
        <Button onClick={handleVerificationSubmit}>Submit</Button>
      </div>

      <CardFooter>
        {!validStatus && (
          <p
            className='my-3 text-sm cursor-pointer text-grey-300 hover:underline'
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
