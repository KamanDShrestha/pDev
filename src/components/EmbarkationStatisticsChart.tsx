import { PieChart, Pie, Tooltip } from 'recharts';

const EmbarkationStatisticsChart = ({
  countStats,
}: {
  countStats: { name: string; count: number }[];
}) => {
  return (
    <PieChart
      width={600}
      height={300}
      className='flex items-center justify-center w-full h-full'
    >
      <Pie
        dataKey='count'
        data={countStats}
        cx={200}
        cy={200}
        outerRadius={80}
        fill='#8884d8'
        label={({ name, count }) => (count === 0 ? null : `${name}`)}
        labelLine={false}
      />
      {/* <Pie
        dataKey='count'
        data={countStats}
        cx={500}
        cy={200}
        innerRadius={40}
        outerRadius={80}
        fill='#82ca9d'
      /> */}
      <Tooltip />
    </PieChart>
  );
};

export default EmbarkationStatisticsChart;
