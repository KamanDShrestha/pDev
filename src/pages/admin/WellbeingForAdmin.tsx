import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import GratitudeJournalPromptCard from '../../components/GratitudeJournalPromptCard';
import Heading from '../../components/Heading';
import { Input } from '../../components/ui/input';

const WellbeingForAdmin = () => {
  return (
    <>
      <div>
        <Heading>Gratitude Journal</Heading>
        <GratitudeJournalPromptCard />
        <Card>
          <CardHeader>
            <CardTitle>Add new prompts here.</CardTitle>
            <CardDescription>
              You can add new prompts from here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div>
                <Heading className='mb-0 text-lg'>Prompt</Heading>
                <Input />
              </div>
              <div>
                <Heading className='mb-0 text-lg'>Placeholder</Heading>
                <Input />
              </div>
              <div>
                <Heading className='mb-0 text-lg'>Category</Heading>
                <Input />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default WellbeingForAdmin;
