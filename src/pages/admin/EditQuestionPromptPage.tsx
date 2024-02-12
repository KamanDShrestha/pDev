import { FieldValues, useForm } from 'react-hook-form';
import useGetSpecificQuestionPrompt from '../../services/questionPrompts/getSpecificQuestionPrompt';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import Heading from '../../components/Heading';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import ErrorMessage from '../../components/ErrorMessage';
import { useEffect } from 'react';
import useUpdateQuestionPrompt from '../../services/questionPrompts/updateQuestionPrompt';
import { useQueryClient } from '@tanstack/react-query';

const EditQuestionPromptPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: questionPrompt, isLoading } = useGetSpecificQuestionPrompt(
    id as string
  );
  const { mutate: updateQuestionPrompt } = useUpdateQuestionPrompt();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      title: questionPrompt?.title,
      description: questionPrompt?.description,
      questions: questionPrompt?.questions.map((question) => question.prompt),
      placeholders: questionPrompt?.questions.map(
        (question) => question.placeholder
      ),
      tags: questionPrompt?.questions.map((question) => question.tag),
    },
  });

  useEffect(() => {
    reset({
      title: questionPrompt?.title,
      description: questionPrompt?.description,
      questions: questionPrompt?.questions.map((question) => question.prompt),
      placeholders: questionPrompt?.questions.map(
        (question) => question.placeholder
      ),
      tags: questionPrompt?.questions.map((question) => question.tag),
    });
  }, [questionPrompt?._id]);

  console.log(errors);

  const providedTitle = watch('title');
  const providedDescription = watch('description');
  const providedQuestions = watch('questions');
  const providedPlaceholders = watch('placeholders');
  const providedTags = watch('tags');

  function handleQuestionPromptUpdate(data: FieldValues) {
    console.log(data);
    updateQuestionPrompt(
      {
        promptId: id as string,
        questionPrompt: {
          title: data.title,
          description: data.description,
          questions: data.questions.map((question: string, index: number) => ({
            prompt: question,
            placeholder: data.placeholders[index],
            tag: data.tags[index],
          })),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['questionPrompt', id]);
        },
      }
    );
  }
  return (
    <>
      <Heading>Edit the question prompt</Heading>
      <div className='p-5'>
        <Heading className='text-3xl'>Preview the changes</Heading>
        <div className='flex items-center justify-center'>
          <Card className='w-[400px] lg:w-[600px]'>
            <CardHeader>
              <CardTitle>{providedTitle}</CardTitle>
              <CardDescription>{providedDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <CardTitle className='text-xl'>Questions</CardTitle>
              {providedQuestions &&
                providedQuestions.map((prompt, index) => (
                  <div className='flex flex-col gap-1 p-2' key={index}>
                    <span>{prompt}</span>
                    <span className='text-sm'>
                      Placeholder:{' '}
                      {providedPlaceholders && providedPlaceholders[index]}
                    </span>
                    <span className='text-sm'>
                      Category: {providedTags && providedTags[index]}
                    </span>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className='p-5'>
        <Heading className='text-3xl'>
          Make changes within the question prompt
        </Heading>
        <div>{isLoading && <LoadingSpinner />}</div>
        <div>
          {questionPrompt && (
            <div>
              <div className='flex flex-wrap justify-around gap-5 p-5'>
                <div>
                  <div>
                    <Heading className='mb-2 text-2xl'>Question Prompt</Heading>
                    <Input
                      {...register('title', {
                        required: 'Title is required',
                        min: {
                          value: 4,
                          message: 'Title must be 4 characters long',
                        },
                      })}
                      className='text-lg w-[300px]'
                    />
                    {errors.title && (
                      <ErrorMessage>
                        {errors.title.message as string}
                      </ErrorMessage>
                    )}
                  </div>
                  <div>
                    <Heading className='mb-2 text-2xl'>Description</Heading>
                    <Textarea
                      {...register('description', {
                        required: 'Description is required',
                        min: {
                          value: 10,
                          message: 'Description must be 10 characters long',
                        },
                      })}
                      className='text-lg h-[200px] w-[450px]'
                    />
                    {errors.description && (
                      <ErrorMessage>
                        {errors.description.message as string}
                      </ErrorMessage>
                    )}
                  </div>
                </div>
                <Card>
                  <CardHeader>
                    <Heading className='mb-0 text-2xl'>Questions</Heading>
                  </CardHeader>
                  <CardContent className='h-[60vh] overflow-scroll'>
                    {questionPrompt.questions.map((_, index) => (
                      <div className='px-3 mb-10' key={index}>
                        <div>
                          <Heading className='mb-2 text-lg'>
                            Question {index + 1}
                          </Heading>
                          <Input
                            {...register(`questions.${index}`, {
                              required: 'Question is required',
                              min: {
                                value: 10,
                                message: 'Question must be 10 characters long',
                              },
                            })}
                            className='text-lg w-[300px]'
                          />
                          {/* {errors[`question${index + 1}`] && (
                          <ErrorMessage>
                            {errors[`question${index + 1}`]?.message as string}
                          </ErrorMessage>
                        )} */}
                        </div>
                        <div>
                          <Heading className='mb-2 text-lg'>
                            Placeholder {index + 1}
                          </Heading>
                          <Input
                            {...register(`placeholders.${index}`, {
                              required: 'Placeholder is required',
                              min: {
                                value: 10,
                                message:
                                  'Placeholder must be at least 10 characters long',
                              },
                            })}
                            className='text-lg w-[300px]'
                          />
                        </div>
                        <div>
                          <Heading className='mb-2 text-lg'>
                            Tag {index + 1}
                          </Heading>
                          <Input
                            {...register(`tags.${index}`, {
                              required: 'Tag is required',
                              min: {
                                value: 3,
                                message:
                                  'Tag must be at least 3 characters long',
                              },
                            })}
                            className='text-lg w-[300px]'
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          <Button onClick={handleSubmit(handleQuestionPromptUpdate)}>
            Update the question prompt
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditQuestionPromptPage;
