import Heading from '@/src/components/Heading';
import { Card } from '../../components/ui/card';
import { Textarea } from '@/src/components/ui/textarea';
import { Button } from '@/src/components/ui/button';
import { useAuthContext } from '@/src/context/AuthProvider';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useVerifyToken from '@/src/services/userAuth/verifyToken';

const TokenVerification = () => {
  const { user, signUpUser, setSignUpUser } = useAuthContext();
  const [verificationToken, setVerificationToken] = useState('');
  const navigate = useNavigate();
  const { mutate: verifyEmail } = useVerifyToken();
  useEffect(() => {
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
    </Card>
  );
};

export default TokenVerification;
