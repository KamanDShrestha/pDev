import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ComposedChart,
  TooltipProps,
} from 'recharts';

export default function MoodsChart() {
  const moodData = [
    {
      loggedDate: '2022-01-01',
      moodScore: 4,
      noLoggedMood: null,
      reasoning: 'Had a great day!',
    },
    {
      loggedDate: '2022-01-02',
      moodScore: 3,
      noLoggedMood: null,

      reasoning: 'Feeling neutral.',
    },
    {
      loggedDate: '2022-01-03',
      moodScore: null,
      noLoggedMood: 3,

      reasoning: 'Did not log mood.',
    },
    {
      loggedDate: '2022-01-04',
      moodScore: 2,
      noLoggedMood: null,

      reasoning: 'Not a good day.',
    },
    {
      loggedDate: '2022-01-05',
      moodScore: 5,
      noLoggedMood: null,

      reasoning: 'Feeling fantastic!',
    },
    {
      loggedDate: '2022-01-06',
      moodScore: null,
      noLoggedMood: 3,
      reasoning: 'Did not log mood.',
    },
    {
      loggedDate: '2022-01-07',
      moodScore: 1,
      noLoggedMood: null,

      reasoning: 'Worst day ever.',
    },
    {
      loggedDate: '2022-01-08',
      moodScore: 1,
      noLoggedMood: null,

      reasoning: 'Worst day ever.',
    },
    {
      loggedDate: '2022-01-09',
      moodScore: 1,
      noLoggedMood: null,
      reasoning: 'Worst day ever.',
    },
    {
      loggedDate: '2022-01-10',
      moodScore: 3,
      noLoggedMood: null,
      reasoning: 'Worst day ever.',
    },
  ];

  const CustomTooltip: React.FC<TooltipProps<any, string>> = ({
    active,
    payload,
    label,
  }) => {
    console.log(payload);
    if (active && payload && payload.length) {
      return (
        <div className='p-3 bg-slate-300'>
          <p className='label'>{`Date : ${label}`}</p>
          <p className='intro'>
            {payload[0].name !== 'noLoggedMood'
              ? `Mood Score : ${payload[0].value}`
              : 'No mood logged'}
          </p>
          <p className='desc'>{`Reasoning : ${payload[0].payload.reasoning}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ComposedChart width={730} height={250} data={moodData}>
      <XAxis dataKey='loggedDate' />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <CartesianGrid stroke='#f5f5f5' />

      <Scatter dataKey={'moodScore'} shape='cross' />

      <Scatter dataKey={'noLoggedMood'} shape='star' fill='#FF0000' />

      <Line type='monotone' dataKey='moodScore' stroke='#040403' dot={false} />
    </ComposedChart>
  );
}
