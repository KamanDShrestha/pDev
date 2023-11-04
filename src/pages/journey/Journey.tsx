// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '../components/ui/card';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../components/ui/accordion';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/ui/tooltip';

import stoicismIcon from '../../assets/journeyIcons/Stoicism/stoicismLight.png';
import stoicismIconDark from '../../assets/journeyIcons/Stoicism/stoicismDark.png';

const Journey = () => {
  return (
    <div className='p-5 mt-5 mb-5'>
      <div className='w-screen h-[80vh] bg-gray-300'>
        Placeholder for quotes
      </div>
      <div className='mt-5'>
        <h2 className='text-4xl font-semibold'>Journeys</h2>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className='w-[350px]'>
                  <CardHeader>
                    <CardTitle>
                      <div className='flex items-center gap-10'>
                        Stoicism
                        <img src={stoicismIcon} className='w-32' />
                      </div>
                    </CardTitle>
                    <CardDescription>
                      <Accordion type='single' collapsible>
                        <AccordionItem value='item-1'>
                          <AccordionTrigger className='text-lg'>
                            Description
                          </AccordionTrigger>
                          <AccordionContent>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quisquam voluptatem, iusto, fugiat, voluptatum
                            voluptates quas voluptatibus quia doloribus
                            molestias quos quibusdam exercitationem.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='p-2'>
                      <h4 className='mb-1 font-semibold'>Importance</h4>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam voluptatem, iusto, fugiat, voluptatum
                        voluptates quas voluptatibus quia doloribus molestias
                        quos quibusdam exercitationem.
                      </p>
                    </div>
                    <div className='p-2'>
                      <h4 className='mb-1 font-semibold'>
                        Length of the journey
                      </h4>
                      <span>12 days</span>
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam voluptatem, iusto, fugiat, voluptatum voluptates
                    quas voluptatibus quia doloribus molestias quos quibusdam
                    exercitationem.
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className='w-[350px]'>
                  <CardHeader>
                    <CardTitle>
                      <div className='flex items-center gap-10'>
                        Stoicism
                        <img src={stoicismIconDark} className='w-32' />
                      </div>
                    </CardTitle>
                    <CardDescription>
                      <Accordion type='single' collapsible>
                        <AccordionItem value='item-1'>
                          <AccordionTrigger className='text-lg'>
                            Description
                          </AccordionTrigger>
                          <AccordionContent>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quisquam voluptatem, iusto, fugiat, voluptatum
                            voluptates quas voluptatibus quia doloribus
                            molestias quos quibusdam exercitationem.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4>Importance</h4>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam voluptatem, iusto, fugiat, voluptatum
                        voluptates quas voluptatibus quia doloribus molestias
                        quos quibusdam exercitationem.
                      </p>
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam voluptatem, iusto, fugiat, voluptatum voluptates
                    quas voluptatibus quia doloribus molestias quos quibusdam
                    exercitationem.
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Journey;
