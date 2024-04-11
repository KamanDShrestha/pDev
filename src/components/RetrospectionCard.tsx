import KeyLearningCard from './KeyLearningCard';
import ReflectionCard from './ReflectionCard';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface RetrospectionCardProps {
  embarkedJourneyId: string;
  keyLearning: string;
  reflection: string;
  journeyName: string;
}

const RetrospectionCard = ({
  keyLearning,
  reflection,
  embarkedJourneyId,
  journeyName,
}: RetrospectionCardProps) => {
  return (
    <Card className='flex items-center justify-around w-[350px] sm:w-[600px] p-5'>
      <CardHeader>
        <div className='flex flex-col items-center gap-3'>
          <CardTitle>{journeyName}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle>Retrospection</CardTitle>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='text-lg'>
              Key Learning
            </AccordionTrigger>
            <AccordionContent>
              <KeyLearningCard
                embarkedJourneyId={embarkedJourneyId}
                keyLearning={keyLearning}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-2'>
            <AccordionTrigger className='text-lg'>Reflection</AccordionTrigger>
            <AccordionContent>
              <ReflectionCard
                embarkedJourneyId={embarkedJourneyId}
                reflection={reflection}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default RetrospectionCard;
