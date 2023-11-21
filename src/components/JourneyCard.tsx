import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from './ui/tooltip';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion';
import { Button } from './ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card';
import { useTheme } from './ThemeProvider';
import { useAuthContext } from '../context/AuthProvider';
import useGetEmbarkedJourney from '../services/embarkedJourneys/getEmbarkedJourney';

import { GoDotFill } from 'react-icons/go';
import { BsDot } from 'react-icons/bs';

interface ActionSteps {
  description: string;
  majorAction: string;
  additionalSteps?: string[];
  evidences: string[];
  references?: string[];
}

export interface JourneyCardProps {
  journeyId: string;
  journeyName: string;
  journeyIcon: { light: string; dark: string };
  journeyDescription: string;
  journeyLength: number;
  importance: string[];
  usages: string[];
  learningQuotes?: string[];
  actionSteps?: ActionSteps[];
  onBrowseClick?: () => void;
}

const JourneyCard = ({
  journeyId,
  journeyName,
  journeyDescription,
  journeyIcon,
  journeyLength,
  importance,
  usages,
  onBrowseClick,
}: JourneyCardProps) => {
  const { theme } = useTheme();
  const { user } = useAuthContext();

  const { data: embarkedJourney } = useGetEmbarkedJourney(
    user?.id as string,
    journeyId
  );

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className='w-[350px] sm:w-[400px]'>
              <CardHeader>
                <div className='flex items-center justify-around gap-10'>
                  <CardTitle>{journeyName}</CardTitle>
                  <img
                    src={
                      theme === 'dark' ? journeyIcon.dark : journeyIcon.light
                    }
                    className='w-32'
                  />
                </div>
                <CardDescription>
                  <Accordion type='single' collapsible>
                    <AccordionItem value='item-1'>
                      <AccordionTrigger className='text-lg'>
                        Description
                      </AccordionTrigger>
                      <AccordionContent>{journeyDescription}</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='p-2'>
                  <h4 className='mb-1 font-semibold'>Importance</h4>
                  <p>
                    {importance.map((item) => (
                      <p className='flex gap-3'>
                        <BsDot />
                        {item}
                      </p>
                    ))}
                  </p>
                </div>

                <div className='p-2'>
                  <h4 className='mb-1 font-semibold'>Length of the journey</h4>
                  <span>{journeyLength}</span>
                </div>
              </CardContent>
              <CardFooter className='space-x-4'>
                <Button onClick={onBrowseClick}>Browse</Button>
                {!embarkedJourney?.embarkedJourney && <Button>Begin</Button>}
              </CardFooter>
            </Card>
          </TooltipTrigger>
          <TooltipContent sideOffset={5} side='left'>
            <div className='p-4 border bg-slate-50 dark:bg-slate-800 border-slate-200 w-[300px] rounded-xl'>
              <h2 className='text-lg font-semibold'>Usages</h2>
              <div>
                {usages.map((item) => (
                  <>
                    <span className='flex gap-2 '>
                      <GoDotFill />
                      {item}
                    </span>
                  </>
                ))}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default JourneyCard;
