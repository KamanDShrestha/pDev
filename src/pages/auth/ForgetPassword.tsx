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
import useResetPassword from '@/src/services/userAuth/resetPassword';
import { useState } from 'react';

const ForgetPassword = () => {
  const [userEmail, setUserEmail] = useState('');
  const { mutate: resetPassword, isLoading } = useResetPassword();

  const [errorMessage, setErrorMessage] = useState('');

  function handleResetPasswordSubmit() {
    if (
      userEmail.trim().length === 0 ||
      userEmail === '' ||
      userEmail === undefined
    ) {
      setErrorMessage(() => 'Please provide your email before proceeding.');
      return;
    }

    resetPassword({ email: userEmail });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Request for new password</CardTitle>
        <CardDescription>
          You can reset your password by requesting new password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Input
            type='email'
            placeholder='Enter your email...'
            onChange={(e) => {
              setErrorMessage(() => '');
              setUserEmail(e.target.value);
            }}
          />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleResetPasswordSubmit} disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : 'Request for new password'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ForgetPassword;
