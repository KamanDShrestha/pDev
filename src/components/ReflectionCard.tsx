import { FieldValues, useForm } from 'react-hook-form';
import useUpdateRetrospection from '../services/embarkedJourneys/updateRetrospection';
import { Button, buttonVariants } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Textarea } from './ui/textarea';

interface ReflectionCardProps {
  embarkedJourneyId: string;
  reflection: string;
}

const ReflectionCard = ({
  embarkedJourneyId,
  reflection,
}: ReflectionCardProps) => {
  const { mutate: updateReflection } = useUpdateRetrospection();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      reflection: reflection,
    },
  });

  function handleReflectionUpdate(data: FieldValues) {
    updateReflection({
      embarkedJourneyId: embarkedJourneyId,
      updatedFields: {
        reflection: data.reflection,
      },
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Own Reflection regarding the journey</CardTitle>
      </CardHeader>
      <CardContent className='font-medium'>{reflection}</CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger className={buttonVariants({ variant: 'default' })}>
            Update
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update my reflection</DialogTitle>
            </DialogHeader>
            <div>
              <Textarea
                {...register('reflection', {
                  required: 'Please provide reflection before submiting.',
                  maxLength: {
                    value: 250,
                    message: 'Please provide reflection within 250 characters.',
                  },
                })}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit(handleReflectionUpdate)}>
                Update my reflection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ReflectionCard;
