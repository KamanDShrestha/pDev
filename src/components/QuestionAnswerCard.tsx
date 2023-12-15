import { FieldValues, useForm } from 'react-hook-form';
import { QAsData } from '../types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useAuthContext } from '../context/AuthProvider';
import { Button } from './ui/button';
import QuestionAnswerCardWithComments from './QuestionAnswerCardWithComments';
import useAddAnswer from '../services/QAs/addAnswer';
import { Separator } from './ui/separator';

interface QuestionAnswerCardProps {
  question: QAsData;
}

const QuestionAnswerCard = ({ question }: QuestionAnswerCardProps) => {
  const { user } = useAuthContext();
  const { register, handleSubmit } = useForm();

  const { mutate: addAnswer } = useAddAnswer();

  function handleSubmitAnswer(data: FieldValues) {
    addAnswer({
      qhpId: user?.id as string,
      questionId: question._id,
      answer: data.answer,
    });
  }
  return (
    <>
      <Card className='max-w-[550px]'>
        <CardHeader>
          <div className='flex items-center gap-4 my-3'>
            <img
              src='https://picsum.photos/200'
              alt='user'
              className='w-12 h-12 rounded-full'
            />
            <div className='flex flex-col'>
              <span className='font-medium'>{question.userName}</span>
              <span className='text-xs'>
                Questioned at {new Date(question.createdAt).toLocaleString()}
              </span>
            </div>
          </div>

          <CardTitle>{question.question}</CardTitle>
        </CardHeader>
        <CardContent className='m-5'>{question.question}</CardContent>
        <CardFooter className='flex flex-col gap-3'>
          <Separator />
          <p className='text-sm font-medium'>
            {question.answers.length <= 0 ? (
              'No one has answered the question'
            ) : (
              <Dialog>
                <DialogTrigger>
                  <span className='hover:cursor-pointer'>
                    {question.answers.length} answers
                  </span>
                </DialogTrigger>
                <DialogContent>
                  <QuestionAnswerCardWithComments question={question} />
                </DialogContent>
              </Dialog>
            )}
          </p>
          <Separator />

          <Dialog>
            <DialogTrigger>
              <Input
                placeholder='Provide your answer.'
                className='min-w-[400px]'
              />
            </DialogTrigger>
            <DialogContent>
              <label className='font-medium'>Provide your answer</label>
              <div>
                <Textarea
                  placeholder='Your answer...'
                  {...register('answer')}
                />
              </div>
              <Button onClick={handleSubmit(handleSubmitAnswer)}>
                Submit your answer
              </Button>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
};

export default QuestionAnswerCard;
