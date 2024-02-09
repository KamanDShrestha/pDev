import Heading from '../../components/Heading';
import useGetAllQuotes from '../../services/quotes/getAllQuotes';
import LoadingSpinner from '../../components/LoadingSpinner';

import AddQuoteCard from '../../components/AddQuoteCard';

import QuoteCard from '../../components/QuoteCard';

const AddQuotes = () => {
  const { data: quotes, isLoading: isFetchingQuotes } = useGetAllQuotes();
  return (
    <>
      <Heading>Quotes</Heading>
      <div className=''>
        {isFetchingQuotes && <LoadingSpinner />}
        {quotes && quotes.length === 0 && <p>No quotes available</p>}

        {quotes &&
          quotes.map((quoteDocument, index) => {
            return (
              <div key={index} className='p-5 m-5'>
                <Heading className='text-lg'>
                  {quoteDocument.category} quotes
                </Heading>
                <div className='flex flex-wrap items-center justify-center gap-5'>
                  {quoteDocument.quotes.map((quote, index) => (
                    <QuoteCard
                      quote={quote}
                      key={index}
                      category={quoteDocument.category}
                    />
                  ))}
                </div>
              </div>
            );
          })}
      </div>
      <AddQuoteCard />
    </>
  );
};

export default AddQuotes;
