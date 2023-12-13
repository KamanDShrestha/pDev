import { QAsData } from '../types';
import Heading from './Heading';
import { Separator } from './ui/separator';

interface QuestionAnswerCardWithCommentsProps {
  question: QAsData;
}

const QuestionAnswerCardWithComments = ({
  question,
}: QuestionAnswerCardWithCommentsProps) => {
  return (
    <div>
      <div className='flex items-center gap-4'>
        <img
          src='https://picsum.photos/200'
          alt='user'
          className='w-12 h-12 rounded-full'
        />
        <div className='flex flex-col'>
          <span className='font-medium'>{question.userName}</span>
          <span className='text-xs'>
            Questioned at {question.createdAt.toLocaleString()}
          </span>
        </div>
      </div>
      <div className='m-4'>
        <Heading className='mb-2 text-xl'>{question.questionTitle}</Heading>
        <p>{question.question}</p>
      </div>

      <Separator className='my-4' />
      <div>
        {question.answers.length > 0 ? (
          <>
            <Heading className='mb-2 text-lg'>Answers</Heading>
            {question.answers.map((answer) => (
              <div className='p-3 border'>
                <div className='flex items-center gap-4'>
                  <img
                    src='https://picsum.photos/200'
                    alt='user'
                    className='w-8 h-8 rounded-full'
                  />
                  <div className='flex flex-col'>
                    <span className='text-sm font-medium'>
                      {answer.userName}
                    </span>
                    <span className='text-xs'>
                      Answered at {answer.answerDate.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className='mt-3 text-sm'>
                  <p>{answer.answer}</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className='text-sm'>No answers have been provided</p>
        )}
      </div>
      {/* <label className='font-medium'>Provide your answer</label>
      <div>
        <Textarea placeholder='Your answer...' {...register('answer')} />
      </div>
      <Button onClick={handleSubmit(handleSubmitAnswer)}>
        Submit your answer
      </Button> */}
    </div>
  );
};

export default QuestionAnswerCardWithComments;
