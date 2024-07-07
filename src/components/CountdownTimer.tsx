import { useEffect, useState } from 'react';

const CountdownTimer = ({ minutes }: { minutes: number }) => {
  const [totalSeconds, setTotalSeconds] = useState(minutes * 60);

  useEffect(() => {
    let interval = setInterval(() => {
      if (totalSeconds > 0) {
        setTotalSeconds((value) => value - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='text-sm'>
      <span>
        {Math.floor(totalSeconds / 60)
          .toString()
          .padStart(2, '0')}
      </span>
      :<span>{(totalSeconds % 60).toString().padStart(2, '0')}</span>
    </div>
  );
};

export default CountdownTimer;
