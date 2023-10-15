import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { useForm } from 'react-hook-form';
import { Input } from '../components/ui/input';
import InputFieldLabel from '../components/InputFieldLabel';
import { Button } from '../components/ui/button';
const Login = () => {
  const { register, watch, getValues, formState, handleSubmit } = useForm();

  const providedEmail = watch('email');
  const providedPassword = watch('password');

  console.log(formState.errors);
  function handleLogin() {
    console.log(getValues());
  }
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <Card className='w-[400px]'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login to your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className='flex flex-col gap-3'>
              <div className='relative group'>
                <InputFieldLabel
                  htmlFor='email'
                  hasContent={providedEmail && providedEmail.length !== 0}
                >
                  Email
                </InputFieldLabel>
                <Input {...register('email')} type='email' />
              </div>

              <div className='relative group'>
                <InputFieldLabel
                  htmlFor='password'
                  hasContent={providedPassword && providedPassword.length !== 0}
                >
                  Password
                </InputFieldLabel>
                <Input {...register('password')} type='password' />
              </div>
              <Button>Login</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default Login;
