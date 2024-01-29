import { useState } from 'react';
import Heading from '../components/Heading';
import JournalAddDialog, {
  journalCategories,
} from '../components/JournalAddDialog';
import { useAuthContext } from '../context/AuthProvider';
import useGetJournals from '../services/journals/getJournals';
import JournalCard from '../components/JournalCard';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import LoadingSpinner from '../components/LoadingSpinner';
import GratitudeJournalAddDialog from '../components/GratitudeJournalAddDialog';
import useGetGratitudeJournals from '../services/gratitudeJournals/getGratitudeJournals';
import GratitudeJournalCard from '../components/GratitudeJournalCard';
import useGetQuestionPrompts from '../services/questionPrompts/getQuestionPrompts';
import QuestionPromptsCard from '../components/QuestionPromptsCard';

const WellBeing = () => {
  const { user } = useAuthContext();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { data: journals, isLoading } = useGetJournals(user?.id as string, {
    category: selectedCategory,
  });

  const { data: gratitudeJournals, isLoading: isGratitudeJournalLoading } =
    useGetGratitudeJournals(user?.id as string);
  const { data: questionPrompts, isLoading: isQuestionPromptsLoading } =
    useGetQuestionPrompts();
  console.log(gratitudeJournals);

  console.log(journals);
  return (
    <div className='flex flex-col gap-10'>
      <div>
        <Heading>Journals</Heading>
        <div className='p-5 space-y-3'>
          <JournalAddDialog />
          <GratitudeJournalAddDialog />
        </div>
      </div>

      <div>
        <Heading className='text-3xl'>Question prompts</Heading>
        <div className='flex flex-wrap items-center justify-center gap-5'>
          {isQuestionPromptsLoading && <LoadingSpinner />}
          {questionPrompts &&
            questionPrompts.map((questionPrompt) => (
              <QuestionPromptsCard questionPrompt={questionPrompt} />
            ))}
          {questionPrompts?.length === 0 && (
            <p>No question prompts are found.</p>
          )}
        </div>
      </div>
      <div>
        <Heading className='text-2xl'>Past journal entries</Heading>
        <Select
          defaultValue={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value)}
        >
          <SelectTrigger className='max-w-[300px] my-5'>
            <SelectValue placeholder='Categorized by' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              <SelectItem value='all'>All journals</SelectItem>
              {journalCategories.map((category, index) => (
                <>
                  <SelectItem key={index} value={category.value}>
                    {category.label}
                  </SelectItem>
                </>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className='flex flex-wrap items-center justify-center gap-5'>
          {isLoading && <LoadingSpinner />}
          {journals &&
            journals.map((journal, index) => (
              <JournalCard key={index} journal={journal} />
            ))}
          {journals?.length === 0 && (
            <p>No journals found within this category</p>
          )}
        </div>
      </div>
      <div>
        <Heading className='text-2xl'>Guided gratitude journals</Heading>
        <div className='flex flex-wrap items-center justify-center gap-5'>
          {isGratitudeJournalLoading && <LoadingSpinner />}
          {gratitudeJournals &&
            gratitudeJournals.map((journal, index) => (
              <div key={index}>
                <GratitudeJournalCard gratitudeJournal={journal} key={index} />
              </div>
            ))}
          {gratitudeJournals?.length === 0 && <p>No journals found for you.</p>}
        </div>
      </div>
    </div>
  );
};

export default WellBeing;
