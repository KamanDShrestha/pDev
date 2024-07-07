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

  function handleResetPasswordSubmit() {
    if (
      userEmail.trim().length === 0 ||
      userEmail === '' ||
      userEmail === undefined
    ) {
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
            onChange={(e) => setUserEmail(e.target.value)}
          />
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
