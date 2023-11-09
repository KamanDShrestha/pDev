import { useAuthContext } from '../../context/AuthProvider';
import useGetEmbarkedJourney from '../../services/embarkedJourneys/getEmbarkedJourney';
import React from 'react';
import { useParams } from 'react-router-dom';

const CurrentJourney = () => {
  const { user } = useAuthContext();
  const journeyId = useParams();
  const { data, error, isLoading } = useGetEmbarkedJourney(
    user?.id as string,
    journeyId?.id as string
  );
  console.log(error);
  console.log(journeyId.id);
  console.log('current Journey', data);
  return (
    <div>
      <div className='w-screen h-[80vh] bg-gray-200'>
        Placeholder for quotes for current journey
      </div>

      <div className='p-4'>
        <h2 className='mt-2 mb-5 text-4xl font-semibold'>
          Today's action step
        </h2>

        {/* getting the action step in which the journey is ongoing as only one of the journey would be ongoing*/}
        {(data?.embarkedJourney &&
          data.embarkedJourney.actionSteps[
            Object.keys(data.embarkedJourney.actionSteps).filter(
              (day) =>
                data.embarkedJourney?.actionSteps[day].status === 'ongoing'
            )[0]
          ]?.actionStep) ||
          'You have completed all the journey'}
      </div>

      <div>
        <h2 className='mt-2 mb-5 text-4xl font-semibold'>Your journey</h2>
      </div>
    </div>
  );
};

export default CurrentJourney;
