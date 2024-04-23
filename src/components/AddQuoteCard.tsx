import { useState } from 'react';
import useGetQuoteCategories from '../services/quotes/getQuoteCategories';
import Heading from './Heading';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import LoadingSpinner from './LoadingSpinner';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from './ui/select';

import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { FieldValues, useForm } from 'react-hook-form';
import useAddQuote from '../services/quotes/addQuote';
import ErrorMessage from './ErrorMessage';
import removeWhitespace from '../services/removeWhitespace';

const AddQuoteCard = () => {
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryError, setSelectedCategoryError] = useState<string>();
  const { data: categories, isLoading: isCategoryFetching } =
    useGetQuoteCategories();
  const [selectedMoodSpecific, setSelectedMoodSpecific] = useState<string>();
  const [selectedMoodSpecificError, setSelectedMoodSpecificError] =
    useState<string>();
  const { mutate: addQuote, isLoading: isAddingQuote } = useAddQuote();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  function handleQuoteSubmit(data: FieldValues) {
    if (!isAddingNewCategory && !selectedCategory) {
      setSelectedCategoryError('Category is required');
      return;
    }

    if (isAddingNewCategory) {
      if (!data.category) return;
    }
    if (!selectedMoodSpecific) {
      setSelectedMoodSpecificError('Mood specific is required');
      return;
    }
    addQuote(
      {
        quote: removeWhitespace(data.quote),
        author: removeWhitespace(data.author),
        category: isAddingNewCategory
          ? removeWhitespace(data.category)
          : (selectedCategory as string),
        moodSpecific: selectedMoodSpecific,
      },
      {
        onSuccess: () => {
          setIsAddingNewCategory(false);
          reset({
            quote: '',
            author: '',
            category: '',
          });
        },
      }
    );
  }

  return (
    <Card className='w-[400px] lg:w-[600px]'>
      <CardHeader>
        <CardTitle>Add new quotes for users</CardTitle>
        <CardDescription>You can add new quotation for users</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <label className='mb-1 text-lg font-medium' htmlFor='quote'>
            Quote
          </label>
          <Textarea
            id='quote'
            {...register('quote', {
              required: 'Quote is required',
              minLength: {
                value: 10,
                message: 'Quote should be at least 10 characters long',
              },
              maxLength: {
                value: 350,
                message: 'Quote should be at most 300 characters long',
              },
              validate: {
                notOnlyWhitespace: (value) =>
                  value.trim().length >= 10 || 'This cannot be only whitespace',
              },
            })}
          />
          {errors.quote && (
            <ErrorMessage>{errors.quote.message as string}</ErrorMessage>
          )}
        </div>
        <div>
          <label className='mb-1 text-lg font-medium' htmlFor='author'>
            Author
          </label>
          <Input
            id='author'
            {...register('author', {
              required: 'Author is required',
              minLength: {
                value: 4,
                message: 'Author should be at least 4 characters long',
              },
              maxLength: {
                value: 30,
                message: 'Quote should be at most 30 characters long',
              },
              validate: {
                notOnlyWhitespace: (value) =>
                  value.trim().length >= 4 ||
                  'Author cannot be only whitespace',
              },
            })}
          />
          {errors.author && (
            <ErrorMessage>{errors.author.message as string}</ErrorMessage>
          )}
        </div>
        <div className='flex flex-col gap-3 my-3'>
          {isCategoryFetching && <LoadingSpinner />}
          {categories && categories.length === 0 ? (
            <p>No existing categories found.</p>
          ) : (
            <>
              <label className='mb-1 text-lg font-medium' htmlFor='category'>
                Category
              </label>
              <Select
                disabled={isAddingNewCategory}
                onValueChange={(category) => {
                  setSelectedCategory(category);
                  setSelectedCategoryError('');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Category' />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedCategoryError && (
                <ErrorMessage>{selectedCategoryError}</ErrorMessage>
              )}
            </>
          )}
          <div className='space-y-3'>
            <div className='flex items-center gap-3'>
              <Switch
                checked={isAddingNewCategory}
                onCheckedChange={() =>
                  setIsAddingNewCategory((previous) => !previous)
                }
              />
              <Heading className='m-0 text-md'>New category?</Heading>
            </div>
            {isAddingNewCategory && (
              <div>
                <label
                  className='mb-0 font-medium text-md'
                  htmlFor='newCategory'
                >
                  New Category
                </label>
                <Input
                  id='newCategory'
                  disabled={!isAddingNewCategory}
                  {...register('category', {
                    required: 'Category is required',
                    minLength: {
                      value: 4,
                      message: 'Category should be at least 4 characters long',
                    },
                    maxLength: {
                      value: 30,
                      message: 'Category should be at most 30 characters long',
                    },
                    validate: {
                      notOnlyWhitespace: (value) =>
                        value.trim().length >= 4 ||
                        'Category cannot be only whitespace',
                    },
                  })}
                />
                {errors.category && (
                  <ErrorMessage>
                    {errors.category.message as string}
                  </ErrorMessage>
                )}
              </div>
            )}
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
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit(handleQuoteSubmit)}>
          {isAddingQuote ? <LoadingSpinner /> : 'Add Quote'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddQuoteCard;
