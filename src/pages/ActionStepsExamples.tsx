import { useParams } from 'react-router-dom';
import Heading from '../components/Heading';

import useGetSpecificJourneyByID from '../services/journey/getSpecificJourneyByID';
import LoadingSpinner from '../components/LoadingSpinner';
import { Card, CardHeader, CardTitle } from '../components/ui/card';

const ActionStepsExamples = () => {
  const { id } = useParams();
  const { data: journey, isLoading: isFetching } = useGetSpecificJourneyByID(
    id as string
  );
  console.log(journey);

  return (
    <>
      <Heading>
        Examples for{' '}
        <span>{isFetching ? <LoadingSpinner /> : journey?.name}</span> action
        steps
      </Heading>
      <div className='flex flex-wrap items-center justify-center gap-10'>
        {journey?.actionSteps &&
          Object.keys(journey.actionSteps).map((key) => (
            <>
              {journey?.actionSteps[key].example && (
                <div>
                  <Card className='max-w-[500px]'>
                    <CardHeader>
                      <CardTitle>{`Day ${key.split('day')[1]}`}</CardTitle>
                    </CardHeader>
                    <CardHeader className='whitespace-pre-wrap'>
                      {journey?.actionSteps[key].example}
                    </CardHeader>
                  </Card>
                </div>
              )}
            </>
          ))}
      </div>
    </>
  );
};

export default ActionStepsExamples;
