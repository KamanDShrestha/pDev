import useGetSpecificJourneyByID from '../services/journey/getSpecificJourneyByID';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface RetrospectionCardProps {
  journeyId: string;
  keyLearnings: string[];
  reflection: string[];
}

const RetrospectionCard = ({
  keyLearnings,
  reflection,
  journeyId,
}: RetrospectionCardProps) => {
  const { data: journey } = useGetSpecificJourneyByID(journeyId);
  return (
    <Card className='flex items-center justify-around w-[350px] sm:w-[600px] p-5'>
      <CardHeader>
        <div className='flex flex-col items-center gap-3'>
          <CardTitle>{journey && journey.name}</CardTitle>
          <img src={journey && journey.imageLinks.dark} className='w-32' />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle>Retrospection</CardTitle>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='text-lg'>
              Key Learnings
            </AccordionTrigger>
            <AccordionContent>
              {keyLearnings.map((learning) => (
                <p>{learning}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-2'>
            <AccordionTrigger className='text-lg'>
              Your reflection
            </AccordionTrigger>
            <AccordionContent>
              {reflection.map((reflection) => (
                <p>{reflection}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default RetrospectionCard;
