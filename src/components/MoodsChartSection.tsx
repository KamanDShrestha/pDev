import { useState } from 'react';
import useGetMoodsWithinRange from '../services/moods/getMoodsWithinRange';
import { useAuthContext } from '../context/AuthProvider';

import { DatePicker } from './DatePicker';
import MoodsChart from './MoodsChart';

const MoodsChartSection = () => {
  const [startDate, setStartDate] = useState<Date>(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState<Date>(new Date());
  const { user } = useAuthContext();

  const { data: moodsInRange, isLoading: isFetchingMoodsInRange } =
    useGetMoodsWithinRange(user?.id as string, startDate, endDate);
  console.log(moodsInRange);

  return (
    <div className=''>
      <div className='min-w-[400px] max-h-[400px] text-center p-10 m-auto'>
        <div className='flex gap-3'>
          <div className=''>
            <p>Start Date</p>
            <DatePicker date={startDate} setDate={setStartDate} />
          </div>
          <div>
            <p>End Date</p>
            <DatePicker date={endDate} setDate={setEndDate} />
          </div>
        </div>
        <MoodsChart />
      </div>
    </div>
  );
};

export default MoodsChartSection;
