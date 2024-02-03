import JourneyCardSkeleton from '../../components/JourneyCardSkeleton';
import Heading from '../../components/Heading';
import useGetQuestionPrompts from '../../services/questionPrompts/getQuestionPrompts';
import QuestionPromptCard from '../../components/QuestionPromptCard';
import QuestionPromptsCard from '../../components/QuestionPromptsCard';

const VerifyQuestionPromptsPage = () => {
  const { data: questionPrompts, isLoading } = useGetQuestionPrompts();
  return (
    <div>
      <div>
        <Heading>Review question prompts</Heading>
        <span className='text-sm text-gray-400'>
          You can review these questionPrompts, enabling the users to use them.
        </span>
      </div>

      <div className='flex flex-wrap items-center justify-center gap-5 pt-4'>
        {isLoading &&
          Array.from(Array(4)).map((_, index) => {
            return <JourneyCardSkeleton key={index} />;
          })}
        {questionPrompts &&
          questionPrompts.map(
            (questionPrompt) =>
              questionPrompt.isVerified === false && (
                <QuestionPromptCard questionPrompt={questionPrompt} />
              )
          )}
      </div>

      <div>
        <div>
          <Heading>Verified question prompts</Heading>
        </div>

        <div className='flex flex-wrap items-center justify-center gap-5 pt-4'>
          {isLoading &&
            Array.from(Array(4)).map((_, index) => {
              return <JourneyCardSkeleton key={index} />;
            })}
          {questionPrompts &&
            questionPrompts.map(
              (questionPrompt) =>
                questionPrompt.isVerified === true && (
                  <QuestionPromptsCard questionPrompt={questionPrompt} />
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default VerifyQuestionPromptsPage;
