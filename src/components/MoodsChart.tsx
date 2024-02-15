import {
  Line,
  XAxis,
  YAxis,
  // CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ComposedChart,
  TooltipProps,
  ResponsiveContainer,
} from 'recharts';
// import { useTheme } from './ThemeProvider';

interface MoodsChartProps {
  moodData: {
    loggedDate: string;
    mood: number | null;
    noLoggedMood: number | null;
    reasoning: string;
  }[];
}

export default function MoodsChart({ moodData }: MoodsChartProps) {
  // const { theme } = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <ResponsiveContainer width={730} height={250}>
      <ComposedChart data={moodData}>
        <XAxis dataKey='loggedDate' />
        <YAxis domain={[1, 5]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {/* <CartesianGrid stroke='#f5f5f5' /> */}

        <Scatter
          dataKey={'mood'}
          shape='cross'
          stroke='#A9A9A9'
          fill='#A9A9A9'
        />

        <Scatter dataKey={'noLoggedMood'} shape='star' fill='#FF0000' />

        <Line type='monotone' dataKey='mood' stroke='#A9A9A9' dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
