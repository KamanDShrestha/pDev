import React from 'react';
import { QAsData } from '../types';
import Heading from './Heading';

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
          <span className='font-medium'>username</span>
          <span className='text-xs'>
            Questioned at {question.createdAt.toLocaleString()}
          </span>
        </div>
      </div>
      <div className='m-4'>
        <Heading className='mb-2 text-xl'>{question.questionTitle}</Heading>
        <p>{question.question}</p>
      </div>

      <div></div>
    </div>
  );
};

export default QuestionAnswerCardWithComments;
