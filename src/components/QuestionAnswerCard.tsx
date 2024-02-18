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
import useLikeQA from '../services/QAs/likeQA';
import useGetLikedStatus from '../services/QAs/getLikedStatus';
import { useQueryClient } from '@tanstack/react-query';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { BsThreeDots } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import useAddSavedContent from '../services/savedContent/addSavedContent';
import useGetContentSavedStatus from '../services/savedContent/getContentSavedStatus';
import useDeleteQA from '../services/QAs/deleteQA';
import { postCategoriesTheme } from '../constants';

// import { FcLikePlaceholder } from 'react-icons/fc';

interface QuestionAnswerCardProps {
  question: QAsData;
}

const QuestionAnswerCard = ({ question }: QuestionAnswerCardProps) => {
  const { user } = useAuthContext();
  const { register, handleSubmit, setValue } = useForm();

  const { mutate: addLike, isLoading: isLiking } = useLikeQA();
  const { mutate: addSavedContent, isLoading: isSaving } = useAddSavedContent();
  const { data: savedContentStatus, isLoading: gettingSavedContentStatus } =
    useGetContentSavedStatus(user?.id as string, 'qa', question._id);

  const { data: likedStatus, isLoading: gettingLikedStatus } =
    useGetLikedStatus(question._id, user?.id as string);

  const { mutate: addAnswer, isLoading: isCommenting } = useAddAnswer();
  const { mutate: deleteQA, isLoading: isDeleting } = useDeleteQA(
    question.communityId
  );
  const queryClient = useQueryClient();
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

  function handleLikeQA() {
    addLike(
      {
        userId: user?.id as string,
        QAId: question._id,
      },
      {
        onSuccess: (response) => {
          queryClient.invalidateQueries([
            'likedStatus',
            question._id,
            user?.id as string,
          ]);

          if (response.message.split(' ').includes('unliked')) {
            question.likes.pop();
            return;
          } else {
            question.likes.push({
              userId: user?.id as string,
              likedDate: new Date(),
            });
          }
        },
      }
    );
  }

  function handleSavePost() {
    addSavedContent(
      {
        category: 'question',
        contentId: question._id,
        contentType: 'qa',
        userId: user?.id as string,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            'contentSavedStatus',
            user?.id as string,
            'qa',
            question._id,
          ]);
          queryClient.invalidateQueries(['savedContents', user?.id as string]);
        },
      }
    );
  }

  function handleDeleteQA() {
    deleteQA(question._id);
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
              <span className='font-medium'>
                {question._id === user?.id ? 'You' : question.userName}
              </span>
              <span className='text-xs'>
                Questioned at {new Date(question.createdAt).toLocaleString()}
              </span>
            </div>
            <div className='flex flex-col items-end'>
              {user?.id === question.userId && (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <span className='text-2xl'>
                      <BsThreeDots />
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {/* <DropdownMenuItem className='flex items-center gap-2'>
                      <FaEdit />
                      <span>Edit this post</span>
                    </DropdownMenuItem> */}
                      <DropdownMenuItem
                        className='flex items-center gap-2'
                        onClick={() => handleDeleteQA()}
                      >
                        <FaTrashAlt />
                        <span>Move to Trash</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <div className='flex flex-col items-end gap-2'>
                <span
                  className='text-xl hover:cursor-pointer'
                  onClick={handleSavePost}
                >
                  {gettingSavedContentStatus || isSaving ? (
                    <LoadingSpinner />
                  ) : savedContentStatus ? (
                    <IoBookmark />
                  ) : (
                    <IoBookmarkOutline />
                  )}
                </span>

                <span
                  className={`px-2 py-1 text-xs rounded-full ${postCategoriesTheme['question']}`}
                >
                  question
                </span>
              </div>
            </div>
          </div>

          <CardTitle>{question.questionTitle}</CardTitle>
        </CardHeader>
        <CardContent className='m-5'>{question.question}</CardContent>
        <CardFooter className='flex flex-col gap-3 text-sm'>
          <Separator />
          <div className='relative flex items-center gap-10'>
            <div className='flex items-center gap-3'>
              <span
                style={{ fontSize: '25px' }}
                onClick={handleLikeQA}
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
                {question.likes.length > 0
                  ? question.likes.length === 1
                    ? '1 like'
                    : `${question.likes.length} likes`
                  : 'No likes'}
              </span>
            </div>
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
