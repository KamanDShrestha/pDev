import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import useReverifyEmail from '@/src/services/userAuth/reverifyEmail';
import useVerifyToken from '@/src/services/userAuth/verifyToken';
import { useState } from 'react';

const ReverifyEmail = () => {
  const [existingEmail, setExistingEmail] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  const [verifiedEmail, setVerifiedEmail] = useState(false);

  const { mutate: resendVerificationEmail } = useReverifyEmail();
  const { mutate: verifyToken } = useVerifyToken();

  function handleReverificationSubmit() {
    if (existingEmail === '') {
      return;
    }

    resendVerificationEmail(
      { email: existingEmail },
      {
        onSuccess: () => {
          setVerifiedEmail(() => true);
        },
      }
    );
  }

  function handleTokenVerificationSubmit() {
    verifyToken({
      email: existingEmail,
      verificationToken: verificationToken,
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify your existing account</CardTitle>
        <CardDescription>
          You can verify your existing account here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='lg:w-[500px] w-auto'>
          {!verifiedEmail && (
            <Input
              onChange={(e) => setExistingEmail(e.target.value)}
              placeholder='Email...'
              className='w-full'
            />
          )}
          {verifiedEmail && (
            <Textarea
              placeholder='Verification token...'
              className='w-full'
              onChange={(e) => setVerificationToken(() => e.target.value)}
            />
          )}
        </div>
      </CardContent>
      <CardFooter>
        {!verifiedEmail && (
          <Button onClick={handleReverificationSubmit}>
            Send verification token
          </Button>
        )}
        {verifiedEmail && (
          <Button onClick={handleTokenVerificationSubmit}>Submit</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ReverifyEmail;
