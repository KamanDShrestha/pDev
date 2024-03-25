import AddGoalReminderSection from '../components/AddGoalReminderSection';
import Heading from '../components/Heading';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

import { FiCheckSquare } from 'react-icons/fi';
const GoalSetting = () => {
  const referenceGoals = [
    'Drink a glass of water in the morning.',
    'Read a book for 30 minutes.',
    'Exercise for 30 minutes.',
    'Meditate for 10 minutes.',
    'Write a journal.',
  ];

  return (
    <div className='space-y-10 '>
      <div>
        <Heading>Goal Setting</Heading>
        <p>
          You can set your weekly or custom goals for specific number of days
          for personal accountability.
        </p>
      </div>
      {/* Card providing reference for goal setting */}
      <div className='flex justify-center'>
        <Card className='max-w-[400px]'>
          <CardHeader>
            <CardTitle>Reference Goals</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {referenceGoals.map((goal, index) => (
              <p key={index} className='flex items-center gap-2'>
                <span>
                  <FiCheckSquare />
                </span>
                <span>{goal}</span>
              </p>
            ))}
          </CardContent>
        </Card>
      </div>
      <hr />

      <div className='m-5'>
        <AddGoalReminderSection />
      </div>
    </div>
  );
};

export default GoalSetting;
