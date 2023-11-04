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

interface ActionSteps {
  description: string;
  majorAction: string;
  additionalSteps: string[];
  evidences: string[];
  references: string[];
}

export interface JourneyCardProps {
  journeyName: string;
  journeyIcon: { light: string; dark: string };
  journeyDescription: string;
  journeyLength: number;
  importance: string[];
  usages: string[];
  learningQuotes: string[];
  actionSteps: ActionSteps[];
}

const JourneyCard = ({
  journeyName,
  journeyDescription,
  journeyIcon,
  journeyLength,
  importance,
  usages,
}: JourneyCardProps) => {
  const { theme } = useTheme();
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className='w-[350px] sm:w-[400px]'>
              <CardHeader>
                <CardTitle>
                  <div className='flex items-center gap-10'>
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
                      <p>{item}</p>
                    ))}
                  </p>
                </div>

                <div className='p-2'>
                  <h4 className='mb-1 font-semibold'>Length of the journey</h4>
                  <span>{journeyLength}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Begin</Button>
              </CardFooter>
            </Card>
          </TooltipTrigger>
          <TooltipContent sideOffset={5} side='left'>
            <div className='p-4 border bg-slate-50 dark:bg-slate-800 border-slate-200 w-[300px] rounded-xl'>
              <h2 className='text-lg font-semibold'>Usages</h2>
              <div>
                {usages.map((item) => (
                  <p>{item}</p>
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
