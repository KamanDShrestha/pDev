import Heading from '../../components/Heading';
import useGetAllQuotes from '../../services/quotes/getAllQuotes';
import LoadingSpinner from '../../components/LoadingSpinner';

import AddQuoteCard from '../../components/AddQuoteCard';
import { Card, CardContent } from '../../components/ui/card';

const AddQuotes = () => {
  const { data: quotes, isLoading: isFetchingQuotes } = useGetAllQuotes();
  return (
    <>
      <Heading>Quotes</Heading>
      <div className='p-5 m-5'>
        {isFetchingQuotes && <LoadingSpinner />}
        {quotes && quotes.length === 0 && <p>No quotes available</p>}
        {quotes &&
          quotes.map((quoteDocument, index) => {
            return (
              <div key={index}>
                <Heading className='text-lg'>
                  {quoteDocument.category} quotes
                </Heading>
                <div>
                  {quoteDocument.quotes.map((quote, index) => (
                    <Card className='w-[300px]' key={index}>
                      <CardContent className='p-10 space-y-2'>
                        <p className='text-sm font-medium'>{quote.quote}</p>
                        <p className='text-sm'>- {quote.author}</p>
                      </CardContent>
                    </Card>
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
