import { useState } from 'react';
import useGetMoodsWithinRange from '../services/moods/getMoodsWithinRange';
import { useAuthContext } from '../context/AuthProvider';

import { DatePicker } from './DatePicker';
import MoodsChart from './MoodsChart';
import getDateRange from '../services/getDateRange';
import { format } from 'date-fns';
import { Card, CardContent } from './ui/card';

const MoodsChartSection = () => {
  const [startDate, setStartDate] = useState<Date>(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState<Date>(new Date());
  const { user } = useAuthContext();

  const { data: moodsInRange, isLoading: isFetchingMoodsInRange } =
    useGetMoodsWithinRange(user?.id as string, startDate, endDate);

  const dateRange = getDateRange(startDate, endDate);
  console.log(dateRange);
  console.log(isFetchingMoodsInRange, 'fetching when changing date');

  const moods = dateRange.map((date) => {
    console.log(format(date, 'PP'), 'date');

    const mood = moodsInRange?.find(
      (mood) => format(mood.loggedDate, 'PP') === format(date, 'PP')
    );
    console.log(mood, 'mood');

    return mood
      ? {
          loggedDate: format(date, 'MMM do'),
          mood: mood.mood,
          noLoggedMood: null,
          reasoning: mood.reasoning,
        }
      : {
          loggedDate: format(date, 'MMM do'),
          mood: null,
          noLoggedMood: 3,
          reasoning: 'Mood has not been logged.',
        };
  });

  console.log(moods);
  console.log(moodsInRange);

  return (
    <Card className=''>
      <CardContent className='p-5'>
        <div className='flex flex-col items-center justify-center gap-10'>
          <div className='flex flex-wrap items-center justify-center gap-3'>
            <div className=''>
              <p>Start Date</p>
              <DatePicker date={startDate} setDate={setStartDate} />
            </div>
            <div>
              <p>End Date</p>
              <DatePicker date={endDate} setDate={setEndDate} />
            </div>
          </div>
          {moodsInRange && moodsInRange.length === 0 && (
            <p>No moods in this range</p>
          )}
          {moodsInRange && moodsInRange.length !== 0 && (
            <MoodsChart moodData={moods} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodsChartSection;
