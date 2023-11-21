import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const RetrospectionCard = () => {
  return (
    <Card className='flex items-center justify-around w-[350px] sm:w-[600px] p-5'>
      <CardHeader>
        <CardTitle>
          <div className='flex flex-col items-center gap-3'>
            <img src={'fakjd'} className='w-32' />
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatem, iusto, fugiat, voluptatum voluptates quas voluptatibus
              quia doloribus molestias quos quibusdam exercitationem.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-2'>
            <AccordionTrigger className='text-lg'>
              Your reflection
            </AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatem, iusto, fugiat, voluptatum voluptates quas voluptatibus
              quia doloribus molestias quos quibusdam exercitationem.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default RetrospectionCard;
