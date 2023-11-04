import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion';

interface CompletedJourneyCardProps {
  journeyName: string;
  journeyIcon: { dark: string; light: string };
  keyLearnings: string;
  reflections: string;
}

const CompletedJourneyCard = ({
  journeyName,
  journeyIcon,
  keyLearnings,
  reflections,
}: CompletedJourneyCardProps) => {
  return (
    <div>
      <Card className='flex items-center justify-around w-[350px] sm:w-[600px] p-5'>
        <CardHeader>
          <CardTitle>
            <div className='flex flex-col items-center gap-3'>
              <img src={journeyIcon.dark} className='w-32' />
              {journeyName}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardTitle>Retrospection</CardTitle>
          <Accordion type='single' collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger className='text-lg'>
                Key Learnings
              </AccordionTrigger>
              <AccordionContent>{keyLearnings}</AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type='single' collapsible>
            <AccordionItem value='item-2'>
              <AccordionTrigger className='text-lg'>
                Your reflection
              </AccordionTrigger>
              <AccordionContent>{reflections}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompletedJourneyCard;
