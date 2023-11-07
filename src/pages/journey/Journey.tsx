import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../components/ui/accordion';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/ui/card';

import stoicismIcon from '../../assets/journeyIcons/Stoicism/stoicismLight.png';
import { useGetAllJourneys } from '../../services/journey/getAllJourneys';

import JourneyCardSkeleton from '../../components/JourneyCardSkeleton';
import JourneyCard from '../../components/JourneyCard';
import { useNavigate } from 'react-router-dom';

const Journey = () => {
  const { data: journeys, isLoading } = useGetAllJourneys();
  const navigate = useNavigate();

  console.log(journeys);

  function handleJourneyBrowseClick(name: string) {
    navigate('/journey/' + name.toLowerCase());
  }
  return (
    <div className='p-5 mt-5 mb-5'>
      <div className='w-screen h-[80vh] bg-gray-200'>
        Placeholder for quotes
      </div>
      <div className='mt-8'>
        <h2 className='mt-2 mb-5 text-4xl font-semibold'>Journeys</h2>
        <div className='flex flex-wrap justify-center gap-10'>
          {isLoading &&
            Array.from(Array(4)).map((_, index) => (
              <JourneyCardSkeleton key={index} />
            ))}

          {journeys &&
            journeys.map((journey) => (
              <>
                <JourneyCard
                  journeyName={journey.name}
                  journeyDescription={journey.description}
                  journeyIcon={journey.imageLinks}
                  journeyLength={journey.length}
                  key={journey.name}
                  importance={journey.importance}
                  usages={journey.usages}
                  onBrowseClick={() => handleJourneyBrowseClick(journey.name)}
                />
              </>
            ))}
        </div>
      </div>
      <div className='mt-8'>
        <h2 className='mb-5 text-4xl font-semibold'>Completed Journeys</h2>
        <div className='flex flex-wrap justify-center gap-10'>
          <div>
            <Card className='flex items-center justify-around w-[350px] sm:w-[600px] p-5'>
              <CardHeader>
                <CardTitle>
                  <div className='flex flex-col items-center gap-3'>
                    <img src={stoicismIcon} className='w-32' />
                    Stoicism
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
                    <AccordionContent>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam voluptatem, iusto, fugiat, voluptatum voluptates
                      quas voluptatibus quia doloribus molestias quos quibusdam
                      exercitationem.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type='single' collapsible>
                  <AccordionItem value='item-2'>
                    <AccordionTrigger className='text-lg'>
                      Your reflection
                    </AccordionTrigger>
                    <AccordionContent>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam voluptatem, iusto, fugiat, voluptatum voluptates
                      quas voluptatibus quia doloribus molestias quos quibusdam
                      exercitationem.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className='flex items-center justify-around w-[350px] sm:w-[600px] p-5'>
              <CardHeader>
                <CardTitle>
                  <div className='flex flex-col items-center gap-3'>
                    <img src={stoicismIcon} className='w-32' />
                    Stoicism
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
                    <AccordionContent>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam voluptatem, iusto, fugiat, voluptatum voluptates
                      quas voluptatibus quia doloribus molestias quos quibusdam
                      exercitationem.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type='single' collapsible>
                  <AccordionItem value='item-2'>
                    <AccordionTrigger className='text-lg'>
                      Your reflection
                    </AccordionTrigger>
                    <AccordionContent>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam voluptatem, iusto, fugiat, voluptatum voluptates
                      quas voluptatibus quia doloribus molestias quos quibusdam
                      exercitationem.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
