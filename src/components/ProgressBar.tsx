interface ProgressBarProps {
  completion: number;
}

const ProgressBar = ({ completion = 0 }: ProgressBarProps) => {
  return (
    <div className='w-full ease-in-out bg-gray-200 rounded-full dark:bg-gray-700'>
      <div
        className='p-1.5 text-xs font-medium leading-none text-center text-blue-100 bg-blue-600 rounded-full ease-in-out'
        style={{ width: `${completion}%` }}
      >
        {completion ? completion.toFixed(2) : 0}%
      </div>
    </div>
  );
};

export default ProgressBar;
