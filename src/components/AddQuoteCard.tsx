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
import { Select, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { SelectContent } from '@radix-ui/react-select';
import { Switch } from './ui/switch';
import { Button } from './ui/button';

const AddQuoteCard = () => {
  const { data: categories, isLoading: isCategoryFetching } =
    useGetQuoteCategories();
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  return (
    <Card className='w-[400px] lg:w-[600px]'>
      <CardHeader>
        <CardTitle>Add new quotes for users</CardTitle>
        <CardDescription>You can add new quotation for users</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Heading className='mb-1 text-lg font-medium'>Quote</Heading>
          <Textarea />
        </div>
        <div>
          <Heading className='mb-1 text-lg font-medium'>Author</Heading>
          <Input />
        </div>
        <div className='flex flex-col gap-3 my-3'>
          {isCategoryFetching && <LoadingSpinner />}
          {categories && categories.length === 0 ? (
            <p>No existing categories found.</p>
          ) : (
            <Select disabled={isAddingNewCategory}>
              <SelectTrigger>
                <SelectValue placeholder='Category' />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category, index) => (
                  <SelectItem key={index} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <div>
              <Heading className='mb-0 font-medium text-md'>
                New Category
              </Heading>
              <Input disabled={!isAddingNewCategory} />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Add Quote</Button>
      </CardFooter>
    </Card>
  );
};

export default AddQuoteCard;
