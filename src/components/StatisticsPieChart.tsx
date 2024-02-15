import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

const StatisticsPieChart = ({
  countStats,
}: {
  countStats: { name: string; count: number }[];
}) => {
  return (
    <ResponsiveContainer width={730} height={200}>
      <PieChart>
        <Pie
          dataKey='count'
          data={countStats}
          outerRadius={80}
          fill='#8884d8'
          label={({ name, count }) => (count === 0 ? null : `${name}`)}
          labelLine={false}
        />

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatisticsPieChart;
