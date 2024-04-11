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
import removeWhitespace from '../services/removeWhitespace';
import { Checkbox } from './ui/checkbox';
import { useState } from 'react';
import ErrorMessage from './ErrorMessage';

interface EditQADialogProps {
  QA: QAsData;
}

const EditQADialog = ({ QA }: EditQADialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { questionTitle: QA.questionTitle, question: QA.question },
  });
  const [isAnonymousChecked, setIsAnonymousChecked] = useState(QA.isAnonymous);
  const { mutate: updateQA, isLoading: isUpdatingQA } = useEditQA();

  const queryClient = useQueryClient();

  function handleUpdateQA(data: FieldValues) {
    updateQA(
      {
        questionId: QA._id,
        questionEditFields: {
          ...QA,
          questionTitle: removeWhitespace(data.questionTitle),
          question: removeWhitespace(data.question),
          isAnonymous: isAnonymousChecked,
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
            <Input
              id='title'
              {...register('questionTitle', {
                required: 'Please provide a title',
                minLength: {
                  value: 5,
                  message: 'Title must be at least 5 characters long',
                },
              })}
            />
            {errors.questionTitle && (
              <ErrorMessage>
                {errors.questionTitle.message as string}
              </ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor='content' className='font-medium'>
              Content (Question)
            </label>
            <Textarea
              id='content'
              {...register('question', {
                required: 'Please provide content for your post.',
                minLength: {
                  value: 20,
                  message: 'Content must be at least 20 characters long',
                },
                maxLength: {
                  value: 400,
                  message: 'Content must be provided within 400 characters.',
                },
              })}
            />
            {errors.question && (
              <ErrorMessage>{errors.question.message as string}</ErrorMessage>
            )}
          </div>
          <div className='flex items-center gap-1 text-sm'>
            <Checkbox
              placeholder='Make it anonymous'
              checked={isAnonymousChecked}
              onCheckedChange={() =>
                setIsAnonymousChecked((previous) => !previous)
              }
            />
            <label>Make it anonymous</label>
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
