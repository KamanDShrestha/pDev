import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { FieldValues, useForm } from 'react-hook-form';
import Heading from './Heading';
import { Input } from './ui/input';
import ErrorMessage from './ErrorMessage';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import useAddQuestionPrompt from '../services/questionPrompts/addQuestionPrompt';
import { Textarea } from './ui/textarea';

const QuestionPromptAddSection = () => {
  const [selectedNoOfQuestions, setSelectedNoOfQuestions] = useState(3);
  const {
    register,
    // getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const providedTitle = watch('title');
  const providedDescription = watch('description');
  const providedQuestions = Array.from(Array(selectedNoOfQuestions).keys()).map(
    (_, index) => ({
      prompt: watch(`question${index + 1}`),
      placeholder: watch(`placeholder${index + 1}`),
      tag: watch(`tag${index + 1}`),
    })
  );

  const { mutate: addQuestionPrompt } = useAddQuestionPrompt();
  function handleQuestionPromptSubmit(data: FieldValues) {
    console.log(data);
    const providedPrompts = Array.from(Array(selectedNoOfQuestions).keys()).map(
      (_, index) => ({
        prompt: data[`question${index + 1}`],
        placeholder: data[`placeholder${index + 1}`],
        tag: data[`tag${index + 1}`],
      })
    );

    addQuestionPrompt({
      title: data.title,
      description: data.description,
      questions: providedPrompts,
    });
  }
  return (
    <div className='flex flex-wrap items-center justify-center gap-10 p-5 mt-10'>
      <Card>
        <CardHeader>
          <CardTitle className='text-3xl'>Preview</CardTitle>
          <CardDescription>
            You can preview your question prompt here.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-5'>
          <CardTitle>{providedTitle}</CardTitle>
          <CardDescription>{providedDescription}</CardDescription>
          <CardTitle className='text-xl'>Questions</CardTitle>
          <div className='flex flex-col gap-3'>
            {providedQuestions.map((question, index) => (
              <div className='flex flex-col gap-1' key={index}>
                <span>{question.prompt}</span>
                <span className='text-sm'>
                  Placeholder: {question.placeholder}
                </span>
                <span className='text-sm'>Category: {question.tag}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Add new question prompts</CardTitle>
          <CardDescription>
            You can add new question prompts here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            <div>
              <Heading className='mb-0 text-lg font-medium'>Title</Heading>
              <Input
                placeholder='Provide title.'
                {...register('title', {
                  required: {
                    value: true,
                    message: 'Please provide title for this question prompt.',
                  },
                })}
              />
              {errors.title && (
                <ErrorMessage>{errors.title.message as string}</ErrorMessage>
              )}
            </div>
            <div>
              <Heading className='mb-0 text-lg font-medium'>
                Description
              </Heading>
              <Textarea
                placeholder='Provide description.'
                {...register('description', {
                  required: {
                    value: true,
                    message:
                      'Please provide description for this question prompt.',
                  },
                })}
              />
              {errors.description && (
                <ErrorMessage>
                  {errors.description.message as string}
                </ErrorMessage>
              )}
            </div>
            <div>
              <Heading className='mb-0 text-lg font-medium'>
                Select the number of questions:
              </Heading>
              <Select
                defaultValue={selectedNoOfQuestions.toString()}
                onValueChange={(value) =>
                  setSelectedNoOfQuestions(parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select no. of questions' />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(Array(8).keys()).map((value, index) => (
                    <SelectItem value={(value + 3).toString()} key={index}>
                      {value + 3}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Heading className='mb-0 text-lg font-medium'>Questions</Heading>
              <div className='p-3 overflow-scroll h-[250px] flex flex-col gap-3'>
                {Array.from(Array(selectedNoOfQuestions).keys()).map(
                  (_value, index) => (
                    <div key={index}>
                      <div>
                        <Heading className='mb-0 font-medium text-md'>
                          Prompt
                        </Heading>
                        <Textarea
                          placeholder={`Question ${index + 1}`}
                          {...register(`question${index + 1}`, {
                            required: {
                              value: true,
                              message: `Please provide this question.`,
                            },
                          })}
                        />
                        {errors[`question${index + 1}`] && (
                          <ErrorMessage>
                            {errors[`question${index + 1}`]?.message as string}
                          </ErrorMessage>
                        )}
                      </div>
                      <div>
                        <Heading className='mb-0 font-medium text-md'>
                          Placeholder
                        </Heading>
                        <Textarea
                          placeholder={`Placeholder ${index + 1}`}
                          {...register(`placeholder${index + 1}`, {
                            required: {
                              value: true,
                              message: `Please provide this placeholder.`,
                            },
                          })}
                        />
                        {errors[`placeholder${index + 1}`] && (
                          <ErrorMessage>
                            {
                              errors[`placeholder${index + 1}`]
                                ?.message as string
                            }
                          </ErrorMessage>
                        )}
                      </div>
                      <div>
                        <Heading className='mb-0 font-medium text-md'>
                          Tag
                        </Heading>
                        <Input
                          placeholder='Provide suitable tag.'
                          {...register(`tag${index + 1}`, {
                            required: {
                              value: true,
                              message:
                                'Please provide tag for this question prompt.',
                            },
                          })}
                        />
                        {errors[`tag${index + 1}`] && (
                          <ErrorMessage>
                            {errors[`tag${index + 1}`]?.message as string}
                          </ErrorMessage>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit(handleQuestionPromptSubmit)}>
            Add question prompt
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuestionPromptAddSection;
