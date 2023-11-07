import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ActionStep } from '../types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { AiTwotoneUpCircle } from 'react-icons/ai';

interface ActionStepShowcaseProps {
  actionStep: ActionStep;
  day: number;
}

const ActionStepShowcase = ({ day, actionStep }: ActionStepShowcaseProps) => {
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle className='flex items-center gap-3'>
          <AiTwotoneUpCircle />

          {`Day ${day}`}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-3'>
        <div>
          <CardTitle className='text-xl font-medium'>
            Major action Step
          </CardTitle>
          <p>{actionStep.actionStep}</p>
        </div>
        <div>
          <Accordion type='single' collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger className='text-lg'>
                Description
              </AccordionTrigger>
              <AccordionContent>{actionStep.description}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div>
          {actionStep.additionalSteps && (
            <>
              <CardTitle className='text-lg font-medium'>
                Additional Steps
              </CardTitle>
              {actionStep.additionalSteps.map((step, index) => (
                <p key={index}>• {step}</p>
              ))}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionStepShowcase;
