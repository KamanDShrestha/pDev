import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import Heading from './Heading';
import { Button } from './ui/button';
import { Input } from './ui/input';

const GratitudeJournalPromptAddCard = () => {
  return (
    <Card className='lg:w-[500px] w-400px'>
      <CardHeader>
        <CardTitle>Add new prompts here.</CardTitle>
        <CardDescription>You can add new prompts from here.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='px-5'>
          <div>
            <Heading className='mb-0 text-lg font-medium'>Prompt</Heading>
            <Input />
          </div>
          <div>
            <Heading className='mb-0 text-lg font-medium'>Placeholder</Heading>
            <Input />
          </div>
          <div>
            <Heading className='mb-0 text-lg font-medium'>Category</Heading>
            <Input />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Add prompt</Button>
      </CardFooter>
    </Card>
  );
};

export default GratitudeJournalPromptAddCard;
