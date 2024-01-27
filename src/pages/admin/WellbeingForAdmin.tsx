import GratitudeJournalPromptCard from '../../components/GratitudeJournalPromptCard';
import Heading from '../../components/Heading';

import GratitudeJournalPromptAddCard from '../../components/GratitudeJournalPromptAddCard';
import useGetQuestionPrompts from '../../services/questionPrompts/getQuestionPrompts';
import LoadingSpinner from '../../components/LoadingSpinner';
import QuestionPromptCard from '../../components/QuestionPromptCard';
import QuestionPromptAddSection from '../../components/QuestionPromptAddSection';

// a seperate section for question prompts
// rendering all the question prompts along with their title, description and questions
// if no question prompts is there initially, then providing these
// a section for adding new question prompts
// a section for previewing these question
// when submitting/added through button, then the added question prompts would be added in above section

const WellbeingForAdmin = () => {
  const { data: questionPrompts, isLoading } = useGetQuestionPrompts();
  return (
    <>
      <div className='space-y-3'>
        <Heading className='text-3xl'>Gratitude Journal</Heading>
        <div className='flex flex-wrap justify-center gap-4'>
          <GratitudeJournalPromptCard />
          <GratitudeJournalPromptAddCard />
        </div>
      </div>
      <div>
        <Heading className='text-3xl'>Question Prompts</Heading>
        <div className='flex flex-wrap justify-center gap-4'>
          {isLoading && <LoadingSpinner />}
          {questionPrompts &&
            questionPrompts.map((questionPrompt, index) => (
              <QuestionPromptCard key={index} questionPrompt={questionPrompt} />
            ))}
          {questionPrompts?.length === 0 && (
            <p>No question prompts are found.</p>
          )}
        </div>
        <QuestionPromptAddSection />
      </div>
    </>
  );
};

export default WellbeingForAdmin;
