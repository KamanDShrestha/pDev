import { useState } from 'react';
import Heading from '../components/Heading';
import JournalAddDialog from '../components/JournalAddDialog';
import { useAuthContext } from '../context/AuthProvider';
import useGetJournals from '../services/journals/getJournals';
import JournalCard from '../components/JournalCard';
// import { Button } from '../components/ui/button';

const WellBeing = () => {
  const { user } = useAuthContext();
  const [selectedCategory, setSelectedCategory] = useState('');
  const { data: journals } = useGetJournals(user?.id as string, {
    category: selectedCategory,
  });
  console.log(journals);
  return (
    <>
      <Heading>Journals</Heading>
      <JournalAddDialog />
      <div>
        <Heading className='text-2xl'>Past journal entries</Heading>
        <div className='flex flex-wrap items-center justify-center gap-5'>
          {journals &&
            journals.map((journal, index) => (
              <JournalCard key={index} journal={journal} />
            ))}
        </div>
      </div>
    </>
  );
};

export default WellBeing;
