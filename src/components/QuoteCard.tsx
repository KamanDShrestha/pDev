import { FaTrash } from 'react-icons/fa';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { useAuthContext } from '../context/AuthProvider';
import useDeleteQuote from '../services/quotes/deleteQuote';
import LoadingSpinner from './LoadingSpinner';

interface QuoteCardProps {
  quote: {
    _id: string;
    quote: string;
    author: string;
  };
  category: string;
}
const QuoteCard = ({ quote, category }: QuoteCardProps) => {
  const { user } = useAuthContext();
  const { mutate: deleteQuote, isLoading: isDeleting } = useDeleteQuote();

  function handleQuoteDeletion() {
    deleteQuote({ quoteId: quote._id, category: category });
  }

  return (
    <Card className='w-[300px]'>
      <CardContent className='p-10 space-y-2'>
        <p className='text-sm font-medium'>{quote.quote}</p>
        <p className='text-sm'>- {quote.author}</p>
      </CardContent>
      {user?.role === 'admin' && (
        <CardFooter>
          <Button
            variant={'destructive'}
            size='xs'
            className='space-x-2'
            onClick={handleQuoteDeletion}
          >
            {isDeleting ? (
              <LoadingSpinner />
            ) : (
              <>
                <span>Move to trash</span>
                <FaTrash />
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default QuoteCard;
