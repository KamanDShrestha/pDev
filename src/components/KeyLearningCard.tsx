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

interface KeyLearningCardProps {
  embarkedJourneyId: string;
  keyLearning: string;
}

const KeyLearningCard = ({
  embarkedJourneyId,
  keyLearning,
}: KeyLearningCardProps) => {
  const { mutate: updateKeyLearning } = useUpdateRetrospection();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      keyLearning: keyLearning,
    },
  });

  function handlekeyLearningUpdate(data: FieldValues) {
    updateKeyLearning({
      embarkedJourneyId: embarkedJourneyId,
      updatedFields: {
        keyLearning: data.keyLearning,
      },
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Learning</CardTitle>
      </CardHeader>
      <CardContent className='font-medium'>{keyLearning}</CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger className={buttonVariants({ variant: 'default' })}>
            Update
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update my key learning</DialogTitle>
            </DialogHeader>
            <div>
              <Textarea
                {...register('keyLearning', {
                  required: 'Please provide keyLearning before submiting.',
                  maxLength: {
                    value: 250,
                    message:
                      'Please provide keyLearning within 250 characters.',
                  },
                })}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit(handlekeyLearningUpdate)}>
                Update my key learning
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default KeyLearningCard;
