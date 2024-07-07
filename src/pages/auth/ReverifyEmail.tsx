import ErrorMessage from '@/src/components/ErrorMessage';
import LoadingSpinner from '@/src/components/LoadingSpinner';
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

  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessageToken, setErrorMessageToken] = useState('');

  const { mutate: resendVerificationEmail, isLoading: resendingToken } =
    useReverifyEmail();
  const { mutate: verifyToken, isLoading: verifyingToken } = useVerifyToken();

  function handleReverificationSubmit() {
    if (
      existingEmail === '' ||
      existingEmail.trim().length === 0 ||
      existingEmail === null ||
      existingEmail === undefined
    ) {
      setErrorMessageEmail(
        () => 'Please provide your email before proceeding.'
      );
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
            <>
              <Input
                onChange={(e) => {
                  setErrorMessageEmail(() => '');
                  setExistingEmail(e.target.value);
                }}
                placeholder='Email...'
                className='w-full'
              />
              {errorMessageEmail && (
                <ErrorMessage>{errorMessageEmail}</ErrorMessage>
              )}
            </>
          )}
          {verifiedEmail && (
            <>
              <Textarea
                placeholder='Verification token...'
                className='w-full'
                onChange={(e) => {
                  setErrorMessageToken(() => '');
                  setVerificationToken(() => e.target.value);
                }}
              />
              {errorMessageToken && (
                <ErrorMessage>{errorMessageToken}</ErrorMessage>
              )}
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {!verifiedEmail && (
          <Button onClick={handleReverificationSubmit}>
            {resendingToken ? <LoadingSpinner /> : 'Send verification token'}
          </Button>
        )}
        {verifiedEmail && (
          <Button
            onClick={handleTokenVerificationSubmit}
            disabled={verifyingToken}
          >
            {verifyingToken ? <LoadingSpinner /> : 'Submit'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ReverifyEmail;
