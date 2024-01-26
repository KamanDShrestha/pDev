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
// import { Button } from '../components/ui/button';

const WellBeing = () => {
  const { user } = useAuthContext();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { data: journals, isLoading } = useGetJournals(user?.id as string, {
    category: selectedCategory,
  });
  console.log(journals);
  return (
    <>
      <Heading>Journals</Heading>
      <JournalAddDialog />
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
    </>
  );
};

export default WellBeing;
