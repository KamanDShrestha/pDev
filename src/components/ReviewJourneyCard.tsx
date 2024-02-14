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

import { GoDotFill } from 'react-icons/go';
import { BsDot } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { ActionStep } from '../types';

export interface ReviewJourneyCardProps {
  journeyId: string;
  journeyName: string;
  journeyIcon: { light: string; dark: string };
  journeyDescription: string;
  journeyLength: number;
  importance: string[];
  usages: string[];
  learningQuotes?: string[];
  actionSteps?: ActionStep[];
  onVerifyClick: (journeyId: string) => void;
}

const ReviewJourneyCard = ({
  journeyId,
  journeyName,
  journeyDescription,
  journeyIcon,
  journeyLength,
  importance,
  usages,
  onVerifyClick,
}: ReviewJourneyCardProps) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className='w-[350px] sm:w-[400px]'>
              <CardHeader>
                <CardTitle>
                  <div className='flex items-center justify-around gap-10'>
                    {journeyName}
                    <img
                      src={
                        theme === 'dark' ? journeyIcon.dark : journeyIcon.light
                      }
                      className='w-32'
                    />
                  </div>
                </CardTitle>
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
              <CardFooter className='flex justify-between'>
                <Button onClick={() => onVerifyClick(journeyId)}>Verify</Button>
                <Button onClick={() => navigate(`/journeys/${journeyId}`)}>
                  Browse
                </Button>

                <span className='px-4 py-2 text-xs text-red-500 bg-red-100 rounded-full'>
                  Not verified
                </span>
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

export default ReviewJourneyCard;
