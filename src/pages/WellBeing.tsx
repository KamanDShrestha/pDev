import { useState } from 'react';
import Heading from '../components/Heading';
import JournalAddDialog from '../components/JournalAddDialog';
import { useAuthContext } from '../context/AuthProvider';
import useGetJournals from '../services/journals/getJournals';
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
        <Heading className='text-2xl'>My journals</Heading>
        {journals && journals.map((journal) => <p>{journal.journalTitle}</p>)}
      </div>
    </>
  );
};

export default WellBeing;
