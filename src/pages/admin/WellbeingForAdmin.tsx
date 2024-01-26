import GratitudeJournalPromptCard from '../../components/GratitudeJournalPromptCard';
import Heading from '../../components/Heading';

import GratitudeJournalPromptAddCard from '../../components/GratitudeJournalPromptAddCard';

const WellbeingForAdmin = () => {
  return (
    <>
      <div className='space-y-3'>
        <Heading className='text-3xl'>Gratitude Journal</Heading>
        <div className='flex flex-wrap justify-center gap-4'>
          <GratitudeJournalPromptCard />
          <GratitudeJournalPromptAddCard />
        </div>
      </div>
    </>
  );
};

export default WellbeingForAdmin;
