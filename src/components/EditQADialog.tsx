import { QAsData } from '../types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { FaPen } from 'react-icons/fa';
import { Input } from './ui/input';
import { FieldValues, useForm } from 'react-hook-form';
import { Textarea } from './ui/textarea';

import { Button } from './ui/button';

import LoadingSpinner from './LoadingSpinner';
import { useQueryClient } from '@tanstack/react-query';
import useEditQA from '../services/QAs/editQA';

interface EditQADialogProps {
  QA: QAsData;
}

const EditQADialog = ({ QA }: EditQADialogProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { questionTitle: QA.questionTitle, question: QA.question },
  });

  const { mutate: updateQA, isLoading: isUpdatingQA } = useEditQA();

  const queryClient = useQueryClient();

  function handleUpdateQA(data: FieldValues) {
    updateQA(
      {
        questionId: QA._id,
        questionEditFields: {
          ...QA,
          questionTitle: data.questionTitle,
          question: data.question,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['posts', QA.communityId]);
        },
      }
    );
  }
  return (
    <Dialog>
      <DialogTrigger>
        <span className='cursor-pointer '>
          <FaPen />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Q&A</DialogTitle>
        <DialogDescription>
          You can edit your Q&A title and content here.
        </DialogDescription>
        <div className='flex flex-col gap-3'>
          <div>
            <label htmlFor='title' className='font-medium'>
              Title
            </label>
            <Input id='title' {...register('questionTitle')} />
          </div>
          <div>
            <label htmlFor='content' className='font-medium'>
              Content (Question)
            </label>
            <Textarea id='content' {...register('question')} />
          </div>

          <Button
            onClick={handleSubmit(handleUpdateQA)}
            disabled={isUpdatingQA}
          >
            {isUpdatingQA ? <LoadingSpinner /> : 'Update question'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditQADialog;
