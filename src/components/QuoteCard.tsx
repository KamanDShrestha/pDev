import { FaPen, FaTrash } from 'react-icons/fa';
import { Button, buttonVariants } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { useAuthContext } from '../context/AuthProvider';
import useDeleteQuote from '../services/quotes/deleteQuote';
import LoadingSpinner from './LoadingSpinner';
import {
  Dialog,
  DialogClose,
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
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import ErrorMessage from './ErrorMessage';

interface QuoteCardProps {
  quote: {
    _id: string;
    quote: string;
    author: string;
    moodSpecific: string;
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

  const [selectedMoodSpecific, setSelectedMoodSpecific] = useState(
    quote.moodSpecific
  );
  const [selectedMoodSpecificError, setSelectedMoodSpecificError] =
    useState<string>();

  const queryClient = useQueryClient();

  function handleQuoteDeletion() {
    if (!category) return;
    deleteQuote(
      { quoteId: quote._id, category: category },
      {
        onSuccess: () => {
          console.log('Quote deleted');
          queryClient.invalidateQueries(['quotes']);
        },
      }
    );
  }

  function handleQuoteUpdate(data: FieldValues) {
    if (!category) return;
    if (!selectedMoodSpecific) {
      setSelectedMoodSpecificError('Mood specific is required');
      return;
    }
    updateQuote({
      quote: {
        quote: removeWhitespace(data.quote),
        author: removeWhitespace(data.author),
        moodSpecific: selectedMoodSpecific,
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
          <Dialog>
            <DialogTrigger
              className={cn(
                buttonVariants({ variant: 'destructive', size: 'xs' }),
                'space-x-2'
              )}
            >
              {isDeleting ? (
                <LoadingSpinner />
              ) : (
                <>
                  <span>Move to trash</span>
                  <FaTrash />
                </>
              )}
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>
                Are you sure you want to delete this quote?
              </DialogTitle>
              <DialogFooter>
                <DialogClose
                  name='Cancel'
                  className={buttonVariants({ variant: 'secondary' })}
                >
                  Cancel
                </DialogClose>
                <DialogClose
                  name='Delete'
                  className={buttonVariants({ variant: 'destructive' })}
                  onClick={handleQuoteDeletion}
                >
                  {isDeleting ? <LoadingSpinner /> : 'Delete'}
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                <div>
                  <label htmlFor='moodSpecific'>Mood Specific</label>

                  <Select
                    onValueChange={(e) => {
                      setSelectedMoodSpecific(e);
                      setSelectedMoodSpecificError('');
                    }}
                    defaultValue={selectedMoodSpecific}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Mood Specific' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='low'>Low</SelectItem>
                      <SelectItem value='neutral'>Neutral</SelectItem>
                      <SelectItem value='high'>High</SelectItem>
                    </SelectContent>
                  </Select>
                  {selectedMoodSpecificError && (
                    <ErrorMessage>{selectedMoodSpecificError}</ErrorMessage>
                  )}
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
