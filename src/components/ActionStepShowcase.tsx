import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { ActionStep } from '../types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { AiTwotoneUpCircle } from 'react-icons/ai';
import { AuthContextType } from '../context/AuthProvider';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

import { Link } from 'react-router-dom';

interface ActionStepShowcaseProps {
  actionStep: ActionStep;
  day: number;
  user?: AuthContextType;
}

const ActionStepShowcase = ({
  day,
  actionStep,
  user,
}: ActionStepShowcaseProps) => {
  return (
    <>
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
        <CardFooter className='relative'>
          {user?.role === 'qha' && (
            <Dialog>
              <DialogTrigger>
                <span className='absolute text-xs hover:underline bottom-2'>
                  View additional details
                </span>
              </DialogTrigger>

              <DialogContent>
                <div>
                  <h1 className='text-2xl font-semibold'>Day {day}</h1>
                  <span className='text-lg font-medium'>Level up your day</span>

                  <div>
                    <h2 className='text-xl font-semibold'>
                      Action step for the day
                    </h2>
                    <p>{actionStep.actionStep}</p>
                  </div>

                  <div>
                    <h2 className='text-xl font-semibold'>Description</h2>
                    <p>{actionStep.description}</p>
                  </div>
                  {actionStep.additionalSteps && (
                    <div>
                      <h2 className='text-xl font-semibold'>
                        Additional Steps
                      </h2>
                      <p>
                        {actionStep.additionalSteps.map(
                          (step: string, index) => (
                            <p key={index}>
                              {index + 1}. {step}
                            </p>
                          )
                        )}
                      </p>
                    </div>
                  )}

                  {actionStep.evidences && (
                    <div>
                      <h2 className='text-xl font-semibold'>Evidences</h2>
                      {actionStep.evidences.map((link: string, index) => (
                        <p>
                          <Link key={index} to={link} target='_blank'>
                            {index + 1}. {link}
                          </Link>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default ActionStepShowcase;
