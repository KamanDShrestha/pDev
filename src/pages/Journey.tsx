import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

import stoicismIcon from '../assets/journeyIcons/Stoicism/stoicismLight.jpeg';

const Journey = () => {
  return (
    <div className='p-5 mt-5 mb-5'>
      <div className='w-screen h-[80vh] bg-gray-300'>
        Placeholder for quotes
      </div>
      <div className='mt-5'>
        <h2 className='text-4xl font-semibold'>Journeys</h2>
        <div>
          <Card className='w-[350px]'>
            <CardHeader>
              <CardTitle>
                <div className='flex items-center gap-10'>
                  Stoicism
                  <img src={stoicismIcon} className='w-32' />
                </div>
              </CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam voluptatem, iusto, fugiat, voluptatum voluptates quas
                voluptatibus quia doloribus molestias quos quibusdam
                exercitationem. Quisquam voluptatem, iusto, fugiat, voluptatum
                voluptates quas voluptatibus quia doloribus molestias quos
                quibusdam exercitationem.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <h4>Importance</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam voluptatem, iusto, fugiat, voluptatum voluptates quas
                  voluptatibus quia doloribus molestias quos quibusdam
                  exercitationem.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Journey;
