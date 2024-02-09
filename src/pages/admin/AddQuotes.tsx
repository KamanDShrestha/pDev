import Heading from '../../components/Heading';
import useGetAllQuotes from '../../services/quotes/getAllQuotes';
import LoadingSpinner from '../../components/LoadingSpinner';

import AddQuoteCard from '../../components/AddQuoteCard';

const AddQuotes = () => {
  const { data: quotes, isLoading: isFetchingQuotes } = useGetAllQuotes();
  return (
    <>
      <Heading>Quotes</Heading>
      <div className='p-5 m-5'>
        {isFetchingQuotes && <LoadingSpinner />}
        {quotes && quotes.length === 0 && <p>No quotes available</p>}
      </div>
      <AddQuoteCard />
    </>
  );
};

export default AddQuotes;
