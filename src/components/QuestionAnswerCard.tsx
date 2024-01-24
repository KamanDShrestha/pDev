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
import LoadingSpinner from './LoadingSpinner';

// import { FcLikePlaceholder } from 'react-icons/fc';

interface QuestionAnswerCardProps {
  question: QAsData;
}

const QuestionAnswerCard = ({ question }: QuestionAnswerCardProps) => {
  const { user } = useAuthContext();
  const { register, handleSubmit, setValue } = useForm();

  const { mutate: addAnswer, isLoading: isCommenting } = useAddAnswer();

  function handleSubmitAnswer(data: FieldValues) {
    addAnswer(
      {
        qhpId: user?.id as string,
        questionId: question._id,
        answer: data.answer,
      },
      {
        onSuccess: () => {
          question.answers.push({
            userName: user?.firstName as string,
            userId: user?.id as string,
            answer: data.answer,
            answerDate: new Date(),
          });
          setValue('answer', '');
        },
      }
    );
  }

  // function handleLikePost() {
  //   addLike(
  //     {
  //       userId: user?.id as string,
  //       postId: post._id,
  //     },
  //     {
  //       onSuccess: (response) => {
  //         queryClient.invalidateQueries([
  //           'likedStatus',
  //           post._id,
  //           user?.id as string,
  //         ]);

  //         if (response.message.split(' ').includes('unliked')) {
  //           post.postLikes.pop();
  //           return;
  //         } else {
  //           post.postLikes.push({
  //             userId: user?.id as string,
  //             likedDate: new Date(),
  //           });
  //         }
  //       },
  //     }
  //   );
  // }

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
              <span className='font-medium'>
                {question._id === user?.id ? 'You' : question.userName}
              </span>
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
          <div className='relative flex items-center gap-10'>
            {/* <div className='flex items-center gap-3'>
              <span
                style={{ fontSize: '25px' }}
                onClick={handleLikePost}
                className='hover:cursor-pointer'
              >
                {gettingLikedStatus || isLiking ? (
                  <LoadingSpinner />
                ) : likedStatus ? (
                  <FcLike />
                ) : (
                  <FcLikePlaceholder />
                )}
              </span>
              <span>
                {post.postLikes.length > 0
                  ? post.postLikes.length === 1
                    ? '1 like'
                    : `${post.postLikes.length} likes`
                  : 'No likes'}
              </span>
            </div> */}
            <p className='text-sm font-medium'>
              {question.answers.length <= 0 ? (
                'No one has answered the question'
              ) : (
                <Dialog>
                  <DialogTrigger>
                    <span className='hover:cursor-pointer'>
                      {question.answers.length === 1
                        ? '1 answer'
                        : `${question.answers.length} answers`}
                    </span>
                  </DialogTrigger>
                  <DialogContent>
                    <QuestionAnswerCardWithComments question={question} />
                  </DialogContent>
                </Dialog>
              )}
            </p>
          </div>
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
              <Button
                onClick={handleSubmit(handleSubmitAnswer)}
                disabled={isCommenting}
              >
                {isCommenting ? <LoadingSpinner /> : 'Submit your answer'}
              </Button>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
};

export default QuestionAnswerCard;
