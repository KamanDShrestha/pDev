import { FaPen, FaTrash } from 'react-icons/fa';
import { Button, buttonVariants } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { useAuthContext } from '../context/AuthProvider';
import useDeleteQuote from '../services/quotes/deleteQuote';
import LoadingSpinner from './LoadingSpinner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { cn } from '../lib/utils';
import { FieldValues, useForm } from 'react-hook-form';
import { Input } from './ui/input';

import useUpdateQuote from '../services/quotes/updateQuote';
import { Textarea } from './ui/textarea';
import removeWhitespace from '../services/removeWhitespace';
import { useQueryClient } from '@tanstack/react-query';

interface QuoteCardProps {
  quote: {
    _id: string;
    quote: string;
    author: string;
  };
  category?: string;
}
const QuoteCard = ({ quote, category }: QuoteCardProps) => {
  const { user } = useAuthContext();
  const { mutate: deleteQuote, isLoading: isDeleting } = useDeleteQuote();
  const { mutate: updateQuote, isLoading: isUpdating } = useUpdateQuote();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      quote: quote.quote,
      author: quote.author,
    },
  });

  const queryClient = useQueryClient();

  function handleQuoteDeletion() {
    if (!category) return;
    deleteQuote(
      { quoteId: quote._id, category: category },
      {
        onSuccess: () => {
          console.log('Quote deleted');
          queryClient.invalidateQueries(['quotes', category]);
        },
      }
    );
  }

  function handleQuoteUpdate(data: FieldValues) {
    if (!category) return;
    updateQuote({
      quote: {
        quote: removeWhitespace(data.quote),
        author: removeWhitespace(data.author),
      },
      category,
      quoteId: quote._id,
    });
  }

  return (
    <Card className='w-[300px]'>
      <CardContent className='p-10 space-y-2'>
        <p className='text-sm font-medium'>{quote.quote}</p>
        <p className='text-sm'>- {quote.author}</p>
      </CardContent>
      {user?.role === 'admin' && category && (
        <CardFooter className='space-x-2'>
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
          <Dialog>
            <DialogTrigger
              className={cn(
                buttonVariants({ variant: 'default', size: 'xs' }),
                'space-x-2'
              )}
            >
              <span>Update Quote</span>
              <FaPen />
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Update this quote</DialogTitle>
              <DialogDescription>
                You can update this quote here.
              </DialogDescription>
              <div className='space-y-2'>
                <div>
                  <label htmlFor='quote'>Quote</label>
                  <Textarea
                    {...register('quote', {
                      required: 'Quote must be provided.',
                      min: {
                        value: 10,
                        message: 'Quote must be at least 10 characters.',
                      },
                    })}
                  />
                </div>
                <div>
                  <label htmlFor='author'>Author</label>
                  <Input
                    {...register('author', {
                      required: 'Author must be provided.',
                      min: {
                        value: 10,
                        message: 'Author must be at least 10 characters.',
                      },
                    })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'xs' }),
                    'space-x-2'
                  )}
                  onClick={handleSubmit(handleQuoteUpdate)}
                >
                  {isUpdating ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      <span>Update this quote</span>
                      <FaPen />
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      )}
    </Card>
  );
};

export default QuoteCard;
